'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  MonitorSmartphone,
  Bike,
  Store,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedWashingMachine } from './animated-washing-machine';
import type { LucideIcon } from 'lucide-react';

const steps = [
  {
    icon: MonitorSmartphone,
    title: 'Order Online',
    description: 'Schedule your order easily through our website or mobile app.',
  },
  {
    icon: Bike,
    title: 'We Pick Up',
    description:
      'Our rider will collect your laundry right from your doorstep as per your schedule.',
  },
  {
    icon: AnimatedWashingMachine,
    title: 'We Clean',
    description:
      'Your clothes are expertly cleaned with premium products and state-of-the-art machines.',
  },
  {
    icon: Truck,
    title: 'We Deliver',
    description:
      'Receive your fresh, clean clothes delivered back to you, ready to wear.',
  },
];


export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const numSteps = steps.length;
      const newActiveIndex = Math.min(numSteps - 1, Math.floor(latest * numSteps));
      setActiveIndex(newActiveIndex);
    });
  }, [scrollYProgress]);

  return (
    <motion.section
      id="how-it-works"
      className="py-16 md:py-24 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
          A Seamless Laundry Experience
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          From your closet to ours and back again, with two convenient options.
        </p>
      </div>

      <div className="container mx-auto" ref={targetRef}>
        <div className="relative h-[400vh]">
          {/* Sticky Phone Mockup */}
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-72 h-[36rem] bg-slate-800 dark:bg-slate-900 rounded-[3rem] shadow-2xl border-4 border-slate-700">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 dark:bg-black rounded-full z-10"></div>
              <div className="absolute -inset-px bg-background rounded-[2.8rem] overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  {steps.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.8
                        }}
                        transition={{ duration: 0.4, ease: 'backOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <step.icon className="h-40 w-40 text-primary drop-shadow-lg" />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="absolute inset-0">
            {steps.map((step, index) => (
              <div key={index} className="h-screen flex items-center justify-center">
                <motion.div
                  className={cn(
                    "p-8 rounded-2xl border transition-all duration-300 w-full max-w-sm bg-card/80 backdrop-blur-sm shadow-md",
                    index === activeIndex ? "border-primary shadow-2xl" : "border-border"
                  )}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={index === activeIndex ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.5 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <h3 className={cn(
                    "font-bold text-3xl font-headline transition-colors duration-300",
                    index === activeIndex ? 'text-primary' : 'text-foreground'
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-lg">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="relative text-center my-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-dashed border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-2xl font-semibold text-muted-foreground">
            OR
          </span>
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl shadow-xl bg-card border transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex-shrink-0">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-background shadow-lg border-2 border-primary">
              <Store className="h-16 w-16 text-primary" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold font-headline text-foreground">
              Visit Our Store
            </h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Prefer a personal touch? Drop off your laundry at one of our
              conveniently located stores. Our friendly staff will be happy
              to assist you.
            </p>
            <Button className="mt-6" size="lg" asChild>
              <Link href="/stores">Find a Store Near You</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
