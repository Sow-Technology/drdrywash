'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
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

const Step = ({
  step,
  index,
  activeIndex,
}: {
  step: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
  activeIndex: number;
}) => {
  const isActive = index === activeIndex;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.05 : 1,
          color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
        }}
        transition={{ duration: 0.3 }}
        className="text-center md:text-left font-bold text-2xl font-headline"
      >
        {step.title}
      </motion.div>
      <motion.p
        animate={{
          opacity: isActive ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
        className="text-center md:text-left text-muted-foreground mt-2"
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
};

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    return springScroll.on("change", (latest) => {
      const numSteps = steps.length;
      const newActiveIndex = Math.min(numSteps - 1, Math.floor(latest * numSteps));
      setActiveIndex(newActiveIndex);
    });
  }, [springScroll]);

  const progressBarY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

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

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16" ref={targetRef}>
        <div className="md:sticky md:top-24 h-[50vh] flex items-center justify-center">
            <div className="relative w-full h-full">
                 <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-72 h-72 rounded-full bg-primary/10 shadow-inner blur-2xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: 'easeInOut' }}
                    />
                 </div>
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, ease: 'backOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {steps[activeIndex] && (
                        <steps[activeIndex].icon className="h-32 w-32 text-primary drop-shadow-lg" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        <div className="relative space-y-24">
            <div className="absolute left-1/2 md:left-4 top-0 w-0.5 h-full bg-muted -z-10">
                <motion.div className="w-full bg-primary" style={{ height: progressBarY }} />
            </div>
            {steps.map((step, index) => (
              <Step key={index} step={step} index={index} activeIndex={activeIndex} />
            ))}
        </div>
      </div>

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
        className="container mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl shadow-xl bg-card border border-border/50 transform hover:scale-[1.02] transition-transform duration-300">
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
