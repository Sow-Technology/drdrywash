
'use client';

import { whyChooseUsItems } from "@/lib/data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

export default function WhyChooseUs() {
  return (
    <motion.section 
      className="py-16 md:py-20 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            Best Dry Clean And Laundry Service in India
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            When it comes to Laundry & Dry clean services in India, our team of skilled professionals is committed to delivering superior results. We understand the importance of clean and fresh laundry, and that's why we use advanced techniques and state-of-the-art equipment to ensure optimal cleanliness and hygiene.
          </motion.p>
        </div>
        <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={sectionVariants}
        >
            {whyChooseUsItems.map((item, index) => (
                <motion.div 
                    key={index}
                    className={cn(
                        "p-6 rounded-lg shadow-sm flex flex-col items-center text-center",
                        "bg-primary/5",
                        // This logic creates the 2 -> 1 -> 2 layout on medium screens
                        index === 2 && "md:col-span-2 lg:col-span-1",
                        item.highlighted && "bg-background"
                    )}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                      transition: { duration: 0.3 }
                    }}
                >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-background mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <item.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className={cn(
                        "text-lg font-bold font-headline mb-2",
                        "text-primary"
                    )}>{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
