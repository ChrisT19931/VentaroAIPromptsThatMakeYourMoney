-- Users table for authentication
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  verification_expires TIMESTAMP WITH TIME ZONE,
  reset_token VARCHAR(255),
  reset_expires TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  last_login TIMESTAMP WITH TIME ZONE,
  password_updated_at TIMESTAMP WITH TIME ZONE
);

-- Purchases table for tracking ebook sales
CREATE TABLE purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  amount INTEGER NOT NULL, -- Amount in cents
  currency VARCHAR(3) DEFAULT 'usd',
  product_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  access_token TEXT,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessed_at TIMESTAMP WITH TIME ZONE,
  access_count INTEGER DEFAULT 0
);

-- User sessions table for tracking active sessions
CREATE TABLE user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Email logs table for tracking sent emails
CREATE TABLE email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  email_type VARCHAR(50) NOT NULL, -- 'verification', 'password_reset', 'purchase_confirmation'
  subject VARCHAR(255),
  status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'failed', 'delivered', 'opened'
  sendgrid_message_id VARCHAR(255),
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_users_reset_token ON users(reset_token);
CREATE INDEX idx_purchases_stripe_session ON purchases(stripe_session_id);
CREATE INDEX idx_purchases_customer_email ON purchases(customer_email);
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only see their own sessions
CREATE POLICY "Users can view own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (service role can access everything)
CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage purchases" ON purchases
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage sessions" ON user_sessions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage email logs" ON email_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Functions for cleanup
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  -- Clean up expired verification tokens
  UPDATE users 
  SET verification_token = NULL, verification_expires = NULL
  WHERE verification_expires < NOW() AND verification_token IS NOT NULL;
  
  -- Clean up expired reset tokens
  UPDATE users 
  SET reset_token = NULL, reset_expires = NULL
  WHERE reset_expires < NOW() AND reset_token IS NOT NULL;
  
  -- Clean up expired sessions
  DELETE FROM user_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup to run daily (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-expired-tokens', '0 2 * * *', 'SELECT cleanup_expired_tokens();');