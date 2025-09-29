
'use client';

import { motion } from 'framer-motion';
import { howItWorksOnline } from '@/lib/data';
import { AnimatedWashingMachine } from './animated-washing-machine';
import { cn } from '@/lib/utils';

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
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const lineVariants = {
  hidden: { height: 0 },
  visible: {
    height: '100%',
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      delay: 0.5,
    },
  },
};

export default function HowItWorks() {
  return (
    <motion.section
      className="py-16 md:py-20 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            A Seamless Laundry Experience
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            At Dr. Dry Wash, quality meets convenience. We pick up, treat each
            item with expert care, and deliver everything back to your
            doorstep.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-border"
            variants={lineVariants}
          ></motion.div>

          <div className="space-y-16">
            {howItWorksOnline.map((step, index) => {
              const IconComponent =
                index === 2 ? AnimatedWashingMachine : step.icon;
              const isReversed = index % 2 !== 0;

              const cardVariants = {
                hidden: { opacity: 0, x: isReversed ? 50 : -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              };

              return (
                <motion.div
                  key={index}
                  className="relative flex items-center"
                  variants={sectionVariants}
                >
                  <div
                    className={cn(
                      'w-1/2',
                      isReversed ? 'ml-auto pr-8' : 'mr-auto pl-8'
                    )}
                  >
                    <motion.div
                      className="bg-background p-6 rounded-lg shadow-lg border relative"
                      variants={cardVariants}
                    >
                      <div
                        className={cn(
                          'absolute top-1/2 -translate-y-1/2',
                          isReversed
                            ? 'left-0 -translate-x-1/2'
                            : 'right-0 translate-x-1/2'
                        )}
                      >
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-4 border-background shadow-md">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div
                        className={cn(
                          'flex flex-col',
                          isReversed ? 'items-start' : 'items-end'
                        )}
                      >
                        <p className="text-sm text-primary font-bold">{`STEP 0${index + 1}`}</p>
                        <h3 className="text-xl font-bold font-headline mt-1">
                          {step.title}
                        </h3>
                        <p
                          className={cn(
                            'mt-2 text-sm text-muted-foreground',
                            isReversed ? 'text-left' : 'text-right'
                          )}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-4 border-card ring-4 ring-primary/20"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
