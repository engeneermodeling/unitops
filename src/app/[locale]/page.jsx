// app/[locale]/page.jsx
// БЕЗ 'use client' - це Server Component!

import { siteConfig, getCanonicalUrl, getHreflangLinks } from '../../lib/seo';
import HomePageContent from './HomePageContent'; // <-- новий файл

// SEO мета-теги
export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
    title: `${siteConfig.name} — Інженерні розрахунки онлайн`,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: getCanonicalUrl(locale, '/'),
      languages: getHreflangLinks(locale, '/'),
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      type: 'website',
      locale: locale,
      siteName: siteConfig.name,
    },
  };
}

// Головний компонент (просто рендерить клієнтську частину)
export default function Page() {
  return <HomePageContent />;
}