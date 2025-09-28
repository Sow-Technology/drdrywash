'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { howItWorksOnline } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

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
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
  </svg>
);

export default function HowItWorks() {
  return (
    <motion.section
      className="py-20 md:py-28 bg-card"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            A Seamless Laundry Experience in 4 Easy Steps
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            At Dr. Dry Wash, we provide a premium cleaning service that fits into your busy lifestyle. We pick up, treat each item with care, and deliver everything back to your doorstep. Quality meets convenience.
          </motion.p>
        </div>

        <motion.div
          className="relative mt-20 max-w-5xl mx-auto"
          variants={sectionVariants}
        >
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary -translate-y-1/2" style={{clipPath: 'polygon(0 0, 95% 0, 95% 100%, 0% 100%)'}}></div>
            <div className="relative grid grid-cols-4 gap-8">
              {howItWorksOnline.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10">
                     <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background border-2 border-primary shadow-lg">
                        <step.icon className="h-10 w-10 text-primary" />
                     </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Mobile Timeline */}
           <div className="md:hidden space-y-12">
              {howItWorksOnline.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="relative flex items-start gap-6">
                   <div className="absolute left-9 top-9 -bottom-4 w-0.5 bg-border"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card border-2 border-primary shadow-lg">
                            <step.icon className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                             {index + 1}
                           </div>
                           <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                     </div>
                </motion.div>
              ))}
           </div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/schedule-pickup">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Schedule Free Pickup
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto !bg-green-500 hover:!bg-green-600 !text-white"
            asChild
          >
            <Link href="https://wa.me/919738045714" target="_blank">
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
