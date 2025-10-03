'use client';

import { Header, Footer, MobileNav } from '@/components/layout';
import ChatbotFAB from '@/components/layout/chatbot-fab';

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
      <ChatbotFAB />
    </div>
  );
}
