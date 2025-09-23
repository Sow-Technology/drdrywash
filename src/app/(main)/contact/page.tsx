'use client';

import ContactForm from "@/components/contact/contact-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const contactImage = PlaceHolderImages.find(img => img.id === 'contact-us');

  return (
    <motion.div 
      className="container py-12 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.h1 
          className="text-4xl font-bold tracking-tight font-headline sm:text-5xl"
          variants={itemVariants}
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          variants={itemVariants}
        >
          We're here to help with any questions, concerns, or feedback you may have.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={sectionVariants}
      >
        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
        <motion.div className="hidden lg:block" variants={itemVariants}>
            {contactImage && (
                <Image
                    src={contactImage.imageUrl}
                    alt={contactImage.description}
                    data-ai-hint={contactImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
            )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
