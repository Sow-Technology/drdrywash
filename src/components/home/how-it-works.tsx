'use client';

import { motion } from 'framer-motion';
import { MonitorSmartphone, Bike, Truck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatedWashingMachine } from './animated-washing-machine';

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
  hidden: (isLeft: boolean) => ({ opacity: 0, x: isLeft ? -50 : 50 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const lineVariants = {
  hidden: { height: 0 },
  visible: {
    height: '100%',
    transition: {
      duration: 1,
      ease: 'circOut',
      delay: 0.5,
    },
  },
};

const steps = [
  {
    icon: MonitorSmartphone,
    title: 'Order Online',
    description: 'Schedule your order easily through our website or mobile app.',
    animation: 'pulse',
  },
  {
    icon: Bike,
    title: 'We Pick Up',
    description: 'Our rider will collect your laundry right from your doorstep as per your schedule.',
    animation: 'drive',
  },
  {
    icon: AnimatedWashingMachine,
    title: 'We Clean',
    description: 'Your clothes are expertly cleaned with premium products and state-of-the-art machines.',
    animation: 'spin',
  },
  {
    icon: Truck,
    title: 'We Deliver',
    description: 'Receive your fresh, clean clothes delivered back to you, ready to wear.',
    animation: 'drive',
  },
];

const IconWrapper = ({
  icon: Icon,
  animation,
}: {
  icon: LucideIcon | typeof AnimatedWashingMachine;
  animation: string;
}) => {
  const isAnimatedComponent = animation === 'spin';

  const getAnimation = () => {
    switch (animation) {
      case 'pulse':
        return {
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 0px hsl(var(--primary) / 0.3)',
            '0 0 0 10px hsl(var(--primary) / 0)',
            '0 0 0 0px hsl(var(--primary) / 0)',
          ],
        };
      case 'drive':
        return {
          x: ['-120%', '120%'],
        };
      default:
        return {};
    }
  };

  const getTransition = () => {
     switch (animation) {
      case 'pulse':
        return {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        };
      case 'drive':
        return {
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
        };
      default:
        return {};
    }
  }

  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg border-2 border-primary">
       <div className='overflow-hidden w-full h-full rounded-full flex items-center justify-center'>
        {isAnimatedComponent ? (
            <Icon className="h-10 w-10 text-primary" />
        ) : (
             <motion.div animate={getAnimation()} transition={getTransition()}>
                <Icon className="h-10 w-10 text-primary" />
             </motion.div>
        )}
      </div>
    </div>
  );
};

const StepCard = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="relative flex w-full items-center justify-between"
      custom={isLeft}
      variants={itemVariants}
    >
      {/* Content Card */}
      <div
        className={`w-[calc(50%-4rem)] ${
          isLeft ? 'order-1' : 'order-3'
        }`}
      >
        <div className="p-6 rounded-lg shadow-md bg-card border border-border/50">
          <h3 className="text-xl font-bold font-headline text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
        </div>
      </div>
      
      {/* Icon on Timeline */}
      <div className="z-10 order-2">
        <IconWrapper icon={step.icon} animation={step.animation} />
      </div>

      {/* Empty div for spacing */}
      <div className={`w-[calc(50%-4rem)] ${
          isLeft ? 'order-3' : 'order-1'
        }`} />
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
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
            custom={true}
          >
            A Seamless Laundry Experience
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
            custom={true}
          >
            From your closet to ours and back again, in four simple steps.
          </motion.p>
        </div>

        <div className="relative mt-16 max-w-3xl mx-auto">
          {/* Central Timeline */}
          <motion.div
            className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-border"
            variants={lineVariants}
          />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
