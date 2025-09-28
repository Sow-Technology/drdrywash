
'use client';

import { Building, Building2, Hotel, Landmark, Hospital, Home } from "lucide-react";
import GetAQuoteDialog from "./get-a-quote-dialog";
import { motion } from "framer-motion";

const services = [
    {
        icon: Building2,
        name: "Corporates"
    },
    {
        icon: Building,
        name: "Serviced Apartments"
    },
    {
        icon: Landmark,
        name: "Government Offices"
    },
    {
        icon: Hotel,
        name: "Hotels"
    },
    {
        icon: Hospital,
        name: "Hospitals"
    },
    {
        icon: Home,
        name: "Hostels and PG"
    }
]

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        }
    },
};

export default function WeAlsoServe() {
    return (
        <motion.section 
            className="py-16 md:py-20 bg-background"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container text-center">
                <motion.h2 
                    className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
                    variants={itemVariants}
                >
                    WE ALSO SERVE
                </motion.h2>
                <motion.div
                    className="mt-4 inline-block"
                    variants={itemVariants}
                >
                    <div className="bg-primary h-1 w-20 mx-auto" />
                </motion.div>

                <motion.div 
                    className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto"
                    variants={sectionVariants}
                >
                    {services.map((service) => (
                        <motion.div key={service.name} className="flex flex-col items-center" variants={itemVariants}>
                            <motion.div 
                              className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/10 mb-4"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <service.icon className="h-10 w-10 text-primary" />
                            </motion.div>
                            <h3 className="font-semibold text-center">{service.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="mt-16" variants={itemVariants}>
                    <GetAQuoteDialog />
                </motion.div>
            </div>
        </motion.section>
    );
}
