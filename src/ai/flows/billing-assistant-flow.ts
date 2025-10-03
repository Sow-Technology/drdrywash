'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  PanelLeft,
  PlusCircle,
  User,
  Building,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';

const navLinks = [
  { href: '/billing/dashboard', label: 'Dashboard', icon: Home },
  { href: '/billing/orders', label: 'Orders', icon: ShoppingCart, badge: '6' },
  { href: '/billing/user', label: 'User', icon: User },
  { href: '/billing/branch', label: 'Branch', icon: Building },
];

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
           <div className="p-2 flex justify-center">
            <Logo />
          </div>
           {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {
                    "text-primary bg-muted": pathname.startsWith(link.href)
                })}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
                {link.badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <div className="p-2 flex justify-center">
                    <Logo />
                </div>
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={cn("flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground", {
                            "text-foreground": pathname.startsWith(link.href)
                        })}
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
           <div className="ml-auto flex items-center gap-2">
             <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/billing/add-bill">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Bill
                    </span>
                </Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </div>
    </div>
  );
}