'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo, ThemeSwitcher } from '@/components/shared';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/schedule-pickup', label: 'Schedule a Pickup' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'text-sm font-medium transition-all hover:text-primary hover:-translate-y-px',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {label}
      </Link>
    );
  };
  
    const MobileNavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'text-lg font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-foreground'
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 ml-10">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex items-center gap-2">
            <Button asChild>
                <Link href="/track-order">
                    Track Order
                    <Search className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            <ThemeSwitcher />
          </div>
           <div className="flex items-center md:hidden">
             <ThemeSwitcher />
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-10">
                        {navLinks.map((link) => (
                            <MobileNavLink key={link.href} {...link} />
                        ))}
                         <MobileNavLink href="/track-order" label="Track Order" />
                    </nav>
                </SheetContent>
            </Sheet>
           </div>
        </div>
      </div>
    </header>
  );
}
