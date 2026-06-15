

import { I18nProvider } from '@/lib/i18n-context'
import { AdminProviders } from '@/components/admin-providers'
import { Toaster } from 'react-hot-toast'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Load French messages as default for admin
  const locale = 'fr'
  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <I18nProvider locale={locale} messages={messages}>
      <AdminProviders>
        {children}
        <Toaster position="top-center" />
      </AdminProviders>
    </I18nProvider>
  )
}
