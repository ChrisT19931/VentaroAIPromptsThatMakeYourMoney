# AI Prompts That Make You Money - 15-Page Guide - Online Business

A complete online business for selling the "AI Prompts That Make You Money: 15-Page Guide" with Stripe payment integration and instant download functionality.

## Features

- 🏠 **SEO-Optimized Homepage** - Packed with profitable AI prompts and money-making keywords
- 💳 **Stripe Payment Integration** - Secure checkout process
- 📥 **Instant Download** - No signup required, direct PDF download
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Optimized for Vercel deployment

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Copy the example environment file and update with your actual keys:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your actual keys
   ```
   
   Verify your environment variables are set correctly:
   ```bash
   npm run verify-env
   ```
   
   Required environment variables include:
   ```
   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   
   # SendGrid
   SENDGRID_API_KEY=SG.your-sendgrid-api-key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   
   # App
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
   
   For detailed setup instructions, see [VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md).
   
   To test your environment variables, see [ENVIRONMENT_TESTING.md](ENVIRONMENT_TESTING.md).

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-agents-business.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add all required environment variables in Vercel dashboard:
     - Stripe: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
     - Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
     - SendGrid: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`
     - JWT: `JWT_SECRET`
     - App: `NEXT_PUBLIC_BASE_URL` (set to your Vercel deployment URL)
   - Deploy!
   
   For detailed instructions on setting up environment variables in Vercel, see [VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md).

## Stripe Setup

1. **Create Stripe Account** at [stripe.com](https://stripe.com)
2. **Get API Keys** from Stripe Dashboard > Developers > API keys
3. **Add Keys to Vercel** environment variables
4. **Test Payments** using Stripe test card: `4242 4242 4242 4242`

## File Structure

```
├── pages/
│   ├── index.js          # Homepage with SEO optimization
│   ├── buy.js            # Purchase page with Stripe checkout
│   ├── success.js        # Success page after payment
│   ├── ebook.js          # Ebook download page
│   ├── dashboard.js      # User dashboard
│   ├── login.js          # User login
│   ├── register.js       # User registration
│   ├── _app.js           # App configuration
│   └── api/
│       ├── auth/         # Authentication endpoints
│       ├── user/         # User-related endpoints
│       ├── create-checkout-session.js  # Stripe checkout API
│       ├── download.js                 # File download API
│       ├── webhook.js                  # Stripe webhook handler
│       └── verify-access.js            # Ebook access verification
├── lib/
│   ├── auth.js           # Authentication utilities
│   ├── sendgrid.js       # Email sending utilities
│   └── supabase.js       # Database utilities
├── scripts/
│   └── verify-env.js     # Environment variables verification
├── styles/
│   └── globals.css       # Global styles with Tailwind
├── .env.local.example    # Example environment variables
├── VERCEL_ENV_SETUP.md   # Vercel environment setup guide
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## SEO Keywords Included

- AI agents
- Artificial intelligence
- Make money online
- AI automation
- Passive income
- AI business
- Machine learning
- Digital products
- AI entrepreneurship

## Customization

1. **Replace Demo PDF** - Update `/pages/api/download.js` with your actual ebook
2. **Update Content** - Modify homepage copy in `/pages/index.js`
3. **Change Pricing** - Update price in `/pages/api/create-checkout-session.js`
4. **Add Analytics** - Include Google Analytics or other tracking

## Support

For issues or questions, check the Stripe documentation or Next.js docs.

## License

MIT License - feel free to use for your own projects!