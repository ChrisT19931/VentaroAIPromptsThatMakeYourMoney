import Stripe from 'stripe'
import fs from 'fs'
import path from 'path'
import { verifyAuthToken } from '../../lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { session_id } = req.body

      // Check for admin user access first
      const authUser = verifyAuthToken(req)
      if (authUser && authUser.isAdmin) {
        // Admin user gets free access
        const pdfContent = generateAIPromptsEbook()
        
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename="AI-Prompts-That-Make-You-Money-Admin.pdf"')
        res.setHeader('Content-Length', pdfContent.length)
        
        return res.status(200).send(pdfContent)
      }

      if (!session_id) {
        return res.status(400).json({ error: 'Session ID is required' })
      }

      // Verify the payment session with Stripe
      const session = await stripe.checkout.sessions.retrieve(session_id)
      
      if (session.payment_status !== 'paid') {
        return res.status(403).json({ error: 'Payment not completed' })
      }

      // Generate our 15-page ebook with AI prompts that make money
      const pdfContent = generateAIPromptsEbook()
      
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename="AI-Prompts-That-Make-You-Money.pdf"')
      res.setHeader('Content-Length', pdfContent.length)
      
      res.status(200).send(pdfContent)
    } catch (err) {
      console.error('Download error:', err)
      res.status(500).json({ error: 'Download failed' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// Generate a 15-page ebook with AI prompts that make money
function generateAIPromptsEbook() {
  // Create PDF content with 15 pages of profitable AI prompts
  const content = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R 4 0 R 5 0 R 6 0 R 7 0 R 8 0 R 9 0 R 10 0 R 11 0 R 12 0 R 13 0 R 14 0 R 15 0 R 16 0 R 17 0 R 18 0 R 19 0 R 20 0 R]
/Count 18
>>
endobj

% Page 1 - Cover Page
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 18 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 2 - Introduction
4 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 19 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 3 - Prompt 1: E-commerce Product Description Generator
5 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 20 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 4 - Prompt 2: Social Media Content Calendar Creator
6 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 21 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 5 - Prompt 3: SEO Blog Post Outline Generator
7 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 22 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 6 - Prompt 4: Email Marketing Sequence Generator
8 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 23 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 7 - Prompt 5: Video Script Generator
9 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 24 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 8 - Prompt 6: Freelance Proposal Template Generator
10 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 25 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 9 - Prompt 7: AI Chatbot Personality Creator
11 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 26 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 10 - Prompt 8: Digital Product Outline Creator
12 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 27 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 11 - Prompt 9: Automated Webinar Script Generator
13 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 28 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 12 - Prompt 10: Niche Selection Advisor
14 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 29 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 13 - Prompt 11: Sales Funnel Blueprint Generator
15 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 30 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 14 - Prompt 12: Course Curriculum Creator
16 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 31 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Page 15 - Prompts 13-15 and Conclusion
17 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 32 0 R
/Resources <<
/Font <<
/F1 23 0 R
/F2 24 0 R
>>
>>
>>
endobj

% Cover Page Content
18 0 obj
<<
/Length 400
>>
stream
BT
/F1 28 Tf
100 700 Td
(Ventaro AI) Tj
0 -50 Td
/F1 36 Tf
(AI Prompts That) Tj
0 -50 Td
(Make You Money) Tj
0 -100 Td
/F2 16 Tf
(15 Profitable AI Prompts for Entrepreneurs,) Tj
0 -30 Td
(Freelancers, and Business Owners) Tj
0 -200 Td
/F2 12 Tf
(By Ventaro Sales Team) Tj
ET
endstream
endobj

% Introduction Content
19 0 obj
<<
/Length 800
>>
stream
BT
/F1 24 Tf
50 750 Td
(Introduction) Tj
0 -50 Td
/F2 12 Tf
(Welcome to "AI Prompts That Make You Money" - your guide to leveraging) Tj
0 -20 Td
(artificial intelligence to generate income in today's digital economy.) Tj
0 -40 Td
(In this concise guide, you'll discover 15 powerful AI prompts designed to:) Tj
0 -40 Td
/F2 12 Tf
(- Save you hours of work through automation) Tj
0 -20 Td
(- Create high-quality content that converts) Tj
0 -20 Td
(- Generate creative ideas that stand out in the market) Tj
0 -20 Td
(- Scale your business operations efficiently) Tj
0 -40 Td
(Each prompt in this guide has been carefully crafted and tested to produce) Tj
0 -20 Td
(results that can be monetized. Whether you're a freelancer looking to streamline) Tj
0 -20 Td
(your services, an entrepreneur building a business, or a creator seeking new) Tj
0 -20 Td
(revenue streams, these prompts will help you leverage AI to increase your income.) Tj
0 -40 Td
(Let's dive in and explore these money-making AI prompts!) Tj
ET
endstream
endobj

% Prompt 1: E-commerce Product Description Generator
20 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 1: E-commerce Product Description Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $50-$150 per description) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Act as an e-commerce copywriter specializing in [industry]. Write a compelling) Tj
0 -20 Td
(product description for [product name] that includes:) Tj
0 -20 Td
(1. An attention-grabbing headline) Tj
0 -20 Td
(2. 3-5 bullet points highlighting key benefits (not just features)) Tj
0 -20 Td
(3. A persuasive 150-word description using sensory language) Tj
0 -20 Td
(4. A clear call-to-action) Tj
0 -20 Td
(5. SEO keywords: [include 3-5 relevant keywords]) Tj
0 -20 Td
(Target audience is [customer demographic]. The tone should be [professional/casual/luxury]) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Offer product description writing services on Fiverr, Upwork or directly to e-commerce stores) Tj
0 -20 Td
(2. Create packages: Basic (1 description), Standard (5 descriptions), Premium (10+ descriptions)) Tj
0 -20 Td
(3. Upsell by offering A/B testing versions to determine which converts better) Tj
0 -20 Td
(4. Partner with e-commerce platforms to become their recommended description writer) Tj
ET
endstream
endobj

% Prompt 2: Social Media Content Calendar Creator
21 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 2: Social Media Content Calendar Creator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $200-$500 per month per client) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Create a 30-day social media content calendar for a [type of business] focusing on) Tj
0 -20 Td
([product/service/theme]. For each day, provide:) Tj
0 -20 Td
(1. Content type (image, carousel, video, story, reel, etc.)) Tj
0 -20 Td
(2. Primary topic and angle) Tj
0 -20 Td
(3. Engaging caption (under 150 characters) with relevant hashtags) Tj
0 -20 Td
(4. Call-to-action) Tj
0 -20 Td
(5. Best time to post) Tj
0 -20 Td
(Include a mix of promotional (20%), educational (40%), and entertaining (40%) content.) Tj
0 -20 Td
(Target audience is [demographic details]. Brand voice is [brand voice characteristics].) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Offer monthly social media management packages to small businesses) Tj
0 -20 Td
(2. Create and sell industry-specific content calendar templates) Tj
0 -20 Td
(3. Provide content calendar creation as part of a broader marketing consultation) Tj
0 -20 Td
(4. Teach workshops on how businesses can create their own content calendars) Tj
ET
endstream
endobj

% Prompt 3: SEO Blog Post Outline Generator
22 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 3: SEO Blog Post Outline Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $75-$200 per outline/post) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Create a comprehensive SEO-optimized blog post outline for the keyword "[target keyword]".) Tj
0 -20 Td
(The post should be aimed at [target audience] and should help them [desired outcome].) Tj
0 -20 Td
(Include:) Tj
0 -20 Td
(1. An engaging H1 title that includes the target keyword) Tj
0 -20 Td
(2. 5 potential meta descriptions (150 characters max)) Tj
0 -20 Td
(3. Introduction outline with hook and thesis) Tj
0 -20 Td
(4. 5-7 H2 subheadings that address search intent) Tj
0 -20 Td
(5. 2-3 H3 points under each H2) Tj
0 -20 Td
(6. Conclusion outline with key takeaways) Tj
0 -20 Td
(7. 3 FAQs related to the keyword) Tj
0 -20 Td
(8. 10 related long-tail keywords to incorporate) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell blog outlines to content marketers and businesses) Tj
0 -20 Td
(2. Expand service to write the full blog posts based on outlines) Tj
0 -20 Td
(3. Create industry-specific blog bundles (e.g., 10 finance blog outlines)) Tj
0 -20 Td
(4. Offer monthly subscription for regular blog content planning) Tj
ET
endstream
endobj

