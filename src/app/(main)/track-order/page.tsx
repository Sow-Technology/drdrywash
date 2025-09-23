'use client';

import TrackOrderForm from "@/components/tracking/track-order-form";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};


export default function TrackOrderPage() {
  return (
    <motion.div 
      className="container py-12 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
       <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.h1 
          className="text-4xl font-bold tracking-tight font-headline sm:text-5xl"
          variants={itemVariants}
        >
          Order Status
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Enter your order ID below to see real-time updates on your laundry.
        </motion.p>
      </div>
      <motion.div variants={itemVariants}>
        <TrackOrderForm />
      </motion.div>
    </motion.div>
  );
}
