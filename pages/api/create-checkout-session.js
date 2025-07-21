import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body

      // Validate input
      if (!email) {
        return res.status(400).json({ error: 'Email is required' })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
      }

      // Sanitize email
      const sanitizedEmail = email.toLowerCase().trim()

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer_email: sanitizedEmail,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'AI Prompts That Make You Money: 15-Page Guide',
        description: '15-page guide with 15 profitable AI prompts, monetization strategies, and example outputs to help you earn $50-$500 per project.',
                images: ['https://ai-agents-mastery.vercel.app/ebook-cover.jpg'],
              },
              unit_amount: 300, // $3.00 in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/buy`,
        metadata: {
          customer_email: sanitizedEmail,
          product: 'ai-prompts-guide',
          timestamp: new Date().toISOString()
        },
        payment_intent_data: {
          metadata: {
            customer_email: sanitizedEmail,
            product: 'ai-prompts-guide',
            timestamp: new Date().toISOString()
          }
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