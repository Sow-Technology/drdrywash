'use client';

import { motion } from 'framer-motion';
import { MonitorSmartphone, Bike, Truck, Store, ShoppingBag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatedWashingMachine } from './animated-washing-machine';
import Link from 'next/link';
import { Button } from '../ui/button';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const steps = [
  {
    icon: MonitorSmartphone,
    title: 'Order Online',
    description: 'Schedule your order easily through our website or mobile app.',
    bgColor: 'bg-blue-500',
  },
  {
    icon: Bike,
    title: 'We Pick Up',
    description: 'Our rider will collect your laundry right from your doorstep as per your schedule.',
    bgColor: 'bg-orange-500',
  },
  {
    icon: AnimatedWashingMachine,
    title: 'We Clean',
    description: 'Your clothes are expertly cleaned with premium products and state-of-the-art machines.',
    bgColor: 'bg-green-500',
  },
  {
    icon: ShoppingBag,
    title: 'We Deliver',
    description: 'Receive your fresh, clean clothes delivered back to you, ready to wear.',
    bgColor: 'bg-purple-500',
  },
];

const StepCard = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      variants={sectionVariants}
    >
      <div
        className={`absolute inset-0 transform ${isEven ? 'skew-y-3' : '-skew-y-3'} ${step.bgColor} opacity-10`}
      ></div>
      <div className="container py-12 md:py-16">
        <motion.div
          className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center`}
          variants={itemVariants}
        >
          <div className={`flex justify-center ${isEven ? 'md:order-last' : ''}`}>
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-background shadow-2xl border-4 border-white">
              <step.icon className={`h-24 w-24 ${step.bgColor.replace('bg-', 'text-')}`} />
            </div>
          </div>
          <div className={`text-center md:text-left ${isEven ? 'md:text-right' : ''}`}>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{`Step ${index + 1}`}</p>
            <h3 className="mt-2 text-3xl font-bold font-headline text-foreground">
              {step.title}
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              {step.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="py-16 md:py-24 bg-background overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container text-center max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
          variants={itemVariants}
        >
          A Seamless Laundry Experience
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          From your closet to ours and back again, with two convenient options.
        </motion.p>
      </div>

      <div className="mt-16 md:mt-24 space-y-4">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>

      <div className="container">
        <motion.div
          className="relative text-center my-16"
          variants={itemVariants}
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
          variants={itemVariants}
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
