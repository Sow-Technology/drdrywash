
'use client';

import {
  Shirt,
  Sparkles,
  Wind,
  Star,
  Gem,
  ShoppingCart,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Shirt,
    title: 'Wash & Fold',
    description: 'Affordable laundry service. Delivery Time: 72 Hours',
    imageId: 'wash-fold',
  },
  {
    icon: Sparkles,
    title: 'Wash & Iron',
    description: 'Preferred for regular and formals. Delivery Time: 72 Hours',
    imageId: 'ironing',
  },
  {
    icon: Gem,
    title: 'Premium Laundry',
    description: 'Tailored specifically for formals & premium wear.',
    imageId: 'product-blanket',
  },
  {
    icon: Wind,
    title: 'Dry Clean',
    description:
      'Wedding Dresses, Lehengas, Sarees, Jackets, Blazers & more.',
    imageId: 'dry-cleaning',
  },
  {
    icon: Star,
    title: 'Steam Press',
    description: 'Removes wrinkles completely.',
    imageId: 'product-shirt',
  },
  {
    icon: Gem,
    title: 'Premium Dry clean',
    description: 'Exclusive care for premium garments.',
    imageId: 'bedding',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
  </svg>
);

export default function ServiceList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveIndex = -1;
      let smallestDistance = Infinity;

      serviceRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const distance = Math.abs(rect.top - window.innerHeight / 2);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            currentActiveIndex = index;
          }
        }
      });

      if (currentActiveIndex !== -1) {
        setActiveIndex(currentActiveIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active index

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeImage = PlaceHolderImages.find(img => img.id === services[activeIndex]?.imageId);

  return (
    <motion.section
      id="services"
      className="py-16 md:py-20 bg-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Say Goodbye to Odours & Dirty Clothes!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No more traditional dhobi ghats or manual labour—just Hi-Tech,
            state-of-the-art smart machines ensuring your garments are cleaned
            with the utmost precision and care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-8">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={service.title}
                  ref={el => serviceRefs.current[index] = el}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <Card 
                    className={cn(
                        "overflow-hidden group h-full bg-card shadow-sm transition-all duration-300 text-left flex flex-col p-6 border-2",
                        isActive ? "border-primary shadow-2xl" : "border-transparent"
                    )}
                  >
                    <div className="flex items-start gap-6">
                      <div
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 transition-colors",
                           isActive && "bg-primary text-primary-foreground"
                        )}
                      >
                          <service.icon className={cn("h-8 w-8 text-primary transition-colors", isActive && "text-primary-foreground")} />
                      </div>
                      <CardContent className="flex flex-col flex-grow p-0">
                        <CardTitle className="font-headline text-2xl">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="mt-2 flex-grow text-base">
                          {service.description}
                        </CardDescription>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="sticky top-24 hidden md:block">
            <div className="relative w-full aspect-square rounded-2xl shadow-2xl overflow-hidden border-4 border-primary/20">
                <AnimatePresence>
                    {activeImage && (
                        <motion.div
                            key={activeImage.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={activeImage.imageUrl}
                                alt={activeImage.description}
                                data-ai-hint={activeImage.imageHint}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        <motion.div className="mt-16" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/schedule-pickup">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Schedule Free Pickup
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto !bg-green-500 hover:!bg-green-600 !text-white"
              asChild
            >
              <Link href="https://wa.me/919738045714" target="_blank">
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