% Prompt 4: Email Marketing Sequence Generator
23 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 4: Email Marketing Sequence Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $300-$1,000 per sequence) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Create a 5-email sales sequence for [product/service] priced at [price point].) Tj
0 -20 Td
(The target audience is [ideal customer profile]. The sequence should include:) Tj
0 -20 Td
(Email 1: Introduction and problem identification) Tj
0 -20 Td
(Email 2: Solution presentation with social proof) Tj
0 -20 Td
(Email 3: Overcome objection: [main customer objection]) Tj
0 -20 Td
(Email 4: Case study or success story) Tj
0 -20 Td
(Email 5: Final offer with scarcity element) Tj
0 -20 Td
(For each email, provide:) Tj
0 -20 Td
(1. Subject line (A/B test versions)) Tj
0 -20 Td
(2. Preview text) Tj
0 -20 Td
(3. Body copy (300-500 words)) Tj
0 -20 Td
(4. Call-to-action) Tj
0 -20 Td
(5. Recommended send time and trigger) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell email sequence packages to businesses launching products) Tj
0 -20 Td
(2. Offer implementation services in email platforms like Mailchimp or ConvertKit) Tj
0 -20 Td
(3. Create industry-specific email sequence templates for sale) Tj
0 -20 Td
(4. Provide A/B testing and optimization services for existing sequences) Tj
ET
endstream
endobj

