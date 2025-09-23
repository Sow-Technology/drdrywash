'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
        <motion.div 
          className="container relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <div className="max-w-3xl text-center mx-auto">
                <motion.h1 
                    className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl text-primary"
                    variants={itemVariants}
                >
                    Impeccable Laundry Service,
                </motion.h1>
                <motion.h2 
                    className="mt-2 text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl text-foreground"
                    variants={itemVariants}
                >
                    Delivered to Your Door.
                </motion.h2>
                <motion.p 
                    className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
                    variants={itemVariants}
                >
                    Tired of laundry day? Let Dr. Dry Wash handle it. We offer premium washing, dry cleaning, and ironing services with convenient pickup and delivery.
                </motion.p>
                <motion.div className="mt-8 flex justify-center gap-4" variants={itemVariants}>
                    <Button size="lg" asChild>
                        <Link href="/schedule-pickup">
                            Schedule a Pickup
                            <ArrowRight />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/#services">
                            View Services
                        </Link>
                    </Button>
                </motion.div>
                <motion.div 
                    className="mt-8 text-sm text-muted-foreground"
                    variants={itemVariants}
                >
                    <p>Free pickup and delivery within a 2KM Radius.</p>
                </motion.div>
            </div>
        </motion.div>
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
