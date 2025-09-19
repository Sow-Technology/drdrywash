import { Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)} aria-label="Back to homepage">
      <Droplets className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
      <span className="text-xl sm:text-2xl font-bold font-headline text-foreground">
        Dr. Dry Wash
      </span>
    </Link>
  );
}
