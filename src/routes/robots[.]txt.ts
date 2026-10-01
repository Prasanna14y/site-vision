import { createFileRoute } from '@tanstack/react-router'
import { BUSINESS } from '../lib/business'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const origin = BUSINESS.siteUrl // real domain, also correct in the static build
        const body = [
          'User-agent: *',
          'Allow: /',
          '',
          `Sitemap: ${origin}/sitemap.xml`,
        ].join('\n')
        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
          },
        })
      },
    },
  },
})
