// app/sitemap.js
import { siteConfig } from '../lib/seo';

export default function sitemap() {
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/calculators/heat-exchanger', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/company', priority: 0.5, changeFrequency: 'monthly' },
  ];

  return pages.flatMap((page) =>
    siteConfig.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          siteConfig.locales.map((l) => [
            l,
            `${siteConfig.url}/${l}${page.path}`,
          ])
        ),
      },
    }))
  );
}