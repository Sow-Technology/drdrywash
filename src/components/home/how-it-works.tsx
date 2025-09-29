
'use client';

import { motion } from 'framer-motion';
import { howItWorksOnline } from '@/lib/data';
import { AnimatedWashingMachine } from './animated-washing-machine';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const isEven = index % 2 === 0;
  const IconComponent = index === 2 ? AnimatedWashingMachine : step.icon;

  return (
    <div
      className={cn(
        'relative flex w-full items-center',
        isEven ? 'justify-start' : 'justify-end'
      )}
    >
      {/* Content */}
      <div
        className={cn(
          'relative z-10 w-[calc(50%-2rem)] space-y-2 text-left',
          isEven ? 'order-2 ml-auto' : 'order-1 mr-auto'
        )}
      >
        <p className="font-bold text-primary">{`Step ${index + 1}`}</p>
        <h3 className="text-xl font-bold font-headline">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>

      {/* Icon */}
      <div className="absolute left-1/2 top-1/2 z-20 h-20 w-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary/10 shadow-lg ring-4 ring-background">
          <IconComponent className="h-10 w-10 text-primary" />
        </div>
      </div>
    </div>
  );
};

const RibbonPath = ({
  isEven,
  isLast,
}: {
  isEven: boolean;
  isLast: boolean;
}) => (
  <div className="relative h-48 w-full">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute left-0 top-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`grad-${isEven}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d={
          isEven
            ? 'M 50 0 C 80 10, 80 90, 50 100'
            : 'M 50 0 C 20 10, 20 90, 50 100'
        }
        stroke={`url(#grad-${isEven})`}
        strokeWidth="10"
        fill="none"
        className="stroke-cap-round"
      />
      {isLast && (
         <path
            d={isEven ? "M 50 100 L 50 120" : "M 50 100 L 50 120"}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            fill="none"
        />
      )}
    </svg>
  </div>
);

export default function HowItWorks() {
  return (
    <motion.section
      className="overflow-hidden py-16 md:py-20 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={stepVariants}
          >
            A Seamless Laundry Experience
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={stepVariants}
          >
            At Dr. Dry Wash, quality meets convenience. We pick up, treat each
            item with expert care, and deliver everything back to your
            doorstep.
          </motion.p>
        </div>

        <div className="relative max-w-2xl mx-auto">
            {/* START TAG */}
            <motion.div className="flex justify-center" variants={stepVariants}>
                <div className="bg-background text-foreground py-2 px-6 rounded-t-lg border-x border-t shadow-md">
                    <h4 className="font-bold tracking-widest">START</h4>
                </div>
            </motion.div>
             <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border"></div>


          <div className="relative mt-8">
            {howItWorksOnline.map((step, index) => (
              <motion.div key={index} variants={stepVariants}>
                <StepCard step={step} index={index} />
                {!howItWorksOnline[index + 1] ? null : (
                  <RibbonPath isEven={index % 2 === 0} isLast={index === howItWorksOnline.length - 2} />
                )}
              </motion.div>
            ))}
          </div>

           {/* STOP TAG */}
            <motion.div className="flex justify-center mt-[-1rem]" variants={stepVariants}>
                <div className="bg-background text-foreground py-2 px-6 rounded-b-lg border-x border-b shadow-md">
                    <h4 className="font-bold tracking-widest">FINISH</h4>
                </div>
            </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
