import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  const { session_id } = router.query

  return (
    <>
      <Head>
        <title>Download Your 15-Page AI Prompts That Make You Money Guide - Thank You!</title>
        <meta name="description" content="Thank you for your purchase! Download your 15-page guide with profitable AI prompts and start earning right away." />
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
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="px-6 py-8 sm:p-10 text-center">
              {/* Success Animation */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                  Payment Successful!
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                  Thank you for your purchase! Your 15-page guide with profitable AI prompts is ready for download.
                </p>
              </div>

              {/* Download Section */}
              <div className="bg-gray-800 border border-gray-600 rounded-xl p-8 mb-8">
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  AI Prompts That Make You Money: 15-Page Guide
                </h2>
                <p className="text-gray-300 mb-6">
                  Your concise 15-page guide with 15 profitable AI prompts to help you start making money right away.
                </p>
                
                <Link
                  href={`/ebook?session_id=${session_id}`}
                  className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 inline-block"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Access Your Ebook Now
                  </div>
                </Link>
              </div>

              {/* What's Next Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">

                  <h3 className="text-lg font-semibold text-white mb-2">Start Using the Prompts</h3>
                  <p className="text-gray-400 text-sm">
                    Begin with Prompt 1 to create compelling e-commerce product descriptions that can earn you $50-$150 each.
                  </p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">

                  <h3 className="text-lg font-semibold text-white mb-2">Monetize the Prompts</h3>
                  <p className="text-gray-400 text-sm">
                    Follow the monetization strategies for each prompt to start generating income within 24 hours.
                  </p>
                </div>
              </div>

              {/* Support Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  If you have any issues with your download or questions about the content, we're here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chris.t@ventarosales.com" 
                    className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg text-sm transition-colors font-semibold"
                  >
                    Email Support
                  </a>
                  <Link 
                    href={`/ebook?session_id=${session_id}`}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm transition-colors"
                  >
                    Access Ebook Again
                  </Link>
                </div>
              </div>

              {/* Session Info (for debugging) */}
              {session_id && (
                <div className="mt-8 text-xs text-gray-500">
                  Session ID: {session_id}
                </div>
              )}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Bonus Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">AI Prompt Tools</h3>
                <p className="text-gray-400 text-sm">
                  Recommended AI platforms to use with the prompts for maximum effectiveness.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Prompt Variations</h3>
                <p className="text-gray-400 text-sm">
                  Additional variations of each prompt to target different industries and use cases.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Prompt Income Tracker</h3>
                <p className="text-gray-400 text-sm">
                  Spreadsheet template to track your earnings from each prompt and identify your most profitable niches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}