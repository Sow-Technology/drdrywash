'use client';

import { Shirt, Sparkles, CheckSquare, BedDouble } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'wash-fold',
    icon: Shirt,
    title: 'Wash & Fold',
    description: 'Expert washing and perfect folding for your everyday wear.',
  },
  {
    id: 'dry-cleaning',
    icon: Sparkles,
    title: 'Dry Cleaning',
    description: 'Specialized care for your delicate and valuable garments.',
  },
  {
    id: 'ironing',
    icon: CheckSquare,
    title: 'Pressing & Ironing',
    description: 'Crisp, wrinkle-free finish for a sharp, professional look.',
  },
  {
    id: 'bedding',
    icon: BedDouble,
    title: 'Bedding & Linens',
    description: 'Fresh and clean duvets, comforters, and bed sheets.',
  },
];

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

export default function ServiceList() {
  return (
    <motion.section 
      id="services" 
      className="py-20 md:py-28 bg-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            We offer a range of professional laundry services to meet all your needs.
          </motion.p>
        </div>
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={sectionVariants}
        >
          {services.map((service) => {
            const serviceImage = PlaceHolderImages.find(img => img.id === service.id);
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <motion.div
                  className="h-full"
                  whileHover="hover"
                  transition={{
                    duration: 0.1,
                    ease: "easeOut",
                  }}
                  variants={{
                    hover: {
                      y: -8,
                    },
                  }}
                >
                  <Card className="overflow-hidden group h-full bg-card shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
                    {serviceImage && (
                      <Image
                        src={serviceImage.imageUrl}
                        alt={serviceImage.description}
                        data-ai-hint={serviceImage.imageHint}
                        width={600}
                        height={400}
                        className="object-cover h-48 w-full"
                      />
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0"
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <service.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
