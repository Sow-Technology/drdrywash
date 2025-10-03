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

const StepContent = ({
  step,
  index,
  activeIndex,
}: {
  step: {
    icon: LucideIcon | typeof AnimatedWashingMachine;
    title: string;
    description: string;
  };
  index: number;
  activeIndex: number;
}) => {
  const isActive = index === activeIndex;

  const cardVariants = {
      inactive: {
          scale: 0.95,
          opacity: 0.7,
      },
      active: {
          scale: 1,
          opacity: 1,
      },
  }

  const textVariants = {
    inactive: { opacity: 0, y: 10 },
    active: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
        className='h-screen flex items-center justify-center'
    >
        <motion.div 
            className={cn(
                "p-8 rounded-2xl border transition-all duration-300 w-full max-w-sm bg-card/80 backdrop-blur-sm shadow-md",
                isActive ? "border-primary shadow-xl" : "border-border"
            )}
            variants={cardVariants}
            animate={isActive ? 'active' : 'inactive'}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.h3
                className={cn(
                    "font-bold text-3xl font-headline transition-colors duration-300",
                    isActive ? 'text-primary' : 'text-foreground'
                )}
                variants={textVariants}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                {step.title}
            </motion.h3>
            <motion.p 
                className="text-muted-foreground mt-3 text-lg"
                variants={textVariants}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                {step.description}
            </motion.p>
        </motion.div>
    </motion.div>
  );
};

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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const handFloat = {
    y: ["-6px", "6px"],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative h-[400vh]">
            <motion.div 
                className="md:sticky md:top-0 h-screen flex items-center justify-center"
                style={{ y }}
            >
                <motion.div 
                    className="relative w-64 h-[32rem] bg-slate-800 dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border-4 border-slate-700"
                    animate={handFloat}
                >
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 dark:bg-black rounded-full"></div>
                    <div className="absolute inset-4 bg-background rounded-[2rem] overflow-hidden">
                        <div className="relative w-full h-full">
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
                                        <step.icon className="h-32 w-32 text-primary drop-shadow-lg" />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <div className="relative flex flex-col">
                {steps.map((step, index) => (
                <StepContent key={index} step={step} index={index} activeIndex={activeIndex} />
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
