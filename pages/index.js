import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>AI Prompts That Make You Money | 15 Profitable Prompts Guide 2025</title>
        <meta name="description" content="Learn 15 practical AI prompts with monetization strategies. Comprehensive 15-page guide with implementation examples and earning potential insights. Digital download available." />
        <meta name="keywords" content="AI prompts, artificial intelligence, make money online, AI automation, passive income, AI business, machine learning, chatbots, AI tools, digital income, AI entrepreneurship, automated income" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Prompts That Make You Money | 15 Profitable Prompts" />
        <meta property="og:description" content="15 practical AI prompts with detailed monetization strategies. Comprehensive 15-page guide with implementation examples and earning potential insights." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Prompts That Make You Money | 15 Profitable Prompts" />
        <meta name="twitter:description" content="15 practical AI prompts with monetization strategies. Learn how to leverage AI for income generation with our comprehensive guide." />
        <link rel="canonical" href="https://ai-agents-mastery.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="bg-black border-b border-gray-800 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <img src="/vai-logo.svg" alt="Ventaro AI Logo" className="h-12 w-auto mr-4 filter drop-shadow-lg" />
                <h1 className="text-2xl font-bold text-white tracking-tight">Ventaro AI</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-6">
                  <Link href="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-900 hover:shadow-lg transform hover:-translate-y-0.5">Login</Link>
                  <Link href="/buy" className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
                    Buy Now - $3
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                  AI Prompts That
                </span>
                <span className="block text-white drop-shadow-2xl">
                  Make You Money
                </span>
              </h1>
              
              <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-800 transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <p className="text-xl md:text-2xl text-gray-200 font-medium mb-6">
                  15 Practical AI Prompts • Monetization Strategies Included
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="text-4xl font-black text-white">
                    $3
                  </div>
                  <div className="text-gray-400">
                    One-time payment • Instant download
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/buy" className="bg-white text-black px-12 py-4 rounded-xl text-xl font-black hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl">
                  Buy Now - Download Instantly
                </Link>
                <Link href="/login" className="border-2 border-gray-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Login to Access
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Why This Guide Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                15 carefully curated AI prompts with detailed monetization strategies and implementation guides
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 transform hover:scale-105 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl hover:border-gray-600">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Instant Results</h3>
                <p className="text-gray-300 text-lg">
                  Ready-to-use prompts with clear implementation guides and monetization strategies.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 transform hover:scale-105 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl hover:border-gray-600">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Proven Profitable</h3>
                <p className="text-gray-300 text-lg">
                  Comprehensive prompts with real-world applications and earning potential examples.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 transform hover:scale-105 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl hover:border-gray-600">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Instant Access</h3>
                <p className="text-gray-300 text-lg">
                  Download your 15-page PDF guide immediately after purchase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info Section */}
        <div id="support" className="bg-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-6">Customer Support</h3>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <p className="text-lg text-gray-300">
                  Need help with your purchase or have questions about our AI prompts? Our support team is here to help you succeed with our guide.
                </p>
                <p className="text-lg text-gray-300 mt-4">
                  Email us at <a href="mailto:chris.t@ventarosales.com" className="text-white hover:underline">chris.t@ventarosales.com</a>
                </p>
                <p className="text-base text-gray-400 mt-4">
                  Typical response time: Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="bg-gradient-to-t from-black to-gray-900 py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-12 border border-gray-800 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Start Earning Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Learn how to leverage AI prompts for income generation. Download your comprehensive 15-prompt guide with step-by-step strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/buy" className="bg-white text-black px-12 py-4 rounded-xl text-xl font-black hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-2 shadow-xl">
                  Get Instant Access - $3
                </Link>
                <div className="text-gray-400 flex items-center justify-center">
                  <span>✓ Instant Download</span>
                  <span className="mx-2">•</span>
                  <span>✓ 15 Prompts</span>
                  <span className="mx-2">•</span>
                  <span>✓ Proven Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <p className="text-gray-400 text-sm mb-2">
                  <a href="mailto:chris.t@ventarosales.com" className="hover:text-white transition-colors">
                    chris.t@ventarosales.com
                  </a>
                </p>
                <p className="text-gray-400 text-sm">
                  Response within 24 hours
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <div className="space-y-2">
                  <Link href="/privacy" className="block text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="block text-gray-400 text-sm hover:text-white transition-colors">Terms & Conditions</Link>
                  <Link href="/contact" className="block text-gray-400 text-sm hover:text-white transition-colors">Contact Us</Link>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Ventaro Network</h3>
                <div className="space-y-2">
                  <a href="https://www.ventarosales.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 text-sm hover:text-white transition-colors">Ventaro Sales Training</a>
                  <a href="https://www.ventarowear.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 text-sm hover:text-white transition-colors">Ventaro Wear</a>
                  <p className="text-gray-400 text-sm">
                    Digital guide • Instant download
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-500 text-sm">
                © 2024 AI Prompts That Make You Money. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}