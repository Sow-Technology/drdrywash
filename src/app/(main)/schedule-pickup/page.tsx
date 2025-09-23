'use client';

import SchedulePickupForm from "@/components/schedule-pickup/schedule-pickup-form";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export default function SchedulePickupPage() {
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
          Schedule a Pickup
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Ready for a laundry-free life? Fill out the form below to schedule a convenient pickup time.
        </motion.p>
        <motion.div 
            className="mt-6 text-base text-muted-foreground bg-muted p-4 rounded-lg border"
            variants={itemVariants}
        >
            <p className="font-semibold text-foreground">Delivery Conditions:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Free pickup and drop for orders above ₹400 within a 5KM radius.</li>
                <li>Free pickup and drop for all other orders within a 2KM radius.</li>
            </ul>
        </motion.div>
      </div>
      <motion.div variants={itemVariants}>
        <SchedulePickupForm />
      </motion.div>
    </motion.div>
  );
}
