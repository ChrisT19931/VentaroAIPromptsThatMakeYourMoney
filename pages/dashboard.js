import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login?redirect=/dashboard')
      return
    }
    
    try {
      setUser(JSON.parse(userData))
      fetchPurchases(token)
    } catch (err) {
      console.error('Auth error:', err)
      router.push('/login')
    }
  }

  const fetchPurchases = async (token) => {
    try {
      const response = await fetch('/api/user/purchases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setPurchases(data.purchases || [])
      } else if (response.status === 401) {
        // Token expired
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        router.push('/login')
      }
    } catch (err) {
      setError('Failed to load purchases')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    router.push('/')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatAmount = (amount, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Account Info */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Account Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email Status</dt>
                  <dd className="mt-1 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user?.emailVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user?.emailVerified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Purchases */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Your Purchases
              </h3>
              
              {purchases.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't made any purchases yet.</p>
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  >
                    Browse Our Ebook
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">
                            {purchase.product_name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Purchased on {formatDate(purchase.purchased_at)}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatAmount(purchase.amount, purchase.currency)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            purchase.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {purchase.status}
                          </span>
                          {purchase.access_token && (
                            <Link
                              href={`/ebook?token=${purchase.access_token}`}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-black hover:bg-gray-800"
                            >
                              Access Ebook
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black border border-gray-200 rounded-lg hover:shadow-md"
                >
                  <div>
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Browse Ebook
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Explore our Ventaro AI - AI Prompts That Make You Money guide
                    </p>
                  </div>
                </Link>
                
                <Link
                  href="/contact"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black border border-gray-200 rounded-lg hover:shadow-md"
                >
                  <div>
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Contact Support
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Get help with your purchase
                    </p>
                  </div>
                </Link>
                
                <Link
                  href="/terms"
                  className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-black border border-gray-200 rounded-lg hover:shadow-md"
                >
                  <div>
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Terms & Conditions
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      View our terms of service
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}