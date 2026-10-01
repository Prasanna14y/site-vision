import { createFileRoute } from '@tanstack/react-router'
import { BUSINESS } from '../lib/business'

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
