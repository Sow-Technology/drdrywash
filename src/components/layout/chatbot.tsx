'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  Mic
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
import { billingAssistant } from '@/ai/flows/billing-assistant-flow';
import type { Conversation } from '@/ai/flows/billing-assistant-types';
import { useRouter } from 'next/navigation';

type ChatbotProps = {
    isOpen: boolean;
    onClose: () => void;
    startListening?: () => void;
};

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

export default function Chatbot({ isOpen, onClose, startListening }: ChatbotProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Conversation>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startChat = () => {
    const initialMessage = { role: 'model' as const, content: [{ text: "Hello! I'm Lax, your personal AI assistant. How can I help you today?" }]};
    setMessages([initialMessage]);
    setInputValue('');
  };
  
  useEffect(() => {
    if (isOpen) {
      startChat();
    }
  }, [isOpen]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleUserInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userInput = inputValue;
    const currentMessages: Conversation = [...messages, { role: 'user', content: [{ text: userInput }] }];
    setMessages(currentMessages);
    setInputValue('');
    setIsProcessing(true);

    try {
      const rawResponse = await billingAssistant(currentMessages);
      const response = JSON.parse(rawResponse);
      
      let responseText = '';
      if(response.content) {
        for (const part of response.content) {
          if (part.text) {
            responseText += part.text;
          }
          if (part.toolRequest) {
            const { name, input } = part.toolRequest;
            if (name === 'navigateTo') {
              router.push(input.path);
              onClose(); // Close chatbot on navigation
            }
             if (name === 'calculateBill') {
                const { subtotal, gst, total } = response.toolRequest.output;
                const toolResponseText = `The total amount is ₹${total}, which includes a subtotal of ₹${subtotal} and GST of ₹${gst}. Anything else I can help with?`;
                responseText += toolResponseText;
             }
          }
        }
      } else if (response.text) {
        responseText = response.text;
      }
      
      setMessages(prev => [...prev, { role: 'model', content: [{ text: responseText }] }]);

    } catch (error) {
        console.error("AI flow error:", error);
        setMessages(prev => [...prev, { role: 'model', content: [{ text: "Sorry, I encountered an error. Please try again." }] }]);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-8 z-50">
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
                      <CardTitle>Lax</CardTitle>
                      <CardDescription>Your AI Assistant</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", { 'justify-end': msg.role === 'user' })}>
                           {msg.role === 'model' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://picsum.photos/seed/lax/100/100" />
                                    <AvatarFallback>LX</AvatarFallback>
                                </Avatar>
                           )}
                           <div className={cn("max-w-[85%] rounded-lg px-3 py-2 text-sm", { 'bg-primary text-primary-foreground': msg.role === 'user', 'bg-muted': msg.role === 'model' })}>
                                {msg.content[0].text && <p>{msg.content[0].text}</p>}
                           </div>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="flex items-end gap-2">
                           <Avatar className="h-8 w-8">
                                <AvatarImage src="https://picsum.photos/seed/lax/100/100" />
                                <AvatarFallback>LX</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Thinking...</span>
                            </div>
                        </div>
                    )}
                  <div ref={messagesEndRef} />
                </CardContent>
                <CardFooter className="p-2 border-t">
                    <form onSubmit={handleUserInput} className="w-full flex items-center gap-2">
                        <Input 
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder="Ask Lax anything..."
                            className="flex-1"
                            disabled={isProcessing}
                            autoFocus
                        />
                        <Button type="submit" size="icon" aria-label="Send" disabled={isProcessing}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
