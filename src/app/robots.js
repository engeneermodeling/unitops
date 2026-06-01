// app/robots.js
import { siteConfig } from '../lib/seo';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}