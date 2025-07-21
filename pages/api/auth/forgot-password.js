import { supabaseAdmin } from '../../../lib/supabase'
import { generatePasswordResetToken } from '../../../lib/auth'
import { sendPasswordResetEmail } from '../../../lib/sendgrid'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    // Check if user exists
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name')
      .eq('email', email.toLowerCase())
      .single()

    // Always return success to prevent email enumeration
    if (error || !user) {
      return res.status(200).json({ 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      })
    }

    // Generate reset token
    const resetToken = generatePasswordResetToken()
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Save reset token to database
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        reset_token: resetToken,
        reset_expires: resetExpires.toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Database update error:', updateError)
      return res.status(200).json({ 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      })
    }

    // Send reset email
    const emailResult = await sendPasswordResetEmail(user.email, resetToken)
    
    if (!emailResult.success) {
      console.error('Password reset email failed:', emailResult.error)
    }

    res.status(200).json({ 
      message: 'If an account with that email exists, a password reset link has been sent.' 
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(200).json({ 
      message: 'If an account with that email exists, a password reset link has been sent.' 
    })
  }
}