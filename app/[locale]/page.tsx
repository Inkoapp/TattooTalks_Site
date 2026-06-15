import { LandingPage } from './_components/landing-page';
import { PublicLayoutWithSidebar } from '@/components/layout/public-layout-with-sidebar';

export default function RootPage() {
  return (
    <PublicLayoutWithSidebar>
      <LandingPage />
    </PublicLayoutWithSidebar>
  );
}
