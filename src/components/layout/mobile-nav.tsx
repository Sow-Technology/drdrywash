
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Calendar, Phone, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/pricing', label: 'Pricing', icon: Tag },
  { href: '/schedule-pickup', label: 'Pickup', icon: Calendar },
  { href: '/track-order', label: 'Track', icon: Search },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden">
      <div className="relative flex h-16 items-center justify-around gap-2 rounded-full border bg-background/80 p-2 shadow-lg backdrop-blur-lg">
        {mobileNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full text-xs font-medium transition-colors hover:text-primary',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 z-0 rounded-full bg-foreground/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
               <motion.div
                className="relative z-10 flex flex-col items-center"
                animate={{ scale: isActive ? 1.15 : 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-[10px]">{link.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
