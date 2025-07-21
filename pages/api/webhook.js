import { buffer } from 'micro'
import Stripe from 'stripe'
import sgMail from '@sendgrid/mail'
import { dbOperations } from '../../lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        await handleSuccessfulPayment(session)
        break
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('Payment succeeded:', paymentIntent.id)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

async function handleSuccessfulPayment(session) {
  try {
    const customerEmail = session.customer_email || session.metadata?.customer_email
    
    if (!customerEmail) {
      console.error('No customer email found in session')
      return
    }

    // Store order in database
    try {
      await dbOperations.createOrder({
        customer_email: customerEmail,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent,
        amount: session.amount_total,
        currency: session.currency,
        product_name: 'AI Prompts That Make You Money: 15-Page Guide',
        status: 'completed',
        metadata: {
          session_metadata: session.metadata,
          payment_method_types: session.payment_method_types
        }
      })
      console.log('Order stored in database for:', customerEmail)
    } catch (dbError) {
      console.error('Failed to store order in database:', dbError)
      // Continue with email sending even if DB fails
    }

    // Send order confirmation email to customer
    const customerMsg = {
      to: customerEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'chris.t@ventarosales.com',
        name: 'AI Prompts That Make You Money'
      },
      replyTo: process.env.SENDGRID_REPLY_TO || 'chris.t@ventarosales.com',
      subject: '🎉 Your AI Prompts Guide is Ready! Start Earning Today',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your AI Prompts Guide is Ready!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Payment Successful!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Your AI Prompts Guide is Ready</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #333; margin-top: 0;">Thank you for your purchase!</h2>
            
            <p>Hi there,</p>
            
            <p>Your payment has been successfully processed, and your <strong>AI Prompts That Make You Money: 15-Page Guide</strong> is now ready for download.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">📚 What You Get:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>15 profitable AI prompts with real earning potential</li>
                <li>Step-by-step monetization strategies</li>
                <li>Example outputs and use cases</li>
                <li>Tips to earn $50-$500 per project</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/ebook?session_id=${session.id}" 
                 style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">📖 Access Your Guide Now</a>
            </div>
            
            <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #0066cc;">💡 Quick Start Tip:</h4>
              <p style="margin-bottom: 0;">Begin with Prompt #1 (E-commerce Product Descriptions) - it's the easiest way to start earning your first $50-$150!</p>
            </div>
            
            <h3>Need Help?</h3>
            <p>If you have any questions or issues accessing your guide, simply reply to this email or contact us at <a href="mailto:chris.t@ventarosales.com" style="color: #667eea;">chris.t@ventarosales.com</a></p>
            
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
              <p>Order ID: ${session.id}</p>
              <p>Amount: $${(session.amount_total / 100).toFixed(2)}</p>
              <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    await sgMail.send(customerMsg)
    console.log('Order confirmation email sent to:', customerEmail)

    // Send notification email to admin
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || 'chris.t@ventarosales.com',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'chris.t@ventarosales.com',
        name: 'AI Prompts Sales System'
      },
      subject: '💰 New Sale: AI Prompts Guide',
      html: `
        <h2>New Sale Notification</h2>
        <p><strong>Customer:</strong> ${customerEmail}</p>
        <p><strong>Product:</strong> AI Prompts That Make You Money: 15-Page Guide</p>
        <p><strong>Amount:</strong> $${(session.amount_total / 100).toFixed(2)}</p>
        <p><strong>Session ID:</strong> ${session.id}</p>
        <p><strong>Date:</strong> ${new Date().toISOString()}</p>
        <p><strong>Payment Status:</strong> Completed</p>
      `
    }

    await sgMail.send(adminMsg)
    console.log('Admin notification sent')

  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}