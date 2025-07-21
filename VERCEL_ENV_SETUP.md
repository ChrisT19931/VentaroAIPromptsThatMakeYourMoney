# Setting Up Environment Variables in Vercel

This guide explains how to set up the required environment variables for your application in Vercel.

## Required Environment Variables

The following environment variables need to be configured in your Vercel project:

### Stripe Configuration

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (starts with `pk_`)
- `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_`)
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret (starts with `whsec_`)

### Supabase Configuration

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (e.g., `https://your-project.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

### SendGrid Configuration

- `SENDGRID_API_KEY`: Your SendGrid API key (starts with `SG.`)
- `SENDGRID_FROM_EMAIL`: The email address to send emails from

### JWT Configuration

- `JWT_SECRET`: A secure secret key for JWT token generation (min 32 characters)
  - You can generate a secure JWT secret using: `npm run generate-jwt-secret`

### App Configuration

- `NEXT_PUBLIC_BASE_URL`: The base URL of your application (e.g., `https://your-app.vercel.app`)

## How to Set Up Environment Variables in Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on the "Settings" tab
4. In the left sidebar, click on "Environment Variables"
5. Add each environment variable with its corresponding value
6. Make sure to select the appropriate environments (Production, Preview, Development)
7. Click "Save" to apply the changes

## Important Notes

- Variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser
- Keep your secret keys secure and never commit them to your repository
- For development, copy the `.env.local.example` file to `.env.local` and fill in your values
- After updating environment variables, redeploy your application for the changes to take effect

## Testing Environment Variables

To verify that your environment variables are correctly set up:

1. Deploy your application
2. Check the logs for any warnings about missing environment variables
3. Test the Stripe payment flow
4. Verify that emails are being sent via SendGrid
5. Confirm that Supabase database operations are working

If you encounter any issues, double-check your environment variable values and ensure they are correctly formatted.