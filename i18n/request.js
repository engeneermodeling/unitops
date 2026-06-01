import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Fallback на 'uk' якщо locale undefined
  const validLocale = locale && typeof locale === 'string' ? locale : 'uk';
  
  // Список валідних мов
  const supportedLocales = ['uk', 'en', 'de', 'ru'];
  const finalLocale = supportedLocales.includes(validLocale) ? validLocale : 'uk';

  try {
    const messages = (await import(`./messages/${finalLocale}.json`)).default;
    
    return {
      locale: finalLocale,
      messages
    };
  } catch (error) {
    console.error(`Failed to load messages for ${finalLocale}:`, error);
    // Fallback на українську
    const fallbackMessages = (await import('./messages/uk.json')).default;
    return {
      locale: 'uk',
      messages: fallbackMessages
    };
  }
});