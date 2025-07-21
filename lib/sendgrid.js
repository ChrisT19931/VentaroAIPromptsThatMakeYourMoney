import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      html,
      text
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('SendGrid error:', error)
    return { success: false, error: error.message }
  }
}

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Verify Your Email Address</h2>
      <p>Thank you for signing up! Please click the button below to verify your email address:</p>
      <a href="${verificationUrl}" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Verify Email</a>
      <p>Or copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    </div>
  `
  
  return sendEmail({
    to: email,
    subject: 'Verify Your Email - AI Prompts That Make You Money',
    html,
    text: `Verify your email by visiting: ${verificationUrl}`
  })
}

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Reset Password</a>
      <p>Or copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #666;">${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `
  
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - AI Prompts That Make You Money',
    html,
    text: `Reset your password by visiting: ${resetUrl}`
  })
}

export const sendPurchaseConfirmation = async (email, customerName, accessLink) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      templateId: 'd-7e4a7874657349d4bdc34d9a64edc5b1',
      dynamicTemplateData: {
        customerName: customerName,
        accessLink: accessLink,
        productName: 'AI Prompts That Make You Money: 15-Page Guide',
        supportEmail: 'chris.t@ventarosales.com'
      }
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('SendGrid purchase confirmation error:', error)
    return { success: false, error: error.message }
  }
}