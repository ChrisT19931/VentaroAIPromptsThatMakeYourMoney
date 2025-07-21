import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

// Simplified Stripe initialization
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) : 
  null

export default function Buy() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [stripeError, setStripeError] = useState(false)
  const [formError, setFormError] = useState('')
  
  useEffect(() => {
    // Simple check for Stripe key
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      console.error('Stripe publishable key is missing')
      setStripeError(true)
    }
  }, [])

  const handleCheckout = async () => {
    // Clear previous errors
    setFormError('')
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address')
      return
    }

    // Check if Stripe is initialized
    if (!stripePromise) {
      setFormError('Payment system is not available. Please try again later.')
      return
    }

    setLoading(true)
    
    try {
      // Call checkout API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })

      const data = await response.json()
      
      // Handle API errors
      if (!response.ok || data.error) {
        throw new Error(data.error || `Payment error (${response.status})`)
      }
      
      // Redirect to Stripe checkout
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })

      if (error) throw error
      
    } catch (error) {
      console.error('Checkout error:', error)
      setFormError(error.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Buy AI Prompts That Make You Money - 15-Page Guide - Instant Download</title>
        <meta name="description" content="Purchase the 15-page AI Prompts That Make You Money guide for just $3. Instant download after payment. Get 15 practical AI prompts with detailed monetization strategies." />
        <meta name="keywords" content="buy AI prompts guide, AI automation guide, make money with AI, AI business course, artificial intelligence income" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
        {/* Modern Navigation */}
        <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center group">
                <img src="/vai-logo.svg" alt="VAI Logo" className="h-10 w-auto mr-3 filter drop-shadow-glow transition-all duration-300 group-hover:scale-110" />
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">AI Prompts That Make You Money</h1>
              </Link>
              <Link href="/" className="text-white/80 hover:text-white px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300 hover:scale-105">
                ← Back to Home
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            
            <div className="px-6 py-12 sm:p-12 relative z-10">
              <div className="text-center">
                <div className="inline-block mb-6 p-2 bg-white/5 rounded-2xl">
                  <span className="px-4 py-1 text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full uppercase">Premium Guide</span>
                </div>
                <h1 className="text-5xl font-extrabold text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  AI Prompts That Make You Money
                </h1>
                <p className="mt-6 text-xl text-blue-100/80 max-w-2xl mx-auto">
                  15 Practical AI Prompts with Proven Monetization Strategies
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Product Details */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <span className="inline-block w-8 h-8 mr-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></span>
                    What You'll Get
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Feature items with modern styling */}
                    <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-4 text-white/90 text-lg">15-page concise guide (PDF format)</p>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-4 text-white/90 text-lg">15 practical AI prompts with earning potential</p>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-4 text-white/90 text-lg">Specific monetization strategies for each prompt</p>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-4 text-white/90 text-lg">Real examples of each prompt's output</p>
                    </div>
                    
                    <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-4 text-white/90 text-lg">Lifetime access and updates</p>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-yellow-500/10 hover:shadow-lg">
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-yellow-300">Instant Download</h3>
                        <p className="text-yellow-200/80 text-base">Get immediate access after payment - no waiting!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Form */}
                <div className="relative">
                  {/* Decorative element */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
                  
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 text-center shadow-xl shadow-blue-500/10 transform transition-all duration-500 hover:shadow-blue-500/20 relative z-10">
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg transform rotate-3">Limited Offer</div>
                    
                    <div className="text-black">
                      <div className="text-sm uppercase tracking-wider font-semibold text-gray-500">Launch Price</div>
                      <div className="flex items-center justify-center mt-3">
                        <span className="text-2xl line-through opacity-50 mr-3 text-gray-400">$27</span>
                        <span className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">$3</span>
                      </div>
                      <div className="text-sm mt-2 text-gray-500 font-medium">Save $24 Today</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    {stripeError && (
                      <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-6 shadow-lg" role="alert">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="font-bold text-lg">Payment System Unavailable</p>
                        </div>
                        <p className="mt-2 ml-9">Our payment system is currently unavailable. Please try again later or contact support.</p>
                      </div>
                    )}
                    
                    {formError && (
                      <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-6 shadow-lg" role="alert">
                        <p>{formError}</p>
                      </div>
                    )}
                    
                    <label htmlFor="email" className="block text-base font-medium text-white mb-3">
                      Email Address for Download Link
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading || stripeError}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mr-3"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      'Buy Now — Instant Download'
                    )}
                  </button>

                  <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Secure Payment
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Stripe Protected
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/10 group">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-xl inline-flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Access</h3>
                <p className="text-blue-100/70 text-base">Download immediately after purchase</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/10 group">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 rounded-xl inline-flex items-center justify-center mb-5 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
                <p className="text-blue-100/70 text-base">Protected by Stripe encryption</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/10 group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-3 rounded-xl inline-flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lifetime Access</h3>
                <p className="text-blue-100/70 text-base">Keep forever, use anytime</p>
              </div>
            </div>
            
            <div className="mt-16 text-white/50 text-sm">
              © {new Date().getFullYear()} AI Prompts That Make You Money. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}