'use client';

import SchedulePickupForm from "@/components/schedule-pickup/schedule-pickup-form";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.3
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
      </div>
      <motion.div variants={itemVariants}>
        <SchedulePickupForm />
      </motion.div>
    </motion.div>
  );
}
