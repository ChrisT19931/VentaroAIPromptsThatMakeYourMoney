import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '7d'

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

export const hashPassword = async (password) => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const generateVerificationToken = () => {
  return uuidv4()
}

export const generatePasswordResetToken = () => {
  return uuidv4()
}

// Middleware to verify JWT token from request
export const verifyAuthToken = (req) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  return verifyToken(token)
}

// Generate secure access token for ebook
export const generateEbookAccessToken = (userId, purchaseId) => {
  return jwt.sign(
    { 
      userId, 
      purchaseId, 
      type: 'ebook_access',
      iat: Math.floor(Date.now() / 1000)
    }, 
    JWT_SECRET, 
    { expiresIn: '365d' } // Long-lived for ebook access
  )
}

export const verifyEbookAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (decoded.type !== 'ebook_access') {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}