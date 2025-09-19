import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');
  
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
        <div className="container relative z-10">
            <div className="max-w-3xl text-center mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl text-primary">
                    Impeccable Laundry Service,
                </h1>
                <h2 className="mt-2 text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl text-foreground">
                    Delivered to Your Door.
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Tired of laundry day? Let Dr. Dry Wash handle it. We offer premium washing, dry cleaning, and ironing services with convenient pickup and delivery.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/order">
                            Schedule a Pickup
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/#services">
                            View Services
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
                style={{ opacity: 0.1, zIndex: 0 }}
                priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-5"></div>
    </section>
  );
}
