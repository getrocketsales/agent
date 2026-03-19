import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { createWebsitesClient, ROCKETSALES_SITE_SLUG } from '@/lib/supabase/websites-client'

export const revalidate = 60

async function getSiteData() {
  const supabase = createWebsitesClient()
  const { data: site } = await supabase.from('sites').select('*').eq('slug', ROCKETSALES_SITE_SLUG).single()
  const siteId = site.id
  const [faqsRes, servicesRes, pricingRes, testimonialsRes] = await Promise.all([
    supabase.from('faqs').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('services').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('pricing_tiers').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
  ])
  return { site, faqs: faqsRes.data || [], services: servicesRes.data || [], pricingTiers: pricingRes.data || [], testimonials: testimonialsRes.data || [] }
}