
'use client';

import { motion } from 'framer-motion';
import { howItWorksOnline } from '@/lib/data';
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

const timelineColors = [
  'bg-timeline-green',
  'bg-timeline-orange',
  'bg-timeline-blue',
  'bg-timeline-red',
];

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
        
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical timeline connector */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-border -z-1"></div>

          <div className="flex flex-col gap-12">
            {howItWorksOnline.map((step, index) => {
              const IconComponent =
                index === 2 ? AnimatedWashingMachine : step.icon;
              const isReversed = index % 2 !== 0;

              return (
                <motion.div
                  key={index}
                  className="relative flex items-center justify-center w-full"
                  variants={itemVariants}
                >
                  <div
                    className={`flex items-stretch w-full ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Banner */}
                    <div className="w-1/2 flex justify-center items-center">
                      <div className="w-40 h-40 flex flex-col justify-center items-center text-white p-4 relative shadow-lg"
                           style={{
                                clipPath: isReversed
                                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20% 50%)'
                                    : 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)',
                           }}
                      >
                         <div className={`absolute inset-0 ${timelineColors[index]} -z-1`}
                              style={{
                                clipPath: isReversed
                                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 20% 50%)'
                                    : 'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)',
                              }}
                         ></div>
                        <span className="text-5xl font-bold font-headline">{`0${index + 1}`}</span>
                        <span className="font-semibold">STEP</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className="w-1/2 flex items-center">
                       <div className="bg-background p-6 rounded-lg shadow-lg border w-full">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                                <IconComponent className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-headline">{step.title}</h3>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                    </div>
                  </div>
                   {/* Center Dot on timeline */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-card"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
