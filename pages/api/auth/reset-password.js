import { supabaseAdmin } from '../../../lib/supabase'
import { hashPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, password } = req.body

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' })
  }

  try {
    // Find user with this reset token
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('reset_token', token)
      .single()

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' })
    }

    // Check if token is expired
    const now = new Date()
    const expiresAt = new Date(user.reset_expires)
    
    if (now > expiresAt) {
      return res.status(400).json({ error: 'Reset token has expired' })
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password and clear reset token
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        password: hashedPassword,
        reset_token: null,
        reset_expires: null,
        password_updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Password update error:', updateError)
      return res.status(500).json({ error: 'Failed to update password' })
    }

    res.status(200).json({ 
      message: 'Password reset successfully! You can now log in with your new password.',
      success: true
    })
  } catch (error) {
    console.error('Password reset error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}