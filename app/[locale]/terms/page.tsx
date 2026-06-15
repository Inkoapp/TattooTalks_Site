import TermsClient from './_components/terms-client'
import { PublicLayoutWithSidebar } from '@/components/layout/public-layout-with-sidebar'

export default function TermsPage() {
  return (
    <PublicLayoutWithSidebar>
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-8 lg:px-8">
        <TermsClient />
      </div>
    </PublicLayoutWithSidebar>
  )
}
