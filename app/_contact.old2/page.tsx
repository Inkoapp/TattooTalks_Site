import { ContactClient } from './_components/contact-client';
import { PublicLayoutWithSidebar } from '@/components/layout/public-layout-with-sidebar';

export default function ContactPage() {
  return (
    <PublicLayoutWithSidebar>
      <div className="max-w-4xl mx-auto">
        <ContactClient />
      </div>
    </PublicLayoutWithSidebar>
  );
}
