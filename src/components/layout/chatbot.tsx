'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Calendar,
  Search,
  FileText,
  ArrowRight,
  User,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type ChatStep =
  | 'greeting'
  | 'userInfo'
  | 'options'
  | 'scheduleInfo'
  | 'trackInfo';

const chatbotVariants = {
  closed: { opacity: 0, y: 20, scale: 0.95 },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>('greeting');
  const [name, setName] = useState('');
  const [tempName, setTempName] = useState('');

  const isMobile = useIsMobile();
  const chatbotPosition = isMobile
    ? { bottom: '5.5rem', right: '1rem' }
    : { bottom: '2rem', right: '2rem' };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && step === 'userInfo' && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Small delay for animation
    }
  }, [isOpen, step]);

  const supportOptions = [
    {
      icon: Calendar,
      text: 'Schedule a Pickup',
      action: () => setStep('scheduleInfo'),
      isLink: false,
    },
    {
      icon: Search,
      text: 'Track an Order',
      action: () => setStep('trackInfo'),
      isLink: false,
    },
    {
      icon: FileText,
      text: 'Raise a Complaint',
      href: '/contact',
      isLink: true,
    },
  ];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setName(tempName.trim());
      setStep('options');
    }
  };

  const resetChat = () => {
    setStep('greeting');
    setName('');
    setTempName('');
  };

  const handleToggle = () => {
    if (isOpen) {
      resetChat();
    }
    setIsOpen(!isOpen);
  };

  const ChatGreeting = () => (
    <motion.div
      key="greeting"
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <p className="text-muted-foreground mb-4">
        Hello! I'm Lax, your personal assistant.
      </p>
      <Button onClick={() => setStep('userInfo')}>
        Let's Get Started <ArrowRight className="ml-2" />
      </Button>
    </motion.div>
  );

  const ChatUserInfo = () => (
    <motion.div
      key="userInfo"
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <p className="text-muted-foreground mb-4">What should I call you?</p>
      <form onSubmit={handleNameSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your name..."
            className="pl-9"
          />
        </div>
        <Button type="submit" size="icon" aria-label="Submit name">
          <ArrowRight />
        </Button>
      </form>
    </motion.div>
  );

  const ChatOptions = () => (
    <motion.div
      key="options"
      variants={messageVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-muted-foreground mb-4 text-center">
        Hi {name}! How can I help you today?
      </p>
      <div className="space-y-3">
        {supportOptions.map((option, index) =>
          option.isLink ? (
            <Link href={option.href!} key={index} passHref>
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => setIsOpen(false)}
              >
                <option.icon className="mr-3 h-5 w-5 text-primary" />
                <span className="font-semibold">{option.text}</span>
              </Button>
            </Link>
          ) : (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto py-3"
              onClick={option.action}
            >
              <option.icon className="mr-3 h-5 w-5 text-primary" />
              <span className="font-semibold">{option.text}</span>
            </Button>
          )
        )}
      </div>
    </motion.div>
  );

  const ChatResponse = ({
    text,
    buttonText,
    href,
  }: {
    text: string;
    buttonText: string;
    href: string;
  }) => (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex items-start gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setStep('options')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <p className="text-muted-foreground pt-1">{text}</p>
      </div>
      <Link href={href} passHref>
        <Button className="w-full" onClick={() => setIsOpen(false)}>
          {buttonText}
        </Button>
      </Link>
    </motion.div>
  );

  const handleClose = () => {
    setIsOpen(false);
    resetChat();
  };

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
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src="https://picsum.photos/seed/lax/100/100"
                        data-ai-hint="friendly robot"
                      />
                      <AvatarFallback>LX</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Lax at your service!</CardTitle>
                      <CardDescription>Your friendly assistant</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-8 w-8 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="min-h-[180px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {step === 'greeting' && <ChatGreeting />}
                    {step === 'userInfo' && <ChatUserInfo />}
                    {step === 'options' && <ChatOptions />}
                    {step === 'scheduleInfo' && (
                      <ChatResponse
                        text="You can schedule a pickup by filling out the form on our scheduling page. It's quick and easy!"
                        buttonText="Go to Schedule Page"
                        href="/schedule-pickup"
                      />
                    )}
                    {step === 'trackInfo' && (
                      <ChatResponse
                        text="To track your order, just enter your Order ID or phone number on the tracking page."
                        buttonText="Go to Tracking Page"
                        href="/track-order"
                      />
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
          className="flex justify-end mt-4"
        >
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg"
            onClick={handleToggle}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
