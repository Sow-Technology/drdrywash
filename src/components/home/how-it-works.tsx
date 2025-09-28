
'use client';

import { motion } from 'framer-motion';
import { howItWorksOnline } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedWashingMachine } from './animated-washing-machine';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      }
  },
};

const iconAnimation = (step: number) => {
    switch (step) {
        case 0: // Order Online
            return {
                scale: [1, 1.05, 1],
                transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            };
        case 1: // Pick Up
        case 3: // Drop Off
             return {
                x: ["-110%", "110%"],
                transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: 'loop',
                    repeatDelay: 2
                },
            };
        case 2: // Cleaning - The component now handles its own animation
            return {};
        default:
            return {};
    }
}

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={sectionVariants}
        >
          {howItWorksOnline.map((step, index) => {
            const IconComponent = index === 2 ? AnimatedWashingMachine : step.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="text-center h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-center">
                      <div 
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 overflow-hidden"
                      >
                        <motion.div animate={iconAnimation(index)}>
                          <IconComponent className="h-10 w-10 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-primary mb-2">
                      Step {index + 1}
                    </p>
                    <CardTitle className="font-headline text-xl">
                      {step.title}
                    </CardTitle>
                    <p className="mt-2 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
