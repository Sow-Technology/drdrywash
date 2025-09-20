'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Calendar, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const chatbotVariants = {
  closed: { opacity: 0, y: 20, scale: 0.95 },
  open: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const chatbotPosition = isMobile ? { bottom: '5.5rem', right: '1rem' } : { bottom: '2rem', right: '2rem' };

  const supportOptions = [
    {
      icon: Calendar,
      text: 'Schedule a Pickup',
      href: '/schedule-pickup'
    },
    {
      icon: Search,
      text: 'Track an Order',
      href: '/track-order'
    },
    {
      icon: FileText,
      text: 'Raise a Complaint',
      href: '/contact'
    }
  ];

  return (
    <>
      <div style={{ position: 'fixed', zIndex: 1000, ...chatbotPosition }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={chatbotVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-[340px]"
            >
              <Card className="shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>Hello! How can I help?</CardTitle>
                    <CardDescription>Select an option below to get started.</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportOptions.map((option, index) => (
                      <Link href={option.href} key={index} passHref>
                        <Button 
                          variant="outline"
                          className="w-full justify-start h-auto py-3"
                          onClick={() => setIsOpen(false)}
                        >
                          <option.icon className="mr-3 h-5 w-5 text-primary" />
                          <span className='font-semibold'>{option.text}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
          className="flex justify-end mt-4"
        >
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
