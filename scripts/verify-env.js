/**
 * Environment Variables Verification Script
 * 
 * This script checks if all required environment variables are set
 * and provides guidance on how to set them up.
 */

const requiredVariables = {
  // Stripe
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': {
    description: 'Stripe publishable key (starts with pk_)',
    public: true,
    prefix: 'pk_'
  },
  'STRIPE_SECRET_KEY': {
    description: 'Stripe secret key (starts with sk_)',
    public: false,
    prefix: 'sk_'
  },
  'STRIPE_WEBHOOK_SECRET': {
    description: 'Stripe webhook secret (starts with whsec_)',
    public: false,
    prefix: 'whsec_'
  },
  
  // Supabase
  'NEXT_PUBLIC_SUPABASE_URL': {
    description: 'Supabase project URL',
    public: true,
    pattern: /^https:\/\/.+\.supabase\.co$/
  },
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': {
    description: 'Supabase anonymous key',
    public: true
  },
  'SUPABASE_SERVICE_ROLE_KEY': {
    description: 'Supabase service role key',
    public: false
  },
  
  // SendGrid
  'SENDGRID_API_KEY': {
    description: 'SendGrid API key (starts with SG.)',
    public: false,
    prefix: 'SG.'
  },
  'SENDGRID_FROM_EMAIL': {
    description: 'Email address to send from',
    public: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  
  // JWT
  'JWT_SECRET': {
    description: 'Secret key for JWT tokens (min 32 chars)',
    public: false,
    minLength: 32
  },
  
  // App
  'NEXT_PUBLIC_BASE_URL': {
    description: 'Base URL of your application',
    public: true,
    pattern: /^https?:\/\/.+/
  }
};

function checkEnvironmentVariables() {
  console.log('\n🔍 Checking environment variables...\n');
  
  let missingCount = 0;
  let invalidCount = 0;
  
  for (const [name, config] of Object.entries(requiredVariables)) {
    const value = process.env[name];
    const isSet = !!value;
    
    process.stdout.write(`${name}: `);
    
    if (!isSet) {
      console.log('❌ Missing');
      missingCount++;
      continue;
    }
    
    let isValid = true;
    let validationMessage = '';
    
    // Validate prefix
    if (config.prefix && !value.startsWith(config.prefix)) {
      isValid = false;
      validationMessage = `should start with '${config.prefix}'`;
    }
    
    // Validate pattern
    if (config.pattern && !config.pattern.test(value)) {
      isValid = false;
      validationMessage = `doesn't match expected format`;
    }
    
    // Validate minimum length
    if (config.minLength && value.length < config.minLength) {
      isValid = false;
      validationMessage = `too short (min ${config.minLength} characters)`;
    }
    
    if (isValid) {
      console.log('✅ Set');
    } else {
      console.log(`⚠️ Invalid - ${validationMessage}`);
      invalidCount++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`Total variables required: ${Object.keys(requiredVariables).length}`);
  console.log(`Missing: ${missingCount}`);
  console.log(`Invalid: ${invalidCount}`);
  console.log(`Correctly configured: ${Object.keys(requiredVariables).length - missingCount - invalidCount}`);
  
  if (missingCount > 0 || invalidCount > 0) {
    console.log('\n⚠️ Some environment variables are missing or invalid.');
    console.log('Please check the VERCEL_ENV_SETUP.md file for instructions on setting up environment variables.');
  } else {
    console.log('\n🎉 All environment variables are correctly configured!');
  }
}

checkEnvironmentVariables();