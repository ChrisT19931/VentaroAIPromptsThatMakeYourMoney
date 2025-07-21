import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Ebook() {
  const router = useRouter()
  const { session_id, token } = router.query
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState('')
  const [purchaseInfo, setPurchaseInfo] = useState(null)

  useEffect(() => {
    // Check for admin authentication first
    const authToken = localStorage.getItem('token')
    if (authToken) {
      try {
        const payload = JSON.parse(atob(authToken.split('.')[1]))
        if (payload.isAdmin) {
          setAuthorized(true)
          setPurchaseInfo({ isAdmin: true, message: 'Admin access granted' })
          setLoading(false)
          return
        }
      } catch (e) {
        // Invalid token, continue with normal flow
      }
    }
    
    if (session_id || token) {
      verifyAccess()
    } else {
      setError('Access denied. Please complete your purchase first.')
      setLoading(false)
    }
  }, [session_id, token])

  const verifyAccess = async () => {
    try {
      const authToken = localStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
      }
      
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`
      }
      
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          session_id: session_id || null,
          access_token: token || null
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setAuthorized(true)
        setPurchaseInfo(data)
        
        // Update URL to use token if we got one back
        if (data.accessToken && !token) {
          router.replace(`/ebook?token=${data.accessToken}`, undefined, { shallow: true })
        }
      } else {
        setError(data.error || 'Access denied. Invalid or expired session.')
      }
    } catch (err) {
      setError('Unable to verify access. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        body: JSON.stringify({
          session_id: sessionId
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'AI-Prompts-That-Make-You-Money.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link href="/buy" className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold transition-colors">
            Purchase Access
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>AI Prompts That Make You Money - 15-Page Guide</title>
        <meta name="description" content="Your 15-page guide with profitable AI prompts to help you start making money right away" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Navigation */}
        <nav className="bg-black/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <img src="/vai-logo.svg" alt="VAI Logo" className="h-10 w-auto mr-3" />
                <h1 className="text-xl font-bold text-white">AI Prompts That Make You Money</h1>
              </Link>
              <div className="text-sm text-gray-400">
                Purchased Content
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="px-6 py-8 sm:p-10">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
                  AI Prompts That Make You Money
                </h1>
                <p className="text-xl text-gray-300">
                  15 Profitable AI Prompts to Start Earning Today
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  15 Pages • Ready-to-Use Prompts • Monetization Strategies
                </div>
                {purchaseInfo?.isAdmin && (
                  <div className="mt-6">
                    <div className="bg-yellow-600 text-black px-4 py-2 rounded-lg inline-block mb-4 font-bold">
                      🔑 ADMIN ACCESS
                    </div>
                  </div>
                )}
                <div className="mt-6">
                  <button
                    onClick={downloadPDF}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors transform hover:scale-105 shadow-lg"
                  >
                    📥 Download Complete PDF Guide
                  </button>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">What's Inside</h2>
                <div className="space-y-4">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 1: E-commerce Product Descriptions</h3>
                    <p className="text-gray-400 text-sm">Create compelling product descriptions that sell ($50-$150 each)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 2: SEO Blog Content</h3>
                    <p className="text-gray-400 text-sm">Generate high-ranking blog posts that attract organic traffic ($100-$300 each)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 3: Social Media Campaigns</h3>
                    <p className="text-gray-400 text-sm">Create viral social media content that engages audiences ($75-$200 per campaign)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 4: Email Marketing Sequences</h3>
                    <p className="text-gray-400 text-sm">Craft high-converting email sequences that drive sales ($150-$500 per sequence)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 5: Video Script Generation</h3>
                    <p className="text-gray-400 text-sm">Create engaging video scripts for YouTube and social media ($200-$500 per script)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 6: Freelance Proposal Template</h3>
                    <p className="text-gray-400 text-sm">Generate winning client proposals that land contracts ($100-$300 per template)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 7: AI Chatbot Personality</h3>
                    <p className="text-gray-400 text-sm">Create custom AI chatbot personalities for businesses ($500-$2,000 per chatbot)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 8: Digital Product Outline</h3>
                    <p className="text-gray-400 text-sm">Create detailed outlines for profitable digital products ($200-$1,000 per product)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 9: Webinar Script Generator</h3>
                    <p className="text-gray-400 text-sm">Create high-converting webinar scripts ($1,000-$5,000+ per funnel)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 10: Niche Selection Advisor</h3>
                    <p className="text-gray-400 text-sm">Identify profitable business niches with growth potential (save thousands)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 11: Online Course Curriculum</h3>
                    <p className="text-gray-400 text-sm">Design comprehensive online course structures ($500-$2,000 per course)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 12: SaaS Feature Prioritization</h3>
                    <p className="text-gray-400 text-sm">Optimize software development roadmaps ($300-$1,500 per analysis)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 13: Podcast Episode Planner</h3>
                    <p className="text-gray-400 text-sm">Create engaging podcast content strategies ($100-$500 per episode)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 14: Membership Site Content</h3>
                    <p className="text-gray-400 text-sm">Design recurring revenue membership content ($300-$2,000 monthly)</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Prompt 15: AI Service Packaging</h3>
                    <p className="text-gray-400 text-sm">Create profitable AI service packages ($1,000-$10,000+ per client)</p>
                  </div>
                </div>
              </div>

              {/* Sample Content */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Prompt 1: E-commerce Product Descriptions</h2>
                <div className="prose prose-invert max-w-none">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">The Prompt</h3>
                    <p className="text-gray-300 mb-4 font-mono bg-gray-900 p-4 rounded-lg">
                      Create a compelling product description for [product name] that will convert browsers into buyers. Include: 1) An attention-grabbing headline, 2) An emotional hook that connects with the target audience of [target demographic], 3) At least 3 key benefits (not just features), 4) Address 2 common objections, 5) A clear call-to-action. Use persuasive language that creates urgency without being pushy. Tone should be [tone: professional/casual/luxury/friendly].
                    </p>
                    <p className="text-gray-300 mb-4">
                      This prompt is designed to create product descriptions that sell. By specifying the target demographic and desired tone, you'll get highly tailored content that resonates with the intended audience and drives conversions.
                    </p>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">How to Monetize This Prompt</h3>
                    <p className="text-gray-300 mb-4">
                      E-commerce product descriptions are in constant demand. Here's how to turn this prompt into income:
                    </p>
                    <ul className="text-gray-300 space-y-2 mb-4">
                      <li>• Offer product description services on Fiverr, Upwork, or Etsy ($50-$150 per description)</li>
                      <li>• Create packages for e-commerce stores (10 descriptions for $500)</li>
                      <li>• Partner with Shopify store owners who need to refresh their product listings</li>
                      <li>• Offer a subscription service for stores that regularly add new products</li>
                      <li>• Create a specialized service for specific niches (luxury goods, tech products, etc.)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Example Output</h3>
                    <p className="text-gray-300 mb-4">
                      Here's an example of what this prompt can generate for a fitness product:
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 mb-4">
                      <h4 className="text-lg font-bold text-white mb-2">TRANSFORM YOUR BODY IN JUST 30 DAYS WITH THE FLEXFIT PRO</h4>
                      <p className="text-gray-300 mb-3">
                        Tired of fitness equipment that collects dust instead of helping you collect compliments? The FlexFit Pro was designed specifically for busy professionals who want gym-quality results without the gym membership.
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>✓ Save valuable space</strong> with our patented folding design that fits under any bed or in any closet - perfect for apartment living.<br/>
                        <strong>✓ Achieve results faster</strong> with our scientifically-proven resistance system that engages 95% more muscle fibers than traditional equipment.<br/>
                        <strong>✓ Protect your joints</strong> with our ergonomic design and cushioned contact points, making workouts comfortable even for those with previous injuries.
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>"But will I actually use it?"</strong> Unlike complicated equipment that requires a learning curve, the FlexFit Pro comes with a simple 10-minute setup and video tutorials for all fitness levels.<br/>
                        <strong>"Is it worth the investment?"</strong> At less than the cost of 3 months of gym membership, the FlexFit Pro pays for itself while giving you 24/7 access to fitness on your schedule.
                      </p>
                      <p className="text-gray-300 font-bold">
                        Order your FlexFit Pro today and get our 30-Day Transformation Program FREE! Limited time offer - only while supplies last!                        
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Reading Notice */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ready to start earning!</h3>
                <p className="text-blue-100 mb-4">
                  You have access to all 15 profitable AI prompts with examples and monetization strategies for each one.
                </p>
                <p className="text-sm text-blue-200">
                  Bookmark this page for easy access to your purchased content.
                </p>
              </div>

              {/* Support */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Need help or have questions about the content?
                </p>
                <a 
                  href="mailto:chris.t@ventarosales.com" 
                  className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-lg text-sm transition-colors font-semibold"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}