% Prompt 5: Video Script Generator
24 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 5: Video Script Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $150-$500 per script) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Write a [length: 2-5 minute] video script for [platform: YouTube/TikTok/Instagram]) Tj
0 -20 Td
(about [topic]. The video should target [audience] and have the goal of [objective:) Tj
0 -20 Td
(educate/entertain/sell]. Format the script with:) Tj
0 -20 Td
(1. Hook (first 15 seconds to grab attention)) Tj
0 -20 Td
(2. Introduction (who you are and what the video covers)) Tj
0 -20 Td
(3. Main content sections with timestamps) Tj
0 -20 Td
(4. B-roll suggestions and visual cues in [brackets]) Tj
0 -20 Td
(5. Call-to-action) Tj
0 -20 Td
(6. End screen suggestions) Tj
0 -20 Td
(The tone should be [casual/professional/entertaining] and include these keywords: [keywords].) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell video scripts to content creators, influencers, and businesses) Tj
0 -20 Td
(2. Offer packages for different video types (explainer, product review, tutorial)) Tj
0 -20 Td
(3. Provide script-to-screen services by partnering with video editors) Tj
0 -20 Td
(4. Create and sell script templates for different niches and platforms) Tj
ET
endstream
endobj

% Prompt 6: Freelance Proposal Template Generator
25 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 6: Freelance Proposal Template Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $100-$300 per template or $1,000+ per won contract) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Create a winning freelance proposal template for a [service type] professional) Tj
0 -20 Td
(responding to a client looking for [specific service]. The proposal should include:) Tj
0 -20 Td
(1. Compelling introduction that demonstrates understanding of the client's needs) Tj
0 -20 Td
(2. Your unique value proposition and relevant experience) Tj
0 -20 Td
(3. Proposed solution with methodology and deliverables) Tj
0 -20 Td
(4. Timeline with milestones) Tj
0 -20 Td
(5. Pricing structure with options (basic, standard, premium)) Tj
0 -20 Td
(6. Social proof section (testimonials, case studies, results)) Tj
0 -20 Td
(7. Clear next steps and call-to-action) Tj
0 -20 Td
(8. FAQ section addressing common client concerns) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell proposal templates to freelancers in various industries) Tj
0 -20 Td
(2. Offer proposal review and customization services) Tj
0 -20 Td
(3. Create a course teaching freelancers how to win more clients with effective proposals) Tj
0 -20 Td
(4. Use the template yourself to win high-value freelance contracts) Tj
ET
endstream
endobj

