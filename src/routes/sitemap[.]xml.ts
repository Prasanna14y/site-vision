import { createFileRoute } from '@tanstack/react-router'
import { BUSINESS } from '../lib/business'
import { LOCATIONS } from '../lib/locations'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const origin = BUSINESS.siteUrl // real domain, also correct in the static build
        const today = new Date().toISOString().split('T')[0]
        const paths = [
          '/', '/services', '/products', '/solar-cam', '/industries/residential',
          '/industries/commercial', '/industries/construction', '/industries/farm',
          '/about', '/contact', '/quote', '/privacy',
          '/construction-site-camera-hire', '/locations',
          ...LOCATIONS.map((l) => `/locations/${l.slug}`),
        ]
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...paths.map((p) =>
            `  <url><loc>${origin}${p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : '0.7'}</priority></url>`,
          ),
          '</urlset>',
        ].join('\n')
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
