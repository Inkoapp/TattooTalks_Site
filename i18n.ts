
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Liste des langues supportées
export const locales = ['fr', 'en', 'es', 'pt'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Valider que la locale entrante est supportée
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
