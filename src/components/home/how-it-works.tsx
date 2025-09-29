'use client';

import { motion } from 'framer-motion';
import {
  MonitorSmartphone,
  Bike,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

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
    },
  },
};

const iconHoverVariant = {
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300 },
  },
};

const howItWorksOnline: { icon: LucideIcon; title: string }[] = [
  {
    icon: MonitorSmartphone,
    title: 'Place Order',
  },
  {
    icon: Bike,
    title: 'Pickup',
  },
  {
    icon: ShoppingBag,
    title: 'Delivery',
  },
];

const howItWorksStore = {
  icon: Store,
  title: 'Visit Store',
};

const Step = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
  <motion.div
    className="flex flex-col items-center gap-2"
    variants={iconHoverVariant}
    whileHover="hover"
  >
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm">
      <Icon className="h-12 w-12 text-primary" />
    </div>
    <p className="font-semibold text-muted-foreground">{title}</p>
  </motion.div>
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
        <div className="flex items-center mb-8">
            <motion.div 
                className="bg-primary text-primary-foreground py-2 px-6 rounded-md shadow-md"
                variants={itemVariants}
            >
                <h4 className="font-bold tracking-widest">HOW IT WORKS</h4>
            </motion.div>
            <motion.div 
                className="flex-grow h-0.5 bg-primary/50 ml-4"
                variants={itemVariants}
            ></motion.div>
        </div>

        <motion.div 
            className="border-4 border-primary rounded-3xl p-8"
            variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8">
            {/* Book Online Section */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-2xl font-bold font-headline text-foreground">BOOK ONLINE</h3>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-8 w-full mt-4">
                {howItWorksOnline.map((step, index) => (
                  <Step key={index} icon={step.icon} title={step.title} />
                ))}
              </div>
            </div>

            {/* OR Divider */}
            <div className="flex items-center justify-center">
              <span className="text-4xl font-extrabold text-muted-foreground">OR</span>
            </div>

            {/* Visit Store Section */}
            <div className="flex flex-col items-center gap-4">
               <h3 className="text-2xl font-bold font-headline text-foreground">VISIT STORE</h3>
               <div className="mt-4">
                <Step icon={howItWorksStore.icon} title={howItWorksStore.title} />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
