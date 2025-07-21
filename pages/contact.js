import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Contact & Support - AI Prompts That Make You Money</title>
        <meta name="description" content="Get help with AI Prompts That Make You Money 15-page guide. Fast, friendly customer support for all your questions." />
        <meta name="robots" content="index, follow" />
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
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">Contact & Support</h1>
                <p className="text-gray-300 text-lg">
                  We're here to help! Get fast, friendly support for any questions about your ebook purchase.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Send us a message</h2>
                  
                  {submitted ? (
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 text-center">

                      <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-300">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        >
                          <option value="">Select a topic</option>
                          <option value="download-issue">Download Issue</option>

                          <option value="technical-support">Technical Support</option>
                          <option value="content-question">Content Question</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          placeholder="How can we help you?"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Other ways to reach us</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-2">Email Support</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        For general questions and support:
                      </p>
                      <a 
                        href="mailto:chris.t@ventarosales.com" 
                        className="text-white underline hover:text-gray-300"
                      >
                        chris.t@ventarosales.com
                      </a>
                    </div>
                    

                    
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-white mb-2">Response Time</h3>
                      <p className="text-gray-300 text-sm">
                        We typically respond within 24 hours during business days. 
                        For urgent issues, please mention "URGENT" in your subject line.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      <details className="bg-gray-800 border border-gray-700 rounded-lg">
                        <summary className="p-4 cursor-pointer text-white font-medium hover:bg-gray-750">
                          How do I download my ebook?
                        </summary>
                        <div className="px-4 pb-4 text-gray-300 text-sm">
                          After purchase, you'll be redirected to a success page with a download button. 
                          You can also re-download from the link in your confirmation email.
                        </div>
                      </details>
                      
                      <details className="bg-gray-800 border border-gray-700 rounded-lg">
                        <summary className="p-4 cursor-pointer text-white font-medium hover:bg-gray-750">
                          What if I didn't receive my download?
                        </summary>
                        <div className="px-4 pb-4 text-gray-300 text-sm">
                          Check your spam folder first. If you still can't find it, 
                          contact us with your order confirmation and we'll resend it immediately.
                        </div>
                      </details>
                      
                      <details className="bg-gray-800 border border-gray-700 rounded-lg">
                        <summary className="p-4 cursor-pointer text-white font-medium hover:bg-gray-750">
                          What is your sales policy?
                        </summary>
                        <div className="px-4 pb-4 text-gray-300 text-sm">
                          All sales are final. We do not offer refunds or returns on digital products. 
                          Please review the product details carefully before purchasing.
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <Link 
                  href="/"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
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