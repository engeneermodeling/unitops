// src/lib/seo.js

export const siteConfig = {
  name: "UnitOps",
  url: "https://unitops.vercel.app", // Зміниш на реальний домен
  description: "Інженерні калькулятори для розрахунку теплообмінників, насосів та колон",
  keywords: ["unitops", "теплообмінник", "розрахунок", "інженерія", "калькулятор", "хімічна технологія"],
  defaultLocale: "uk",
  locales: ["uk", "en", "de", "ru"],
};

export function getCanonicalUrl(locale, path) {
  const cleanPath = path && path !== '/' ? path : '';
  return `${siteConfig.url}/${locale}${cleanPath}`;
}

export function getHreflangLinks(locale, path) {
  const cleanPath = path && path !== '/' ? path : '';
  
  return siteConfig.locales.reduce((acc, l) => {
    acc[l] = `${siteConfig.url}/${l}${cleanPath}`;
    return acc;
  }, {});
}

