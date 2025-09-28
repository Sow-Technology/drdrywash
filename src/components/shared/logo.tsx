import { Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2', className)}
      aria-label="Back to homepage"
    >
      <Droplets className="h-8 w-8 text-primary flex-shrink-0" />
      <div>
        <span className="block text-xl sm:text-2xl font-bold font-headline text-foreground leading-tight">
          Dr. Dry Wash
        </span>
        <p className="block text-xs text-muted-foreground leading-tight">
          Pickup. Clean. Deliver.
        </p>
      </div>
    </Link>
  );
}
