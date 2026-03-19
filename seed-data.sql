-- Site ID for RocketSales
-- acd6a186-4334-4534-b1ab-2ee6a485ba07

-- Seed FAQs
INSERT INTO faqs (site_id, question, answer, sort_order, is_active) VALUES
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'What is Generative Engine Optimization (GEO)?', 'GEO optimizes your content so AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews understand, trust, and recommend your business.', 1, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'How does AI Visibility differ from traditional SEO?', 'Traditional SEO targets Google rankings. AI Visibility ensures your brand appears in responses from ChatGPT, Perplexity, Google AI Overviews, and other large language models.', 2, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'What is Answer Engine Optimization (AEO)?', 'AEO optimizes your content to be selected as the direct answer in AI-generated responses, featured snippets, and voice search results.', 3, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'How quickly can I see results?', 'Most clients see measurable AIRank score improvements within 30 days. AI citation improvements typically appear within 60-90 days.', 4, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Do you serve businesses outside of Texas?', 'Yes. RocketSales is a nationwide consulting firm headquartered in Richardson, TX. We serve clients across all 50 states with fully remote delivery.', 5, true);

-- Seed Services
INSERT INTO services (site_id, title, slug, description, short_description, icon, features, sort_order, is_active) VALUES
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'AI Visibility & Citations', 'ai-visibility', 'Get your brand referenced and recommended by AI tools like ChatGPT, Perplexity, and Google''s AI Overviews.', 'Get your brand referenced and recommended by AI tools like ChatGPT, Perplexity, and Google''s AI Overviews.', 'visibility', ARRAY['Brand monitoring across AI platforms', 'Citation building', 'AI recommendation optimization', 'Platform-specific strategies'], 1, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Generative Engine Optimization (GEO)', 'geo-optimization', 'Structure your content so AI engines understand, trust, and surface your expertise to the right audiences.', 'Structure your content so AI engines understand, trust, and surface your expertise to the right audiences.', 'geo', ARRAY['Content structuring for AI', 'Schema markup optimization', 'E-E-A-T signal building', 'AI-friendly content formats'], 2, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'SEO Ranking & Authority', 'seo-authority', 'Build the technical foundation and content signals that drive consistent organic search rankings.', 'Build the technical foundation and content signals that drive consistent organic search rankings.', 'seo', ARRAY['Technical SEO audit', 'Content optimization', 'Backlink strategy', 'Local SEO setup'], 3, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Ongoing Monitoring & Reporting', 'monitoring', 'Track how AI tools and search engines reference your brand with clear, actionable reporting.', 'Track how AI tools and search engines reference your brand with clear, actionable reporting.', 'monitoring', ARRAY['AIRank score tracking', 'Monthly reports', 'Competitor analysis', 'Continuous optimization'], 4, true);

-- Seed Pricing Tiers
INSERT INTO pricing_tiers (site_id, name, slug, description, features, sort_order, is_active, price_monthly, cta_text, cta_url, is_featured) VALUES
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Essential', 'essential', 'Perfect for small businesses that need AI visibility without a full-time team.', ARRAY['AI Visibility Audit', 'GEO Content Optimization', 'Local SEO Setup', 'Monthly Reporting'], 1, true, NULL, 'Get Started', '/pricing', false),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Growth', 'growth', 'Businesses ready to increase traffic and qualified leads with AI-driven strategies.', ARRAY['Everything in Essential', 'AEO Schema Setup', 'Citation Building', 'Bi-weekly Strategy Calls'], 2, true, NULL, 'Get Started', '/pricing', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Scale', 'scale', 'Multi-location businesses that need dominant AI visibility across all markets.', ARRAY['Everything in Growth', 'Multi-location GEO', 'Content Engine', 'Dedicated Strategist'], 3, true, NULL, 'Get Started', '/pricing', false),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Custom', 'custom', 'Businesses with unique workflows, large-scale operations, or advanced team requirements.', ARRAY['Custom Strategy', 'White-label Options', 'API Integrations', 'Enterprise SLAs'], 4, true, NULL, 'Contact Us', '/contact', false);

-- Seed Testimonials
INSERT INTO testimonials (site_id, client_name, client_title, quote, category, is_featured, sort_order, is_active) VALUES
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Automated Appointments Client', NULL, 'RocketSales transformed our appointment process. Their AI visibility system connected our GoHighLevel CRM so we now book both inbound and outbound appointments without our team spending hours on follow-ups.', 'Automated Appointments', true, 1, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Medical Practice Director, Plano TX', NULL, 'RocketSales implemented a 24/7 receptionist system for our medical practice that answers incoming calls, greets patients, sends appointment reminders, and transfers callers to the right department.', 'Medical Receptionist', true, 2, true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Sales Operations Manager', NULL, 'RocketSales deployed an outbound call team system using 20 agents to proactively reach prospects. They ran consistent outreach from 8 AM to 8 PM, keeping our sales pipeline full.', 'Outbound Call Room', true, 3, true);

-- Update navigation to match static site
DELETE FROM navigation WHERE site_id = 'acd6a186-4334-4534-b1ab-2ee6a485ba07';
INSERT INTO navigation (site_id, label, url, sort_order, location, is_active) VALUES
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Services', '/services', 1, 'header', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Industries', '/industries', 2, 'header', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Pricing', '/pricing', 3, 'header', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'About', '/about', 4, 'header', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Current News', '/blog', 5, 'header', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'AI Visibility', '/services', 1, 'footer_services', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'GEO Optimization', '/services', 2, 'footer_services', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'SEO & Authority', '/services', 3, 'footer_services', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'AEO', '/services', 4, 'footer_services', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'About', '/about', 1, 'footer_company', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Current News', '/blog', 2, 'footer_company', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Pricing', '/pricing', 3, 'footer_company', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Contact', '/contact', 4, 'footer_company', true),
('acd6a186-4334-4534-b1ab-2ee6a485ba07', 'Client Portal', '/portal/agency/login', 5, 'footer_company', true);
