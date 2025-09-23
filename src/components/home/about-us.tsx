'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import Link from 'next/link';

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

export default function AboutUs() {
  const founderImage = PlaceHolderImages.find(img => img.id === 'founder-photo');

  return (
    <motion.section 
      className="py-20 md:py-28 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            {founderImage && (
              <Image 
                src={founderImage.imageUrl}
                alt={founderImage.description}
                data-ai-hint={founderImage.imageHint}
                width={500}
                height={600}
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
            )}
          </motion.div>
          <motion.div variants={itemVariants} className="max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">A Legacy of Freshness, Reimagined.</h2>
            <div className="mt-4 bg-primary h-1 w-20"></div>
            <div className="mt-6 text-lg text-muted-foreground space-y-4">
              <p>
                Dr. Dry Wash represents the next chapter in a story that began over a decade ago. We are built on the foundation of <span className="font-semibold text-foreground">New Super Dry Cleaners</span>, a family business that has proudly served our community for 10 years.
              </p>
              <p>
                Founded in September 2025 by <span className="font-semibold text-foreground">Ajith T</span>, our CEO, Dr. Dry Wash is the result of a vision to blend time-honored expertise with the convenience of modern technology. We've digitized our services to bring you a seamless, high-quality laundry experience right at your fingertips.
              </p>
               <p>
                Our commitment to excellence remains unchanged, but now, it’s delivered with more efficiency and care than ever before.
              </p>
            </div>
             <div className='mt-8'>
                <p className='font-bold text-foreground'>Ajith T</p>
                <p className='text-sm text-muted-foreground'>Founder & CEO, Dr. Dry Wash</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
