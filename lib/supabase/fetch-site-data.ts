import { createWebsitesClient, ROCKETSALES_SITE_SLUG } from './websites-client'

const supabase = createWebsitesClient()

async function getSiteId() {
  const { data } = await supabase
    .from('sites')
    .select('id')
    .eq('slug', ROCKETSALES_SITE_SLUG)
    .single()
  return data?.id
}

export async function getSiteData() {
  const siteId = await getSiteId()
  if (!siteId) throw new Error('Site not found')

  const [
    { data: site },
    { data: faqs },
    { data: services },
    { data: pricingTiers },
    { data: testimonials },
    { data: navigation },
  ] = await Promise.all([
    supabase.from('sites').select('*').eq('id', siteId).single(),
    supabase.from('faqs').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('services').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('pricing_tiers').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
    supabase.from('navigation').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
  ])

  return {
    site,
    faqs: faqs || [],
    services: services || [],
    pricingTiers: pricingTiers || [],
    testimonials: testimonials || [],
    navigation: navigation || [],
    headerNav: (navigation || []).filter((n: any) => n.location === 'header'),
    footerNav: (navigation || []).filter((n: any) => n.location === 'footer'),
  }
}

export async function getPageData(slug: string) {
  const siteId = await getSiteId()
  if (!siteId) throw new Error('Site not found')

  const [
    { data: page },
    { data: pageFaqs },
  ] = await Promise.all([
    supabase.from('pages').select('*').eq('site_id', siteId).eq('slug', slug).eq('is_published', true).single(),
    supabase.from('faqs').select('*').eq('site_id', siteId).eq('is_active', true).order('sort_order'),
  ])

  // Filter FAQs to those linked to this page
  const faqs = (pageFaqs || []).filter((f: any) => f.page_id === page?.id)

  return {
    page,
    faqs,
  }
}
