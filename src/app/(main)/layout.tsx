'use client';

import { Header, Footer, MobileNav } from '@/components/layout';
import BillingVoiceAssistant from '@/components/billing/voice-assistant';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-28 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
      <BillingVoiceAssistant />
    </div>
  );
}
