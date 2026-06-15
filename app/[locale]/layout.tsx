import { Providers } from '@/components/providers'
import { I18nProvider } from '@/lib/i18n-context';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export const dynamic = 'force-dynamic'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Valider que la locale existe
  if (!locales.includes(params.locale as any)) {
    notFound();
  }

  // Charger les messages directement depuis le fichier JSON
  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <I18nProvider locale={params.locale} messages={messages}>
      <Providers>
        {children}
      </Providers>
    </I18nProvider>
  )
}
