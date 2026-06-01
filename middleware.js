import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['uk', 'en', 'de', 'ru'],
  defaultLocale: 'uk',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(uk|en|de|ru)/:path*']
};