'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Download,
  Phone,
  Apple,
  AppWindow,
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
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { mockOrders } from '@/lib/data';
import { format } from 'date-fns';
import Link from 'next/link';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  options?: { text: string; action: () => void; isLink?: boolean, href?: string, disabled?: boolean }[];
  order?: (typeof mockOrders)[0];
};

type ConversationStage =
  | 'greeting'
  | 'askName'
  | 'askPhone'
  | 'mainOptions'
  | 'complaint_askIssue'
  | 'complaint_confirm';

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

const fabVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
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
    action: 'raiseComplaint',
  },
  {
    text: 'Track my Ticket Status',
    action: 'trackTicket',
  },
];


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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<ConversationStage>('greeting');
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [complaintRaised, setComplaintRaised] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const addMessage = (sender: 'bot' | 'user', text?: string, options?: Message['options'], order?: Message['order']) => {
    const newMessage: Message = { id: Date.now().toString(), sender, text, options, order };
    setMessages(prev => [...prev, newMessage]);
  };

  const startChat = () => {
     setIsOpen(true);
     setIsFabOpen(false);
     setMessages([]);
     setStage('greeting');
     setUserName('');
     setInputValue('');
     setComplaintRaised(false);
     setTimeout(() => {
        addMessage('bot', "Hello! I'm Lax, your personal assistant.");
        setStage('askName');
     }, 300);
     setTimeout(() => addMessage('bot', "What's your name?"), 800);
  };
  
  const getMainOptions = () => {
    const availableOptions = complaintRaised
      ? supportOptions.filter(opt => opt.action !== 'raiseComplaint')
      : supportOptions.filter(opt => opt.action !== 'trackTicket');

    return availableOptions.map(opt => ({
      text: opt.text,
      action: () => handleOptionClick(opt.action, undefined, opt.text),
      disabled: opt.action === 'trackTicket', // Temporarily disable until feature is ready
    }));
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
            case 'raiseComplaint':
                setStage('complaint_askIssue');
                addMessage('bot', "I'm very sorry to hear that you have an issue. Please describe what happened, and I'll create a support ticket for you.");
                break;
            case 'trackTicket':
                addMessage('bot', "The ticket tracking feature is coming soon! Our team will reach out to you via email or phone for any updates.");
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
    const currentInput = inputValue;
    setInputValue('');

    if (stage === 'askName') {
        setUserName(currentInput);
        setTimeout(() => addMessage('bot', `Nice to meet you, ${currentInput}!`), 500);
        setTimeout(() => addMessage('bot', `What's your phone number? (Optional)`), 1000);
        setStage('askPhone');
    } else if (stage === 'askPhone') {
        const userPhone = currentInput.replace(/[^\d]/g, '');
        const userOrders = mockOrders.filter(o => o.phoneNumber.replace(/[^\d]/g, '') === userPhone);

        if (userOrders.length > 0) {
            setTimeout(() => addMessage('bot', "Thanks! Here's what I found for your number:"), 500);
            userOrders.forEach((order, index) => {
                setTimeout(() => addMessage('bot', undefined, undefined, order), 500 + (index * 200));
            });
            setTimeout(() => addMessage('bot', `Is there anything else I can help with, ${userName}?`, getMainOptions()), 1000 + (userOrders.length * 200));
        } else {
            setTimeout(() => addMessage('bot', "I couldn't find any orders for that number."), 500);
            setTimeout(() => {
                addMessage('bot', `How can I help you today, ${userName}?`, getMainOptions());
            }, 1000);
        }
        setStage('mainOptions');
    } else if (stage === 'complaint_askIssue') {
        const ticketId = `TICKET-${Date.now().toString().slice(-6)}`;
        setComplaintRaised(true);
        setTimeout(() => addMessage('bot', `Thank you for sharing, and I sincerely apologize for the inconvenience. I've created a ticket for you with the ID: ${ticketId}.`), 500);
        setTimeout(() => addMessage('bot', "I'm escalating this to our support team. They will get in touch with you shortly."), 1500);
        setTimeout(() => {
            addMessage('bot', `Is there anything else I can help with, ${userName}?`, getMainOptions());
        }, 2500);
        setStage('mainOptions');
    }
  }

  const handleSkipPhone = () => {
    addMessage('user', "Skip");
    setTimeout(() => {
        addMessage('bot', `No problem. How can I help you today, ${userName}?`, getMainOptions());
    }, 500);
    setStage('mainOptions');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-4 md:bottom-8 md:right-8 z-50">
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
                           <div className={cn("max-w-[85%] rounded-lg px-3 py-2", { 'bg-primary text-primary-foreground': msg.sender === 'user', 'bg-muted': msg.sender === 'bot' })}>
                                {msg.text && <p className="text-sm">{msg.text}</p>}
                                {msg.order && (
                                    <div className='text-sm space-y-2'>
                                        <p>
                                            Your order <span className='font-bold'>#{msg.order.id}</span> is currently <span className='font-bold'>{msg.order.status}</span>.
                                            {msg.order.status === 'Delivered' && ` on ${format(msg.order.deliveryTime, 'PPP')}`}
                                        </p>
                                        <div className='flex gap-2 mt-2'>
                                            <Button variant="outline" size="sm" className="bg-background h-auto py-1">
                                                <Download className="mr-2 h-3 w-3"/>
                                                Invoice
                                            </Button>
                                            <Button variant="outline" size="sm" className="bg-background h-auto py-1" onClick={() => handleOptionClick('raiseComplaint', undefined, 'Raise Complaint')} disabled={complaintRaised}>
                                                Raise Complaint
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {msg.options && (
                                    <div className="flex flex-col gap-2 mt-2">
                                        {msg.options.map((opt, i) => (
                                            <Button key={i} variant="outline" size="sm" className="bg-background" onClick={opt.action} disabled={opt.disabled}>
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
                    {(stage === 'askName' || stage === 'askPhone' || stage === 'complaint_askIssue') ? (
                        <form onSubmit={handleUserInput} className="w-full flex items-center gap-2">
                            <Input 
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder={
                                    stage === 'askName' ? 'Your name...' :
                                    stage === 'askPhone' ? 'Your phone number...' :
                                    'Describe your issue...'
                                }
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
                        <div className="w-full flex justify-center">
                            <Button variant="link" size="sm" onClick={startChat}>
                                Chat with LAX AI
                            </Button>
                        </div>
                    )}
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex flex-col items-end gap-3">
             <Button
                size="lg"
                className="rounded-full h-14 shadow-lg !bg-[#25D366] hover:!bg-[#1DAE51] text-white"
                aria-label="Chat on WhatsApp"
                asChild
            >
                <Link href="https://wa.me/919738045714" target="_blank" className='gap-2'>
                    <WhatsAppIcon className="h-7 w-7" />
                    <span className='text-lg font-semibold'>Whatsapp Us</span>
                </Link>
            </Button>
             <div className='flex gap-2'>
                 <Button
                    size="icon"
                    className="rounded-full w-12 h-12 shadow-lg !bg-red-500 hover:!bg-red-600 text-white"
                    aria-label="Call Us"
                    asChild
                >
                    <Link href="tel:+919738045714">
                        <Phone className="h-6 w-6" />
                    </Link>
                </Button>
                 <Button
                    size="icon"
                    className="rounded-full w-12 h-12 shadow-lg !bg-blue-500 hover:!bg-blue-600 text-white"
                    aria-label="Get our App"
                >
                     <Download className="h-6 w-6" />
                </Button>
             </div>
        </div>
      </div>
    </>
  );
}

    