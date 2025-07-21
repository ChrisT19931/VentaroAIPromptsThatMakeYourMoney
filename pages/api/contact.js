import sgMail from '@sendgrid/mail'
import { dbOperations, rateLimiter, sanitize } from '../../lib/supabase'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { name, email, message } = req.body
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    const userAgent = req.headers['user-agent'] || 'unknown'

    // Rate limiting
    if (!rateLimiter.isAllowed(clientIp, 5, 300000)) { // 5 requests per 5 minutes
      return res.status(429).json({ error: 'Too many requests. Please try again later.' })
    }

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize.text(name, 100),
      email: sanitize.email(email),
      message: sanitize.text(message, 2000),
      ip_address: clientIp,
      user_agent: userAgent
    }

    // Additional validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      return res.status(400).json({ error: 'Invalid input data' })
    }

    // Check for spam patterns
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money']
    const messageText = sanitizedData.message.toLowerCase()
    const hasSpam = spamKeywords.some(keyword => messageText.includes(keyword))
    
    if (hasSpam) {
      console.log('Spam detected from:', sanitizedData.email)
      return res.status(400).json({ error: 'Message contains prohibited content' })
    }

    // Store in database
    try {
      await dbOperations.createContactSubmission(sanitizedData)
      console.log('Contact submission stored for:', sanitizedData.email)
    } catch (dbError) {
      console.error('Failed to store contact submission:', dbError)
      // Continue with email sending even if DB fails
    }

    // Send notification email to admin
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || 'chris.t@ventarosales.com',
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'chris.t@ventarosales.com',
        name: 'AI Prompts Contact Form'
      },
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitize.html(sanitizedData.name)}</p>
        <p><strong>Email:</strong> ${sanitize.html(sanitizedData.email)}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${sanitize.html(sanitizedData.message).replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          <strong>Submitted:</strong> ${new Date().toISOString()}<br>
          <strong>IP Address:</strong> ${clientIp}<br>
          <strong>User Agent:</strong> ${sanitize.html(userAgent)}
        </p>
      `
    }

    await sgMail.send(adminMsg)
    console.log('Contact form notification sent to admin')

    // Send confirmation email to customer
    const customerMsg = {
      to: sanitizedData.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'chris.t@ventarosales.com',
        name: 'AI Prompts That Make You Money'
      },
      replyTo: process.env.SENDGRID_REPLY_TO || 'chris.t@ventarosales.com',
      subject: 'Thank you for contacting us!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting us!</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">We've received your message</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <p>Hi ${sanitize.html(sanitizedData.name)},</p>
            
            <p>Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">Your Message:</h3>
              <p style="margin: 0; font-style: italic;">${sanitize.html(sanitizedData.message).replace(/\n/g, '<br>')}</p>
            </div>
            
            <p>In the meantime, feel free to check out our <a href="${process.env.NEXT_PUBLIC_BASE_URL}/buy" style="color: #667eea;">AI Prompts Guide</a> if you haven't already!</p>
            
            <p>Best regards,<br>
            The AI Prompts Team</p>
            
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
              <p>This is an automated confirmation. Please do not reply to this email.</p>
              <p>For support, contact us at <a href="mailto:chris.t@ventarosales.com" style="color: #667eea;">chris.t@ventarosales.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    await sgMail.send(customerMsg)
    console.log('Contact form confirmation sent to:', sanitizedData.email)

    res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    // Don't expose internal errors to client
    res.status(500).json({ 
      error: 'Something went wrong. Please try again later.' 
    })
  }
}