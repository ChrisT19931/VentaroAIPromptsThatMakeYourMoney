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
   Create a `.env.local` file with your Stripe keys:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

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
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
   - Deploy!

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
│   ├── success.js        # Download page after payment
│   ├── _app.js           # App configuration
│   └── api/
│       ├── create-checkout-session.js  # Stripe checkout API
│       └── download.js                 # File download API
├── styles/
│   └── globals.css       # Global styles with Tailwind
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