% Prompt 7: AI Chatbot Personality Creator
26 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 7: AI Chatbot Personality Creator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $500-$2,000 per chatbot personality) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Design a comprehensive AI chatbot personality for a [industry type] business that) Tj
0 -20 Td
(sells [products/services]. The chatbot should be named [name] and have these characteristics:) Tj
0 -20 Td
(1. Personality traits: [3-5 traits that align with brand]) Tj
0 -20 Td
(2. Voice and tone: [formal/casual/friendly/professional]) Tj
0 -20 Td
(3. Background story: [brief backstory that humanizes the bot]) Tj
0 -20 Td
(4. Knowledge areas: [specific topics the bot should be expert in]) Tj
0 -20 Td
(5. Response style: [concise/detailed/humorous/serious]) Tj
0 -20 Td
(6. 10 example responses to common customer questions) Tj
0 -20 Td
(7. 5 conversation starters the bot can use) Tj
0 -20 Td
(8. Escalation protocol for when to transfer to human support) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell chatbot personality development services to businesses) Tj
0 -20 Td
(2. Create industry-specific chatbot templates for different business types) Tj
0 -20 Td
(3. Offer implementation services on platforms like Dialogflow, ManyChat, or Chatfuel) Tj
0 -20 Td
(4. Provide ongoing optimization and training services for existing chatbots) Tj
ET
endstream
endobj

% Prompt 8: Digital Product Outline Creator
27 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 8: Digital Product Outline Creator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $200-$2,000 per outline) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Create a detailed outline for a [digital product type] about [topic] that solves [problem]) Tj
0 -20 Td
(for [target audience]. Include modules, lessons, exercises, and monetization strategy.) Tj
0 -20 Td
(Structure with: 1. Learning objectives 2. Key concepts 3. Practical exercises) Tj
0 -20 Td
(4. Time estimates 5. Bonus materials 6. Implementation steps) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell outlines to course creators and educators) Tj
0 -20 Td
(2. Create and sell your own digital products using the outlines) Tj
0 -20 Td
(3. Offer outline creation as a freelance service) Tj
0 -20 Td
(4. License outlines to training companies) Tj
ET
endstream
endobj

% Prompt 9: Automated Webinar Script Generator
28 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 9: Automated Webinar Script Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $500-$5,000 per script) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Write a script for a 60-minute automated webinar that sells [product/service] priced at) Tj
0 -20 Td
([price point]. Include introduction, teaching segments, testimonials, offer, and Q&A.) Tj
0 -20 Td
(Structure: Hook, Problem, Solution, Social Proof, Offer, Urgency, CTA) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell scripts to online marketers and coaches) Tj
0 -20 Td
(2. Create webinars for your own products) Tj
0 -20 Td
(3. Offer webinar script writing as a premium service) Tj
0 -20 Td
(4. Build complete webinar funnels for clients) Tj
ET
endstream
endobj

% Prompt 10: Niche Selection Advisor
29 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 10: Niche Selection Advisor) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: Save $1,000s + earn $10,000s) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Analyze these 5 potential business niches: [list niches]. For each, provide market size,) Tj
0 -20 Td
(competition level, monetization methods, startup costs, and growth potential. Recommend the best option.) Tj
0 -20 Td
(Include profit margins, customer acquisition costs, and scalability factors.) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Save thousands by choosing profitable niches from the start) Tj
0 -20 Td
(2. Offer niche research services to entrepreneurs) Tj
0 -20 Td
(3. Create niche-specific business starter packages) Tj
0 -20 Td
(4. Build businesses in the most profitable niches identified) Tj
ET
endstream
endobj

% Prompt 11: Sales Funnel Blueprint Generator
30 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 11: Sales Funnel Blueprint Generator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $1,000-$10,000+ per funnel) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Create a complete sales funnel blueprint for [product/service] targeting [audience].) Tj
0 -20 Td
(Include: Landing page structure, email sequence, upsells, downsells, and metrics.) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Build and sell complete funnels to businesses) Tj
0 -20 Td
(2. Offer funnel optimization consulting) Tj
0 -20 Td
(3. Create funnel templates for specific industries) Tj
ET
endstream
endobj

