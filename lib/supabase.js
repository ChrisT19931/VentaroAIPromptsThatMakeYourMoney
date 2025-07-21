import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Only throw error in production environment or when actually using Supabase
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined'
if ((!supabaseUrl || !supabaseAnonKey) && !isBuildTime) {
  console.warn('Missing Supabase environment variables')
}

// Client for browser/frontend use
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Admin client for server-side operations (with service role key)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Utility functions for database operations
export const dbOperations = {
  // Create a new order record
  async createOrder(orderData) {
    try {
      // Validate and sanitize input
      const sanitizedData = {
        customer_email: orderData.customer_email?.toLowerCase().trim(),
        stripe_session_id: orderData.stripe_session_id,
        stripe_payment_intent_id: orderData.stripe_payment_intent_id,
        amount: orderData.amount,
        currency: orderData.currency || 'usd',
        product_name: orderData.product_name,
        status: orderData.status || 'completed',
        created_at: new Date().toISOString(),
        metadata: orderData.metadata || {}
      }

      if (!supabaseAdmin) {
        console.warn('Supabase admin client not available')
        return { data: null, error: new Error('Supabase admin client not available') }
      }

      const { data, error } = await supabaseAdmin
        .from('orders')
        .insert([sanitizedData])
        .select()

      if (error) {
        console.error('Error creating order:', error)
        throw error
      }

      return data[0]
    } catch (error) {
      console.error('Database error in createOrder:', error)
      throw error
    }
  },

  // Get order by session ID
  async getOrderBySessionId(sessionId) {
    try {
      if (!sessionId) {
        throw new Error('Session ID is required')
      }

      if (!supabase) {
        console.warn('Supabase client not available')
        return null
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching order:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Database error in getOrderBySessionId:', error)
      throw error
    }
  },

  // Validate session access for ebook download
  async validateEbookAccess(sessionId) {
    try {
      if (!sessionId) {
        return false
      }

      const order = await this.getOrderBySessionId(sessionId)
      return order && order.status === 'completed'
    } catch (error) {
      console.error('Error validating ebook access:', error)
      return false
    }
  },

  // Log contact form submissions
  async createContactSubmission(contactData) {
    try {
      const sanitizedData = {
        name: contactData.name?.trim(),
        email: contactData.email?.toLowerCase().trim(),
        message: contactData.message?.trim(),
        created_at: new Date().toISOString(),
        ip_address: contactData.ip_address,
        user_agent: contactData.user_agent
      }

      if (!supabaseAdmin) {
        console.warn('Supabase admin client not available')
        return { data: null, error: new Error('Supabase admin client not available') }
      }

      const { data, error } = await supabaseAdmin
        .from('contact_submissions')
        .insert([sanitizedData])
        .select()

      if (error) {
        console.error('Error creating contact submission:', error)
        throw error
      }

      return data[0]
    } catch (error) {
      console.error('Database error in createContactSubmission:', error)
      throw error
    }
  }
}

// Rate limiting utility
export const rateLimiter = {
  // Simple in-memory rate limiter (for production, use Redis or similar)
  requests: new Map(),
  
  isAllowed(identifier, maxRequests = 10, windowMs = 60000) {
    const now = Date.now()
    const windowStart = now - windowMs
    
    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, [])
    }
    
    const userRequests = this.requests.get(identifier)
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(timestamp => timestamp > windowStart)
    
    if (validRequests.length >= maxRequests) {
      return false
    }
    
    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    
    return true
  }
}

// Input sanitization utilities
export const sanitize = {
  email(email) {
    if (!email || typeof email !== 'string') return null
    return email.toLowerCase().trim()
  },
  
  text(text, maxLength = 1000) {
    if (!text || typeof text !== 'string') return null
    return text.trim().substring(0, maxLength)
  },
  
  html(text) {
    if (!text || typeof text !== 'string') return null
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }
}