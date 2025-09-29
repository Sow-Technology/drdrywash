
'use client';

import { motion, useInView, useScroll, useSpring, AnimatePresence } from 'framer-motion';
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

const StepContent = ({ step, index, setActiveIndex, isActive }: { step: (typeof steps)[0], index: number, setActiveIndex: (index: number) => void, isActive: boolean }) => {
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
            className="h-96 flex flex-col justify-center relative"
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <h3 className={cn("text-3xl font-bold font-headline transition-colors", isActive ? "text-primary" : "text-foreground")}>
              {step.title}
            </h3>
            <p className={cn("mt-4 text-lg transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>
              {step.description}
            </p>
        </motion.div>
    )
}

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ['start center', 'end end']
  });

  const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
  });

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
        <div className="md:sticky md:top-24 h-96 flex items-center justify-center">
            <div className="relative h-96 w-full flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="absolute w-80 h-80 rounded-full bg-primary/5 shadow-inner" />
                    <div className="absolute w-72 h-72 rounded-full bg-primary/10 shadow-inner blur-xl animate-pulse"></div>
                </motion.div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
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
        <div className="relative" ref={targetRef}>
             <div className='absolute top-0 left-[15px] w-1 h-full bg-muted rounded-full'>
                <motion.div 
                    className="w-1 h-full bg-primary rounded-full origin-top" 
                    style={{ scaleY }}
                />
            </div>
            <div className='pl-8'>
                {steps.map((step, index) => (
                    <StepContent 
                        key={index} 
                        step={step} 
                        index={index} 
                        setActiveIndex={setActiveIndex} 
                        isActive={activeIndex === index}
                    />
                ))}
            </div>
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
