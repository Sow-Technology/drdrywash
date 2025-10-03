
'use client';

import {
  Shirt,
  Sparkles,
  SprayCan,
  Star,
  Wind,
  CheckSquare,
  ShoppingCart,
  Gem,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

const services = [
  {
    icon: Shirt,
    title: 'Wash & Fold',
    description: 'Affordable laundry service. Delivery Time: 72 Hours',
  },
  {
    icon: Sparkles,
    title: 'Wash & Iron',
    description: 'Preferred for regular and formals. Delivery Time: 72 Hours',
  },
  {
    icon: Gem,
    title: 'Premium Laundry',
    description: 'Tailored specifically for formals & premium wear.',
  },
  {
    icon: SprayCan,
    title: 'Dry Clean',
    description:
      'Wedding Dresses, Lehengas, Sarees, Jackets, Blazers & more.',
  },
  {
    icon: Wind,
    title: 'Steam Press',
    description: 'Removes wrinkles completely.',
  },
  {
    icon: Star,
    title: 'Starching',
    description: 'Adds crispness and structure to your clothes.',
  },
  {
    icon: CheckSquare,
    title: 'Prem. Steam Press',
    description: 'Premium packing and crease-free garments on hanger.',
  },
  {
    icon: Gem,
    title: 'Premium Dry clean',
    description: 'Exclusive care for premium garments.',
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
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

export default function ServiceList() {
  return (
    <motion.section
      id="services"
      className="py-16 md:py-20 bg-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Say Goodbye to Odours & Dirty Clothes!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No more traditional dhobi ghats or manual labour—just Hi-Tech,
            state-of-the-art smart machines ensuring your garments are cleaned
            with the utmost precision and care.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={sectionVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="w-full"
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="overflow-hidden group h-full bg-card shadow-sm hover:shadow-xl transition-shadow duration-300 text-center flex flex-col p-6">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mx-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <service.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </motion.div>
                </div>
                <CardContent className="flex flex-col flex-grow p-0 pt-6">
                  <CardTitle className="font-headline text-xl">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="mt-2 flex-grow">
                    {service.description}
                  </CardDescription>
                  <Button className="mt-6 w-full" asChild>
                    <Link href="/schedule-pickup">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-16" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
