import { supabaseAdmin } from '../../../lib/supabase'
import { comparePassword, generateToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    // Check for admin user first
    const isAdminUser = email.toLowerCase() === 'chris.t@ventarosales.com'
    
    if (isAdminUser && password === 'Rabbit5511') {
      // Admin user - create or update in database
      let { data: adminUser, error: adminError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()
      
      if (adminError || !adminUser) {
        // Create admin user if doesn't exist
        const { hashPassword } = await import('../../../lib/auth')
        const hashedPassword = await hashPassword(password)
        
        const { data: newAdmin, error: createError } = await supabaseAdmin
          .from('users')
          .insert({
            email: email.toLowerCase(),
            password: hashedPassword,
            name: 'Chris T (Admin)',
            email_verified: true,
            is_admin: true,
            verified_at: new Date().toISOString()
          })
          .select()
          .single()
        
        if (createError) {
          console.error('Error creating admin user:', createError)
          return res.status(500).json({ error: 'Failed to create admin user' })
        }
        
        adminUser = newAdmin
      } else {
        // Update existing admin user
        await supabaseAdmin
          .from('users')
          .update({ 
            is_admin: true,
            email_verified: true,
            last_login: new Date().toISOString()
          })
          .eq('id', adminUser.id)
        
        adminUser.is_admin = true
        adminUser.email_verified = true
      }
      
      // Generate JWT token for admin
      const token = generateToken({
        userId: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        isAdmin: true
      })
      
      return res.status(200).json({
        message: 'Admin login successful',
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          emailVerified: true,
          isAdmin: true
        }
      })
    }
    
    // Regular user authentication
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check if email is verified
    if (!user.email_verified) {
      return res.status(401).json({ 
        error: 'Please verify your email before logging in',
        needsVerification: true
      })
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Update last login
    await supabaseAdmin
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.is_admin || false
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.email_verified,
        isAdmin: user.is_admin || false
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}