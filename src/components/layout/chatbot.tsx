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
  User,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  options?: { text: string; action: () => void; isLink?: boolean, href?: string }[];
};

type ConversationStage = 'greeting' | 'askName' | 'askPhone' | 'mainOptions';

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

const supportOptions = [
  {
    text: 'Schedule a Pickup',
    action: 'scheduleInfo',
  },
  {
    text: 'Track an Order',
    action: 'trackInfo',
  },
  {
    text: 'Raise a Complaint',
    isLink: true,
    href: '/contact',
  },
];


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<ConversationStage>('greeting');
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatbotPosition = isMobile
    ? { bottom: '5.5rem', right: '1rem' }
    : { bottom: '2rem', right: '2rem' };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const addMessage = (sender: 'bot' | 'user', text?: string, options?: Message['options']) => {
    const newMessage: Message = { id: Date.now().toString(), sender, text, options };
    setMessages(prev => [...prev, newMessage]);
  };

  const startChat = () => {
     setMessages([]);
     setStage('greeting');
     setUserName('');
     setInputValue('');
     setTimeout(() => {
        addMessage('bot', "Hello! I'm Lax, your personal assistant.");
        setStage('askName');
     }, 300);
     setTimeout(() => addMessage('bot', "What's your name?"), 800);
  };
  
  const handleOptionClick = (action?: string, href?: string, text?: string) => {
    if (text) {
        addMessage('user', text);
    }
    
    setTimeout(() => {
        if (href) {
            window.location.href = href;
            return;
        }

        switch (action) {
            case 'scheduleInfo':
                addMessage('bot', "You can schedule a pickup by filling out the form on our scheduling page. It's quick and easy!", [
                    { text: 'Go to Schedule Page', action: () => { window.location.href = "/schedule-pickup" } }
                ]);
                break;
            case 'trackInfo':
                addMessage('bot', "To track your order, just enter your Order ID or phone number on the tracking page.", [
                    { text: 'Go to Tracking Page', action: () => { window.location.href = "/track-order" } }
                ]);
                break;
            default:
                break;
        }
    }, 500);

  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);

    if (stage === 'askName') {
        setUserName(inputValue);
        setTimeout(() => addMessage('bot', `Nice to meet you, ${inputValue}!`), 500);
        setTimeout(() => addMessage('bot', `What's your phone number? (Optional)`), 1000);
        setStage('askPhone');
    } else if (stage === 'askPhone') {
        // Here you could save the phone number
        setTimeout(() => addMessage('bot', "Thanks!"), 500);
        setTimeout(() => {
            addMessage('bot', `How can I help you today, ${userName}?`, supportOptions.map(opt => ({
                ...opt,
                action: () => handleOptionClick(opt.action, opt.href, opt.text),
            })))
        }, 1000);
        setStage('mainOptions');
    }

    setInputValue('');
  }

  const handleSkipPhone = () => {
    addMessage('user', "Skip");
    setTimeout(() => {
        addMessage('bot', `No problem. How can I help you today, ${userName}?`, supportOptions.map(opt => ({
            ...opt,
            action: () => handleOptionClick(opt.action, opt.href, opt.text),
        })))
    }, 500);
    setStage('mainOptions');
  };

  const handleToggle = () => {
    const nextIsOpen = !isOpen;
    if (nextIsOpen) {
      startChat();
    }
    setIsOpen(nextIsOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
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
              <Card className="shadow-2xl h-[500px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
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
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex items-end gap-2", { 'justify-end': msg.sender === 'user' })}>
                           {msg.sender === 'bot' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://picsum.photos/seed/lax/100/100" />
                                    <AvatarFallback>LX</AvatarFallback>
                                </Avatar>
                           )}
                           <div className={cn("max-w-[75%] rounded-lg px-3 py-2", { 'bg-primary text-primary-foreground': msg.sender === 'user', 'bg-muted': msg.sender === 'bot' })}>
                                {msg.text && <p className="text-sm">{msg.text}</p>}
                                {msg.options && (
                                    <div className="flex flex-col gap-2 mt-2">
                                        {msg.options.map((opt, i) => (
                                            <Button key={i} variant="outline" size="sm" className="bg-background" onClick={opt.action}>
                                                {opt.text}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                           </div>
                        </div>
                    ))}
                  <div ref={messagesEndRef} />
                </CardContent>
                <CardFooter className="p-2 border-t">
                    {(stage === 'askName' || stage === 'askPhone') ? (
                        <form onSubmit={handleUserInput} className="w-full flex items-center gap-2">
                            <Input 
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder={stage === 'askName' ? 'Your name...' : 'Your phone number...'}
                                className="flex-1"
                                autoFocus
                            />
                            <Button type="submit" size="icon" aria-label="Send">
                                <Send className="h-4 w-4" />
                            </Button>
                            {stage === 'askPhone' && (
                                <Button type="button" variant="ghost" onClick={handleSkipPhone}>Skip</Button>
                            )}
                        </form>
                    ) : (
                        <p className="text-center text-xs text-muted-foreground w-full">
                            Chat by Dr. Dry Wash
                        </p>
                    )}
                </CardFooter>
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
