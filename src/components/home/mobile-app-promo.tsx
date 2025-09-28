'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, Search, IndianRupee } from 'lucide-react';
import { Button } from '../ui/button';

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
  hidden: { opacity: 0, y: 20 },
  visible: { 
      opacity: 1, 
      y: 0,
      transition: {
          duration: 0.5,
          ease: 'easeOut'
      }
  },
};

const features = [
  {
    icon: Clock,
    text: 'Schedule Pickup',
    href: '/schedule-pickup',
  },
  {
    icon: Search,
    text: 'Track Order Status',
    href: '/track-order',
  },
  {
    icon: IndianRupee,
    text: 'Pay Online',
    href: '#', // Placeholder link
  },
];

export default function MobileAppPromo() {
  const handImage = PlaceHolderImages.find((img) => img.id === 'app-promo-hand');
  const qrImage = PlaceHolderImages.find((img) => img.id === 'qr-code');
  const appStoreImage = PlaceHolderImages.find((img) => img.id === 'app-store-badge');
  const googlePlayImage = PlaceHolderImages.find((img) => img.id === 'google-play-badge');

  return (
    <motion.section
      className="py-16 md:py-20 bg-card"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
              Online Laundry & Dry Cleaning Now Just A Mobile App Click Away
            </h2>
            <div className="my-8 space-y-4">
              {features.map((feature, index) => (
                <Link key={index} href={feature.href}>
                    <motion.div 
                        className="flex items-center p-4 border rounded-lg hover:bg-background hover:shadow-md transition-all"
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="p-2 bg-muted rounded-full mr-4">
                            <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-semibold text-lg">{feature.text}</span>
                    </motion.div>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {appStoreImage && (
                <Link href="#" passHref>
                  <Image
                    src={appStoreImage.imageUrl}
                    alt="Download on the App Store"
                    data-ai-hint={appStoreImage.imageHint}
                    width={120}
                    height={40}
                    className="cursor-pointer"
                  />
                </Link>
              )}
              {googlePlayImage && (
                <Link href="#" passHref>
                  <Image
                    src={googlePlayImage.imageUrl}
                    alt="Get it on Google Play"
                    data-ai-hint={googlePlayImage.imageHint}
                    width={135}
                    height={40}
                    className="cursor-pointer"
                  />
                </Link>
              )}
            </div>
          </motion.div>
          <motion.div className="relative h-[500px] flex items-center justify-center" variants={itemVariants}>
            <div className="absolute inset-y-0 right-0 w-2/3 bg-green-700 rounded-l-full" style={{zIndex: 0, opacity: 0.2}}></div>
            <div className="relative flex items-center justify-center">
              {handImage && (
                <Image
                  src={handImage.imageUrl}
                  alt={handImage.description}
                  data-ai-hint={handImage.imageHint}
                  width={300}
                  height={600}
                  className="z-10 object-contain drop-shadow-2xl"
                />
              )}
              {qrImage && (
                <div className="absolute bottom-4 right-[-40px] z-20 bg-white p-2 rounded-lg shadow-lg">
                  <Image
                    src={qrImage.imageUrl}
                    alt={qrImage.description}
                    data-ai-hint={qrImage.imageHint}
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
