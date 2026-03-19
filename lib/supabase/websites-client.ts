import { createClient } from '@supabase/supabase-js'

const WEBSITES_URL = process.env.WEBSITES_SUPABASE_URL!
const WEBSITES_KEY = process.env.WEBSITES_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role for server-side reads from Websites DB
export function createWebsitesClient() {
  return createClient(WEBSITES_URL, process.env.WEBSITES_SUPABASE_SERVICE_KEY || WEBSITES_KEY)
}

export const ROCKETSALES_SITE_SLUG = process.env.WEBSITES_ROCKETSALES_SITE_SLUG || 'rocketsales'
