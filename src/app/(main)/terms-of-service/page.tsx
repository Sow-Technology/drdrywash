'use client';

import { motion } from 'framer-motion';

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const TermItem = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div className="mb-4" variants={itemVariants}>
        <h2 className="text-2xl font-bold font-headline mb-2">{title}</h2>
        <div className="text-muted-foreground space-y-2">
            {children}
        </div>
    </motion.div>
);

export default function TermsOfServicePage() {
  return (
    <motion.div
      className="container py-12 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Please read our terms and conditions carefully before using our service.
          </p>
        </motion.div>

        <motion.div variants={sectionVariants}>
            <TermItem title="1. Account Confidentiality">
                <p>Users are responsible for maintaining the confidentiality of their account and all activities that occur under their account.</p>
            </TermItem>

            <TermItem title="2. Accuracy of Information">
                <p>The company attempts to be as accurate as possible in its service descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.</p>
            </TermItem>

            <TermItem title="3. Garment Care and Damages">
                <p>Dr. Dry Wash is not responsible for damage to ornaments, jewelry, or fittings on garments. We are also not responsible for damages caused by the oldness, poor quality, or natural wear and tear of a garment.</p>
                <p>Please inform us of any special requirements or instructions for your garments. While we do our best to follow them, we cannot guarantee against unforeseen damage.</p>
            </TermItem>

            <TermItem title="4. Taxes and Payments">
                <p>All taxes and levies are applied as per Indian law. All payments made for services are non-refundable once the service has been rendered.</p>
            </TermItem>

             <TermItem title="5. Governing Law">
                <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </TermItem>
        </motion.div>
      </div>
    </motion.div>
  );
}
