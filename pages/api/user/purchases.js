import { supabaseAdmin } from '../../../lib/supabase'
import { verifyAuthToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify authentication token
    const decoded = verifyAuthToken(req)
    
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = decoded.userId

    // Fetch user's purchases from database
    const { data: purchases, error } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to fetch purchases' })
    }

    // Also fetch purchases by email if user has any
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('id', userId)
      .single()

    let emailPurchases = []
    if (user?.email) {
      const { data: emailPurchasesData } = await supabaseAdmin
        .from('purchases')
        .select('*')
        .eq('customer_email', user.email)
        .is('user_id', null) // Only get purchases not yet linked to user
        .order('purchased_at', { ascending: false })

      if (emailPurchasesData) {
        emailPurchases = emailPurchasesData
        
        // Link these purchases to the user
        if (emailPurchases.length > 0) {
          await supabaseAdmin
            .from('purchases')
            .update({ user_id: userId })
            .eq('customer_email', user.email)
            .is('user_id', null)
        }
      }
    }

    // Combine and deduplicate purchases
    const allPurchases = [...purchases, ...emailPurchases]
    const uniquePurchases = allPurchases.filter((purchase, index, self) => 
      index === self.findIndex(p => p.id === purchase.id)
    )

    res.status(200).json({ 
      purchases: uniquePurchases,
      total: uniquePurchases.length
    })
  } catch (error) {
    console.error('Purchases fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}