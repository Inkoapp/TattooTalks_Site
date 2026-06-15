import PrivacyClient from './_components/privacy-client';
import { PublicLayoutWithSidebar } from '@/components/layout/public-layout-with-sidebar';

export default function PrivacyPage() {
  return (
    <PublicLayoutWithSidebar>
      <div className="max-w-4xl mx-auto">
        <PrivacyClient />
      </div>
    </PublicLayoutWithSidebar>
  );
}
