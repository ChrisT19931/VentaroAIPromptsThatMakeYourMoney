/**
 * JWT Secret Generator
 * 
 * This script generates a secure random string suitable for use as a JWT secret.
 * Run this script with Node.js to generate a new secret.
 */

function generateSecureSecret(length = 64) {
  const crypto = require('crypto');
  return crypto.randomBytes(length).toString('hex');
}

const jwtSecret = generateSecureSecret();

console.log('\n🔐 Generated JWT Secret:\n');
console.log(jwtSecret);
console.log('\n✅ Copy this value and set it as your JWT_SECRET in .env.local and Vercel environment variables.\n');
console.log('⚠️ WARNING: Keep this secret secure! Do not commit it to your repository or share it publicly.\n');