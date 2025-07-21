# Environment Variables Testing Guide

This guide will help you test and verify that your environment variables are correctly set up for the AI Prompts That Make You Money application.

## Prerequisites

1. You have copied `.env.local.example` to `.env.local`
2. You have filled in your actual API keys and configuration values in `.env.local`
3. You have run `npm run verify-env` to check if all required variables are set

## Testing Stripe Integration

### 1. Verify Stripe Environment Variables

Ensure you have the following Stripe variables set in your `.env.local` file:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2. Test Stripe Checkout

1. Start the development server: `npm run dev`
2. Navigate to http://localhost:3000/buy
3. Enter an email address and click "Buy Now"
4. You should be redirected to the Stripe checkout page
5. If you see an error message about Stripe publishable key, check that your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correctly set

### 3. Test Stripe Webhook (Optional)

To test the Stripe webhook locally:

1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to your Stripe account: `stripe login`
3. Forward webhook events: `stripe listen --forward-to http://localhost:3000/api/webhook`
4. Make a test payment to trigger the webhook

## Testing Supabase Integration

### 1. Verify Supabase Environment Variables

Ensure you have the following Supabase variables set in your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Test Supabase Connection

1. Navigate to http://localhost:3000/register
2. Create a new account
3. You should be able to register and login successfully
4. If you encounter database errors, check your Supabase configuration

## Testing SendGrid Integration

### 1. Verify SendGrid Environment Variables

Ensure you have the following SendGrid variables set in your `.env.local` file:

```
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

### 2. Test Email Sending

1. Register a new account with your email
2. Check your inbox for a verification email
3. Complete a test purchase to receive a purchase confirmation email
4. If you don't receive emails, check your SendGrid configuration and API key

## Testing JWT Authentication

### 1. Verify JWT Environment Variable

Ensure you have the JWT secret set in your `.env.local` file:

```
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
```

You can generate a secure JWT secret using the provided script:

```bash
npm run generate-jwt-secret
```

This will generate a random 64-character hexadecimal string that you can use as your JWT secret.

### 2. Test Authentication

1. Register and login to your account
2. Navigate to http://localhost:3000/dashboard
3. You should see your account information and purchases
4. If you're automatically logged out or see authentication errors, check your JWT configuration

## Common Issues and Solutions

### Stripe Error: "Please call Stripe() with your publishable key"

**Solution:** Ensure your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correctly set in `.env.local` and that the development server has been restarted after making changes.

### Supabase Error: "Error connecting to database"

**Solution:** Verify your Supabase URL and keys. Make sure your Supabase project is active and the database is online.

### SendGrid Error: "API key does not start with 'SG.'"

**Solution:** Ensure your SendGrid API key is correctly formatted and begins with 'SG.'.

### JWT Error: "jwt malformed"

**Solution:** Check that your JWT_SECRET is at least 32 characters long and that you're not changing it between server restarts.

## Verifying All Environment Variables

Run the verification script to check all environment variables at once:

```bash
npm run verify-env
```

This will provide a summary of which variables are correctly configured and which need attention.

## Next Steps

Once all environment variables are correctly set up and tested locally, you can deploy your application to Vercel. Make sure to add all the same environment variables in your Vercel project settings.

For detailed instructions on setting up environment variables in Vercel, see [VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md).