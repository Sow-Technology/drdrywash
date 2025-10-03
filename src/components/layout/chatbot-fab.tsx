
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Phone,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Chatbot from './chatbot';

const fabContainerVariants = {
    closed: { opacity: 1 },
    open: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fabItemVariants = {
    closed: { y: 10, scale: 0.9, opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    open: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
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
)

export default function ChatbotFAB() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setIsFabMenuOpen(false);
  };
  
  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Chatbot isOpen={isChatOpen} onClose={handleCloseChat} />
      <div className="fixed bottom-8 right-8 z-40">
        <motion.div
            className="flex flex-col items-end gap-4"
            variants={fabContainerVariants}
            initial="closed"
            animate={isFabMenuOpen ? "open" : "closed"}
        >
            <AnimatePresence>
                {isFabMenuOpen && (
                    <>
                        <motion.div variants={fabItemVariants} exit={{ y: 20, opacity: 0 }} className='flex items-center gap-3'>
                            <span className="bg-card text-card-foreground text-sm py-1 px-3 rounded-md shadow-lg whitespace-nowrap">Chat on WhatsApp</span>
                             <Button asChild size="icon" className="rounded-full w-12 h-12 shadow-lg !bg-[#25D366] hover:!bg-[#1DAE51] text-white">
                                <Link href="https://wa.me/919738045714" target="_blank" aria-label="Chat on WhatsApp">
                                    <WhatsAppIcon className="h-6 w-6" />
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div variants={fabItemVariants} exit={{ y: 20, opacity: 0 }} className='flex items-center gap-3'>
                             <span className="bg-card text-card-foreground text-sm py-1 px-3 rounded-md shadow-lg whitespace-nowrap">Call Us</span>
                            <Button asChild size="icon" className="rounded-full w-12 h-12 shadow-lg !bg-red-500 hover:!bg-red-600 text-white">
                                <Link href="tel:+919738045714" aria-label="Call Us">
                                    <Phone className="h-6 w-6" />
                                </Link>
                            </Button>
                        </motion.div>
                         <motion.div variants={fabItemVariants} exit={{ y: 20, opacity: 0 }} className='flex items-center gap-3'>
                            <span className="bg-card text-card-foreground text-sm py-1 px-3 rounded-md shadow-lg whitespace-nowrap">Chat with AI</span>
                            <Button size="icon" className="rounded-full w-12 h-12 shadow-lg" onClick={handleOpenChat} aria-label="Chat with AI">
                                <MessageSquare className="h-6 w-6" />
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <Button
                size="icon"
                className="rounded-full w-16 h-16 shadow-lg"
                onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
                aria-expanded={isFabMenuOpen}
                aria-label="Toggle contact menu"
            >
                <motion.div animate={{ rotate: isFabMenuOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <Plus className="h-7 w-7" />
                </motion.div>
            </Button>
        </motion.div>
      </div>
    </>
  );
}

