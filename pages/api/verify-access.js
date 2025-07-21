import { supabaseAdmin } from '../../lib/supabase'
import { verifyAuthToken, generateEbookAccessToken } from '../../lib/auth'
import { sendPurchaseConfirmation } from '../../lib/sendgrid'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { session_id, access_token } = req.body

  try {
    // Check for admin user access
    const authUser = verifyAuthToken(req)
    if (authUser && authUser.isAdmin) {
      return res.status(200).json({ 
        success: true, 
        message: 'Admin access granted',
        isAdmin: true
      })
    }
    // If access_token is provided, verify it directly
    if (access_token) {
      const { verifyEbookAccessToken } = await import('../../lib/auth')
      const decoded = verifyEbookAccessToken(access_token)
      
      if (decoded) {
        // Verify purchase still exists in database
        const { data: purchase } = await supabaseAdmin
          .from('purchases')
          .select('*')
          .eq('id', decoded.purchaseId)
          .eq('user_id', decoded.userId)
          .single()
          
        if (purchase) {
          return res.status(200).json({ 
            success: true, 
            message: 'Access granted via token',
            purchaseId: purchase.id
          })
        }
      }
      return res.status(403).json({ error: 'Invalid access token' })
    }

    // Original Stripe session verification
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID or access token is required' })
    }
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id)
    
    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: 'Payment not completed' })
    }

    // Check if purchase already recorded
    const { data: existingPurchase } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .eq('stripe_session_id', session_id)
      .single()

    if (existingPurchase) {
      return res.status(200).json({ 
        success: true, 
        message: 'Access granted',
        customer_email: session.customer_details?.email,
        purchaseId: existingPurchase.id,
        accessToken: existingPurchase.access_token
      })
    }

    // Create new purchase record
    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name || 'Customer'
    
    // Try to find existing user by email
    let userId = null
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', customerEmail?.toLowerCase())
      .single()
    
    if (existingUser) {
      userId = existingUser.id
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .insert({
        user_id: userId,
        stripe_session_id: session_id,
        customer_email: customerEmail,
        customer_name: customerName,
        amount: session.amount_total,
        currency: session.currency,
        product_name: 'Ventaro AI - Agents Mastery Ebook: Complete Guide',
        status: 'completed',
        purchased_at: new Date().toISOString()
      })
      .select()
      .single()

    if (purchaseError) {
      console.error('Purchase record error:', purchaseError)
      return res.status(500).json({ error: 'Failed to record purchase' })
    }

    // Generate long-lived access token
    const accessToken = generateEbookAccessToken(userId || 'guest', purchase.id)
    
    // Update purchase with access token
    await supabaseAdmin
      .from('purchases')
      .update({ access_token: accessToken })
      .eq('id', purchase.id)

    // Send confirmation email with access link
    if (customerEmail) {
      const accessLink = `${process.env.NEXT_PUBLIC_BASE_URL}/ebook?token=${accessToken}`
      await sendPurchaseConfirmation(customerEmail, customerName, accessLink)
    }

    res.status(200).json({ 
      success: true, 
      message: 'Access granted and purchase recorded',
      customer_email: customerEmail,
      purchaseId: purchase.id,
      accessToken
    })
  } catch (error) {
    console.error('Error verifying access:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}