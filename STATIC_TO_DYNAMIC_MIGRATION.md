# Static to Dynamic Page Migration Summary

## Date: March 19, 2026

## What Was Done: /about Page Conversion

### Overview
Converted the /about page from a fully static/hardcoded Next.js page to a dynamic page that fetches content from the Supabase `pages` table.

### Steps Taken

1. **Inserted about page content into Supabase `pages` table**
   - Slug: `about`
   - Content stored as JSONB with 5 sections: `hero`, `story`, `values`, `location`, `cta`
   - Hero: badge, heading, subheading
   - Story: heading, paragraphs[], founder_name, founder_quote, founder_title
   - Values: heading, subheading, items[{title, desc}]
   - Location: heading, description, address, phone, email
   - CTA: heading, description, button_text, button_url

2. **Added `getPageData(slug)` function to `lib/supabase/fetch-site-data.ts`**
   - Takes a slug string parameter
   - Fetches page from `pages` table by site_id + slug + is_published
   - Also fetches FAQs linked to that page via page_id
   - Returns { page, faqs }

3. **Rewrote `app/(site)/about/page.tsx`**
   - Changed from static `export default function` to `export default async function`
   - Imports `getPageData` from `@/lib/supabase/fetch-site-data`
   - Calls `await getPageData('about')` to fetch content
   - Destructures content JSON into section variables (hero, story, values, location, cta)
   - All text rendered from DB with fallback defaults
   - Added `export const revalidate = 3600` for ISR (hourly revalidation)
   - Added `notFound()` guard if page doesn't exist

4. **Built and deployed** - `npm run build` + `pm2 restart all`

### Pattern for Converting Other Pages
1. Read the current static page to understand its sections and text
2. Insert page content into Supabase `pages` table with structured JSONB content
3. Insert any page-specific FAQs into `faqs` table with the page_id
4. Rewrite the page.tsx to: import getPageData, call it with the slug, destructure content, render with fallbacks
5. Build and restart

### Database Schema Reference
- **pages table**: id, site_id, title, slug, content (jsonb), meta_title, meta_description, schema_markup (jsonb), is_published, sort_order, created_at, updated_at
- **faqs table**: id, site_id, page_id, question, answer, sort_order, is_active
- **Site ID**: acd6a186-4334-4534-b1ab-2ee6a485ba07

### Files Modified
- `lib/supabase/fetch-site-data.ts` - Added getPageData() function
- `app/(site)/about/page.tsx` - Rewritten to fetch from Supabase

### Pages Still Needing Conversion
- /pricing (data already in Supabase, page needs rewrite)
- /contact
- /locations
- /services (main + 4 sub-pages)
- /industries (main + 4 sub-pages)
- /blog and /blog/[slug] (currently using WordPress API)

---

## Batch 2: /pricing, /locations, /contact Conversion (March 19, 2026)

### /pricing Page
- Data was already in Supabase from earlier work
- Content structure: hero (badge, heading, subheading), plans[] (name, price, period, desc, features[], cta, highlight), custom (heading, description, button_text, button_url), faq_heading
- FAQs already linked via page_id in faqs table
- Rewrote page to fetch via getPageData('pricing'), render plans grid, custom section, and FAQs from DB

### /locations Page
- Inserted new page data into Supabase pages table
- Content structure: hero (badge, heading, subheading), hq (heading, description, phone, email), markets (heading, subheading, cities[] with city/state/desc, fallback_text), why_local (heading, items[] with title/desc), cta (heading, description, button_text, button_url)
- Rewrote page to fetch via getPageData('locations'), render all sections dynamically

### /contact Page
- Inserted new page data into Supabase pages table
- Content structure: hero (badge, heading, description), benefits[] (icon, title, desc), phone (label, number, display), form_heading
- Kept ContactForm component import (client-side form component unchanged)
- Rewrote page to fetch via getPageData('contact'), render hero/benefits/phone from DB, ContactForm stays as-is

### Files Modified
- app/(site)/pricing/page.tsx - Rewritten to fetch from Supabase
- app/(site)/locations/page.tsx - Rewritten to fetch from Supabase
- app/(site)/contact/page.tsx - Rewritten to fetch from Supabase

### Pages Still Needing Conversion
- /services (main + 4 sub-pages: ai-visibility, geo-optimization, aeo-optimization, seo-authority)
- /industries (main + 4 sub-pages: financial-services, legal, healthcare, home-services)
- /blog and /blog/[slug] (currently using WordPress API)
