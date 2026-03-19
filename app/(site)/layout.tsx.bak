import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://agent.getrocketsales.org'),
  title: { default: 'RocketSales Consulting | AI Visibility, GEO, SEO & AEO', template: '%s | RocketSales' },
  description: 'Nationwide AI consulting firm helping businesses dominate AI search, GEO, SEO, and AEO. Stand out with AI-fueled visibility.',
  keywords: ['AI visibility', 'GEO optimization', 'SEO', 'AEO', 'AI consulting', 'RocketSales', 'Richardson TX'],
  openGraph: { siteName: 'RocketSales Consulting', type: 'website' },
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/rocketsales-logo.png"
              alt="RocketSales Logo"
              width={200}
              height={46}
              priority
              className="h-10 w-auto"
            />
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Services</Link>
            <Link href="/industries" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Industries</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Pricing</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">About</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Current News</Link>
          </nav>
          {/* Right side */}
          <div className="flex items-center gap-4">
            <a href="tel:4697695855" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-purple-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              469-769-5855
            </a>
            <Link href="/contact" className="px-4 py-2 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90" style={{background:'linear-gradient(135deg,#592b77,#8b4b94)'}}>
              Free Strategy Call
            </Link>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        <nav className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-2 pb-4">
          <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-purple-700 py-1.5">Services</Link>
          <Link href="/industries" className="text-sm font-medium text-gray-700 hover:text-purple-700 py-1.5">Industries</Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-purple-700 py-1.5">Pricing</Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-purple-700 py-1.5">About</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-purple-700 py-1.5">Current News</Link>
          <a href="tel:4697695855" className="text-sm font-medium text-gray-700 hover:text-purple-700 py-1.5">469-769-5855</a>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <Image src="/rocketsales-logo.png" alt="RocketSales Logo" width={160} height={37} className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">AI-powered visibility for businesses ready to dominate search, GEO, and AI-driven discovery.</p>
            <p className="mt-4 text-sm">Richardson, TX &bull; Nationwide</p>
            <a href="tel:4697695855" className="mt-2 block text-sm hover:text-white transition-colors">469-769-5855</a>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">AI Visibility</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">GEO Optimization</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">SEO & Authority</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">AEO</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Current News</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/portal/agency/login" className="hover:text-white transition-colors">Client Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} RocketSales Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
