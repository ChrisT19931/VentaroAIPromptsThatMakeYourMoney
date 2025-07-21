import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body

  if (!token) {
    return res.status(400).json({ error: 'Verification token is required' })
  }

  try {
    // Find user with this verification token
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('verification_token', token)
      .single()

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' })
    }

    // Check if token is expired
    const now = new Date()
    const expiresAt = new Date(user.verification_expires)
    
    if (now > expiresAt) {
      return res.status(400).json({ error: 'Verification token has expired' })
    }

    // Check if already verified
    if (user.email_verified) {
      return res.status(200).json({ message: 'Email already verified' })
    }

    // Update user as verified
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        email_verified: true,
        verification_token: null,
        verification_expires: null,
        verified_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Update error:', updateError)
      return res.status(500).json({ error: 'Failed to verify email' })
    }

    res.status(200).json({ 
      message: 'Email verified successfully! You can now log in.',
      verified: true
    })
  } catch (error) {
    console.error('Email verification error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}