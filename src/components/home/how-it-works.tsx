
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { howItWorksOnline, howItWorksStore } from "@/lib/data";
import { Separator } from "../ui/separator";
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
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  const { icon: StoreIcon } = howItWorksStore;
  return (
    <motion.section 
      className="py-20 md:py-28 bg-card"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            Best Laundry & Dry Cleaning Service
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            Pickup. Clean. Deliver.
          </motion.p>
          <motion.div 
            className="mt-4 inline-block"
            variants={itemVariants}
          >
            <div className="bg-primary h-1 w-20 mx-auto" />
          </motion.div>
        </div>
        <motion.div className="mt-16 max-w-4xl mx-auto" variants={itemVariants}>
          <Card className="p-8 border-2 border-primary/10 shadow-lg bg-background">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-md inline-block">
                  HOW IT WORKS
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Book Online Section */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-center mb-6">BOOK ONLINE</h3>
                  <div className="flex items-center justify-center text-center gap-4">
                    {howItWorksOnline.map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <motion.div 
                          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/10 mb-2"
                          whileHover={{ scale: 1.1, rotate: 6 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                           <step.icon className="h-10 w-10 text-primary" />
                        </motion.div>
                        <p className="font-semibold">{step.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OR Separator */}
                 <div className="flex items-center gap-4">
                    <Separator orientation="vertical" className="h-16 hidden md:block" />
                    <span className="text-2xl font-bold text-muted-foreground">OR</span>
                    <Separator orientation="vertical" className="h-16 hidden md:block" />
                </div>


                {/* Visit Store Section */}
                <div className="flex-1">
                   <h3 className="text-2xl font-bold text-center mb-6">VISIT STORE</h3>
                   <div className="flex flex-col items-center text-center">
                        <motion.div 
                          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/10 mb-2"
                          whileHover={{ scale: 1.1, rotate: 6 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <StoreIcon className="h-10 w-10 text-primary" />
                        </motion.div>
                        <p className="font-semibold">{howItWorksStore.title}</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
