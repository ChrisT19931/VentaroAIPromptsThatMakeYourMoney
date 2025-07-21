import Stripe from 'stripe'

// Simple Stripe initialization with error handling
let stripe;
try {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Check if Stripe is initialized
      if (!stripe) {
        return res.status(500).json({ error: 'Payment system not available' })
      }
      
      const { email } = req.body

      // Simple validation
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Valid email is required' })
      }

      // Sanitize email
      const sanitizedEmail = email.toLowerCase().trim()

      // Simplified checkout session creation
      const session = await stripe.checkout.sessions.create({
        customer_email: sanitizedEmail,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'AI Prompts That Make You Money: 15-Page Guide',
                description: '15-page guide with 15 profitable AI prompts and monetization strategies',
                images: ['https://ai-agents-mastery.vercel.app/ebook-cover.jpg'],
              },
              unit_amount: 300, // $3.00 in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/ebook?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/buy`,
        // Single metadata object with essential tracking info
        metadata: {
          customer_email: sanitizedEmail,
          product: 'ai-prompts-guide'
        }
      })

      res.status(200).json({ sessionId: session.id })
    } catch (err) {
      console.error('Stripe error:', err)
      res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}