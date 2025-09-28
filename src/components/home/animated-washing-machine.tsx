'use client';

import { motion } from 'framer-motion';
import type { SVGProps } from 'react';

export function AnimatedWashingMachine(props: SVGProps<SVGSVGElement>) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Static outer body of the washing machine */}
      <path d="M16 4h.01" />
      <path d="M12 4h.01" />
      <path d="M8 4h.01" />
      <rect width="18" height="20" x="3" y="2" rx="2" />
      <circle cx="12" cy="13" r="5" />

      {/* Rotating inner part */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      >
        <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
      </motion.g>
    </motion.svg>
  );
}
