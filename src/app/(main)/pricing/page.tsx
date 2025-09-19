'use client';

import PricingTables from '@/components/pricing/pricing-tables';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingPage() {
  return (
    <motion.div
      className="container py-12 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.h1
          className="text-4xl font-bold tracking-tight font-headline sm:text-5xl"
          variants={itemVariants}
        >
          Transparent Pricing
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          No hidden fees. Simple, upfront pricing for our premium services.
          <br />
          <span className="text-sm">
            *Please note that the prices above are exclusive of GST
          </span>
        </motion.p>
      </div>

      <motion.div variants={itemVariants}>
        <PricingTables />
      </motion.div>

      <motion.div
        className="my-16 max-w-3xl mx-auto text-center"
        variants={itemVariants}
      >
        <h3 className="text-2xl font-bold mb-4">- Delivery Options -</h3>
        <div className="space-y-2 text-lg text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">
              STANDARD DELIVERY (72 HOURS)
            </span>{' '}
            – NO EXTRA CHARGE
          </p>
          <p>
            <span className="font-semibold text-foreground">
              SEMI-EXPRESS (48 HOURS)
            </span>{' '}
            – 1.5X PRICE (50% EXTRA)
          </p>
          <p>
            <span className="font-semibold text-foreground">
              EXPRESS DELIVERY (24 HOURS)
            </span>{' '}
            – 2X PRICE (100% EXTRA)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
