
'use client';

import { whyChooseUsItems } from "@/lib/data";
import { motion } from "framer-motion";

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
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
        }
    },
};

export default function WhyChooseUs() {
  return (
    <motion.section 
      className="py-20 md:py-28 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            Why Choose Us?
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            Spin Cycles provides a variety of cleaning services. Choose us because of our reputation for excellence.
          </motion.p>
        </div>
        <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={sectionVariants}
        >
            {whyChooseUsItems.map((item, index) => (
                <motion.div 
                    key={index}
                    className="flex flex-col items-center text-center p-6 border rounded-lg bg-background group transform transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:shadow-primary/20" 
                    variants={itemVariants}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 transition-transform duration-300 group-hover:scale-110">
                        <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
