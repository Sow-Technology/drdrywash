'use client';

import { whyChooseUsItems } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import Image from "next/image";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function WhyChooseUs() {
    const whyChooseUsImage = PlaceHolderImages.find(img => img.id === 'why-choose-us');
    const leftItems = whyChooseUsItems.slice(0, 3);
    const rightItems = whyChooseUsItems.slice(3, 6);

  return (
    <motion.section 
      className="py-20 md:py-28 bg-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Column */}
            <motion.div className="space-y-12" variants={sectionVariants}>
                {leftItems.map((item, index) => (
                    <motion.div key={index} className="flex flex-col items-center md:items-end text-center md:text-right" variants={itemVariants}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold font-headline">{item.title}</h3>
                        <p className="text-muted-foreground mt-1">{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Center Image */}
            <motion.div className="flex justify-center" variants={itemVariants}>
                {whyChooseUsImage && (
                    <Image 
                        src={whyChooseUsImage.imageUrl}
                        alt={whyChooseUsImage.description}
                        data-ai-hint={whyChooseUsImage.imageHint}
                        width={400}
                        height={400}
                        className="rounded-full object-cover aspect-square shadow-lg"
                    />
                )}
            </motion.div>

            {/* Right Column */}
            <motion.div className="space-y-12" variants={sectionVariants}>
                {rightItems.map((item, index) => (
                    <motion.div key={index} className="flex flex-col items-center md:items-start text-center md:text-left" variants={itemVariants}>
                         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold font-headline">{item.title}</h3>
                        <p className="text-muted-foreground mt-1">{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
