import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - AI Prompts That Make You Money</title>
        <meta name="description" content="Privacy policy for AI Prompts That Make You Money 15-page guide - how we collect, use, and protect your information." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Navigation */}
        <nav className="bg-black/90 backdrop-blur-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <img src="/vai-logo.svg" alt="VAI Logo" className="h-10 w-auto mr-3" />
                <span className="text-xl font-bold text-white">AI Prompts That Make You Money</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="px-6 py-8 sm:p-10">
              <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
              
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                    <p>
                      We collect minimal information necessary to process your purchase:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Email address (for purchase confirmation and support)</li>
                      <li>Payment information (processed securely by Stripe)</li>
                      <li>Basic analytics data (page views, device type) for site improvement</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                    <p>
                      Your information is used solely for:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Processing your ebook purchase</li>
                      <li>Providing customer support</li>
                      <li>Sending purchase confirmations and receipts</li>
                      <li>Improving our website and user experience</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                    <p>
                      We do not sell, trade, or share your personal information with third parties, except:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Stripe (for secure payment processing)</li>
                      <li>When required by law or to protect our rights</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
                    <p>
                      We implement appropriate security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>SSL encryption for all data transmission</li>
                      <li>Secure payment processing through Stripe</li>
                      <li>Regular security updates and monitoring</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Cookies and Analytics</h2>
                    <p>
                      We use minimal cookies and analytics to:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Remember your preferences</li>
                      <li>Understand how visitors use our site</li>
                      <li>Improve site performance and user experience</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">6. Email Communications</h2>
                    <p>
                      We will only send you:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Purchase confirmations and receipts</li>
                      <li>Customer support responses</li>
                      <li>Important updates about your purchase</li>
                    </ul>
                    <p className="mt-2">
                      We do not send marketing emails or newsletters unless you explicitly opt-in.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
                    <p>
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Request access to your personal data</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Withdraw consent for data processing</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
                    <p>
                      For privacy-related questions or requests, contact us at: 
                      <a href="mailto:privacy@ai-agents-mastery.com" className="text-white underline hover:text-gray-300">
                        privacy@ai-agents-mastery.com
                      </a>
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-white mb-3">9. Policy Updates</h2>
                    <p>
                      We may update this privacy policy to reflect changes in our practices or legal requirements. 
                      We will notify users of significant changes.
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </section>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <Link 
                  href="/"
                  className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}