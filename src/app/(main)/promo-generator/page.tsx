'use client';

import PromoGeneratorForm from "@/components/promo/promo-generator-form";
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

export default function PromoGeneratorPage() {
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
          Promotional Banner Generator
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          Create eye-catching promotional banners for your marketing campaigns using the power of AI.
        </motion.p>
      </div>
      <motion.div variants={itemVariants}>
        <PromoGeneratorForm />
      </motion.div>
    </motion.div>
  );
}