% Prompt 12: Course Curriculum Creator
31 0 obj
<<
/Length 900
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompt 12: Course Curriculum Creator) Tj
0 -50 Td
/F2 14 Tf
(Monetization Potential: $500-$5,000+ per curriculum) Tj
0 -40 Td
/F1 16 Tf
(The Prompt:) Tj
0 -30 Td
/F2 12 Tf
(Design a comprehensive course curriculum for [topic] targeting [skill level].) Tj
0 -20 Td
(Include modules, lessons, assessments, projects, and certification requirements.) Tj
0 -40 Td
/F1 16 Tf
(How to Monetize:) Tj
0 -30 Td
/F2 12 Tf
(1. Sell curriculums to educational institutions) Tj
0 -20 Td
(2. Create and sell your own online courses) Tj
0 -20 Td
(3. License content to training companies) Tj
ET
endstream
endobj

% Prompts 13-15 and Conclusion
32 0 obj
<<
/Length 1200
>>
stream
BT
/F1 24 Tf
50 750 Td
(Prompts 11-15 & Conclusion) Tj
0 -40 Td
/F1 18 Tf
(Prompt 11: Sales Funnel Blueprint Generator) Tj
0 -30 Td
/F2 12 Tf
(Create complete sales funnel blueprints with landing pages, email sequences, and upsells.) Tj
0 -20 Td
(Monetization: $1000-$10,000+ per funnel implementation) Tj
0 -30 Td
/F1 18 Tf
(Prompt 12: Course Curriculum Creator) Tj
0 -30 Td
/F2 12 Tf
(Design comprehensive course curriculums with modules, assessments, and certification paths.) Tj
0 -20 Td
(Monetization: $500-$5,000 per curriculum + ongoing course sales) Tj
0 -30 Td
/F1 18 Tf
(Prompts 13-15: Bonus Money-Making Prompts) Tj
0 -30 Td
/F2 12 Tf
(13. Lead Magnet Creator - Generate valuable free resources that capture leads) Tj
0 -20 Td
(14. Pricing Strategy Optimizer - Develop profitable pricing models for any business) Tj
0 -20 Td
(15. Partnership Proposal Generator - Create win-win partnership opportunities) Tj
0 -40 Td
/F1 20 Tf
(Conclusion) Tj
0 -30 Td
/F2 12 Tf
(Congratulations! You now have 15 powerful AI prompts that can generate real income.) Tj
0 -20 Td
(Remember these key principles for success:) Tj
0 -20 Td
(1. Customize each prompt for your specific industry and audience) Tj
0 -20 Td
(2. Test and refine your prompts to improve results) Tj
0 -20 Td
(3. Focus on delivering genuine value, not just generating content) Tj
0 -20 Td
(4. Build systems to scale your AI-powered services) Tj
0 -30 Td
(The most successful entrepreneurs don't just use these prompts—they build businesses) Tj
0 -20 Td
(around them. Start with one prompt that aligns with your skills and market demand,) Tj
0 -20 Td
(then expand as you gain traction.) Tj
0 -30 Td
(Thank you for investing in "AI Prompts That Make You Money"!) Tj
ET
endstream
endobj

% Font definitions
23 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

24 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 33
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000211 00000 n 
0000000380 00000 n 
0000000549 00000 n 
0000000731 00000 n 
0000000913 00000 n 
0000001089 00000 n 
0000001267 00000 n 
0000001437 00000 n 
0000001618 00000 n 
0000001794 00000 n 
0000001970 00000 n 
0000002423 00000 n 
0000003276 00000 n 
0000004229 00000 n 
0000005182 00000 n 
0000006135 00000 n 
0000007088 00000 n 
0000008041 00000 n 
0000008994 00000 n 
0000009947 00000 n 
0000010900 00000 n 
0000011853 00000 n 
0000012806 00000 n 
0000013759 00000 n 
0000014712 00000 n 
0000015665 00000 n 
0000016618 00000 n 
0000017571 00000 n 
0000018524 00000 n 
0000019477 00000 n 
trailer
<<
/Size 33
/Root 1 0 R
>>
startxref
11386
%%EOF`
  
  return Buffer.from(content, 'utf-8')
}