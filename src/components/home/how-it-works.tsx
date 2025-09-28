'use client';

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { howItWorksOnline } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

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

export default function HowItWorks() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const totalSteps = howItWorksOnline.length;
  const stepProgress = 1 / totalSteps;

  const opacities = howItWorksOnline.map((_, index) => {
    const start = index * stepProgress;
    const end = start + stepProgress;
    return useTransform(
      scrollYProgress,
      [start, start + stepProgress * 0.4, end - stepProgress * 0.4, end],
      [0, 1, 1, 0]
    );
  });

  const scales = howItWorksOnline.map((_, index) => {
    const start = index * stepProgress;
    const end = start + stepProgress;
    return useTransform(
      scrollYProgress,
      [start, start + stepProgress * 0.4, end - stepProgress * 0.4, end],
      [0.8, 1, 1, 0.8]
    );
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = Math.floor(latest * totalSteps);
    if (newIndex >= 0 && newIndex < totalSteps) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 p-8 z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
              A Seamless Laundry Experience
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              At Dr. Dry Wash, quality meets convenience. We pick up, treat each item with expert care, and deliver everything back to your doorstep.
            </p>
          </div>
          <div className="w-full max-w-3xl mx-auto mt-8">
            <motion.div
              className="h-1 bg-primary rounded-full"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>

        <div className="container relative flex items-center justify-center mt-24">
          {howItWorksOnline.map((step, index) => (
            <motion.div
              key={step.title}
              style={{
                opacity: opacities[index],
                scale: scales[index],
              }}
              className="absolute grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-4xl"
            >
              <div className="text-center md:text-left">
                <p className="text-primary font-semibold">Step {index + 1}</p>
                <h3 className="text-3xl font-bold font-headline mt-2">{step.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground">{step.description}</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-24 w-24 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="absolute bottom-12 z-10">
           <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]),
                y: useTransform(scrollYProgress, [0.95, 1], [20, 0]),
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
