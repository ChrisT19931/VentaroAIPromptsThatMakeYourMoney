import { supabaseAdmin } from '../../../lib/supabase'
import { hashPassword, generateVerificationToken } from '../../../lib/auth'
import { sendVerificationEmail } from '../../../lib/sendgrid'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' })
  }

  try {
    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' })
    }

    // Hash password and generate verification token
    const hashedPassword = await hashPassword(password)
    const verificationToken = generateVerificationToken()
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user in database
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        verification_token: verificationToken,
        verification_expires: verificationExpires.toISOString(),
        email_verified: false,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to create user' })
    }

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken)
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error)
      // Don't fail registration if email fails, user can request resend
    }

    res.status(201).json({ 
      message: 'User created successfully. Please check your email to verify your account.',
      userId: user.id
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}