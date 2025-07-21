import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Buy() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          priceId: 'price_1234567890', // You'll replace this with your actual Stripe price ID
        }),
      })

      const { sessionId } = await response.json()
      
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      })

      if (error) {
        console.error('Stripe error:', error)
        alert('Payment failed. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Buy AI Prompts That Make You Money - 15-Page Guide - Instant Download</title>
        <meta name="description" content="Purchase the 15-page AI Prompts That Make You Money guide for just $3. Instant download after payment. Get 15 proven AI prompts that can earn you $50-$10,000 per project." />
        <meta name="keywords" content="buy AI prompts guide, AI automation guide, make money with AI, AI business course, artificial intelligence income" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Navigation */}
        <nav className="bg-black/90 backdrop-blur-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <img src="/vai-logo.svg" alt="VAI Logo" className="h-10 w-auto mr-3" />
                <h1 className="text-xl font-bold text-white">AI Prompts That Make You Money</h1>
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="px-6 py-8 sm:p-10">
              <div className="text-center">
  
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                  AI Prompts That Make You Money
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                  15 Profitable AI Prompts to Start Earning Today
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Details */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">What You'll Get:</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                      </div>
                      <p className="ml-3 text-gray-300">15-page concise guide (PDF format)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                      </div>
                      <p className="ml-3 text-gray-300">15 proven money-making AI prompts</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                      </div>
                      <p className="ml-3 text-gray-300">Specific monetization strategies for each prompt</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                      </div>
                      <p className="ml-3 text-gray-300">Real examples of each prompt's output</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                      </div>
                      <p className="ml-3 text-gray-300">Pricing guidance for each prompt ($50-$10,000 per project)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-sm font-bold">✓</div>
                      </div>
                      <p className="ml-3 text-gray-300">Lifetime access and updates</p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center">
      
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-300">Instant Download</h3>
                        <p className="text-yellow-200 text-sm">Get immediate access after payment - no waiting!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Form */}
                <div>
                  <div className="bg-white rounded-xl p-8 text-center">
                    <div className="text-black">
                      <div className="text-sm uppercase tracking-wide font-semibold opacity-70">Launch Price</div>
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-2xl line-through opacity-50 mr-3">$27</span>
                        <span className="text-5xl font-bold">$3</span>
                      </div>
                      <div className="text-sm mt-2 opacity-70">Save $24 Today</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address (for download link)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full mt-6 bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Buy Now - Instant Download'
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm">
                      <div className="flex items-center">
        
                        Secure Payment
                      </div>
                      <div className="flex items-center">
        
                        Stripe Protected
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">

                <h3 className="text-lg font-semibold text-white">Instant Access</h3>
                <p className="text-gray-400 text-sm">Download immediately after purchase</p>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">

                <h3 className="text-lg font-semibold text-white">Secure Payment</h3>
                <p className="text-gray-400 text-sm">Protected by Stripe encryption</p>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">

                <h3 className="text-lg font-semibold text-white">Lifetime Access</h3>
                <p className="text-gray-400 text-sm">Keep forever, use anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}