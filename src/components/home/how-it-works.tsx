'use client';

import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { MonitorSmartphone, Bike, ShoppingBag, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatedWashingMachine } from './animated-washing-machine';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: MonitorSmartphone,
    title: 'Order Online',
    description: 'Schedule your order easily through our website or mobile app.',
  },
  {
    icon: Bike,
    title: 'We Pick Up',
    description: 'Our rider will collect your laundry right from your doorstep as per your schedule.',
  },
  {
    icon: AnimatedWashingMachine,
    title: 'We Clean',
    description: 'Your clothes are expertly cleaned with premium products and state-of-the-art machines.',
  },
  {
    icon: ShoppingBag,
    title: 'We Deliver',
    description: 'Receive your fresh, clean clothes delivered back to you, ready to wear.',
  },
];

const StepContent = ({ step, index, setActiveIndex }: { step: (typeof steps)[0], index: number, setActiveIndex: (index: number) => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    return (
        <motion.div
            ref={ref}
            className="h-96"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isInView ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-3xl font-bold font-headline text-foreground">
              {step.title}
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              {step.description}
            </p>
        </motion.div>
    )
}

export default function HowItWorks() {
    const [activeIndex, setActiveIndex] = useState(0);
    const ActiveIcon = steps[activeIndex].icon;

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
        <h2
          className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
        >
          A Seamless Laundry Experience
        </h2>
        <p
          className="mt-4 text-lg text-muted-foreground"
        >
          From your closet to ours and back again, with two convenient options.
        </p>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="md:sticky md:top-24">
            <div className="relative h-96">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full bg-primary/10 shadow-inner" />
                </div>
                {steps.map((step, index) => (
                    <div key={index} className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                        activeIndex === index ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="relative w-64 h-64 flex items-center justify-center">
                           <motion.div
                             key={index}
                             initial={{ scale: 0.5, opacity: 0 }}
                             animate={{ scale: activeIndex === index ? 1 : 0.5, opacity: activeIndex === index ? 1 : 0 }}
                             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                           >
                            <step.icon className={`h-32 w-32 text-primary`} />
                           </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="relative">
            {steps.map((step, index) => (
                <StepContent key={index} step={step} index={index} setActiveIndex={setActiveIndex} />
            ))}
        </div>
      </div>

       <div className="container">
        <motion.div
          className="relative text-center my-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-dashed border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-2xl font-semibold text-muted-foreground">
              OR
            </span>
          </div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl shadow-xl bg-card border border-border/50 transform hover:scale-[1.02] transition-transform duration-300">
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
      </div>

    </motion.section>
  );
}
