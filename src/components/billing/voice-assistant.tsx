'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Mic, MicOff, Send, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

const fabVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const assistantVariants = {
  closed: { opacity: 0, y: 50, scale: 0.95 },
  open: { opacity: 1, y: 0, scale: 1 },
};

const formSchema = z.object({
  prompt: z.string().min(1, 'Please enter a command.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function BillingVoiceAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: '' },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(scrollToBottom, [messages]);

  const addMessage = (sender: 'user' | 'bot', text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender, text }]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setMessages([
      {
        id: 'init',
        sender: 'bot',
        text: "Hello! I'm your billing assistant. How can I help you? Try 'Add a new bill' or 'Go to dashboard'.",
      },
    ]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
  };

  const processCommand = (command: string) => {
    setIsProcessing(true);
    addMessage('user', command);

    setTimeout(() => {
      let response = "Sorry, I didn't understand that command.";
      const lowerCaseCommand = command.toLowerCase();

      if (lowerCaseCommand.includes('add') && (lowerCaseCommand.includes('bill') || lowerCaseCommand.includes('invoice'))) {
        response = "Okay, taking you to the 'Add Bill' page now.";
        router.push('/billing/add-bill');
      } else if (lowerCaseCommand.includes('dashboard')) {
        response = 'Navigating to the dashboard.';
        router.push('/billing/dashboard');
      } else if (lowerCaseCommand.includes('order')) {
        response = 'Heading to the orders page.';
        router.push('/billing/orders');
      } else if (lowerCaseCommand.includes('user')) {
        response = 'Opening user management.';
        router.push('/billing/user');
      } else if (lowerCaseCommand.includes('branch')) {
        response = 'Opening branch management.';
        router.push('/billing/branch');
      }

      addMessage('bot', response);
      setIsProcessing(false);
      form.reset();
    }, 1000);
  };
  
  const onSubmit = (data: FormValues) => {
    processCommand(data.prompt);
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
                layoutId="voice-assistant-fab"
                variants={fabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
              <Button
                size="icon"
                className="rounded-full w-16 h-16 shadow-lg"
                onClick={handleOpen}
                aria-label="Open Voice Assistant"
              >
                <Mic className="h-7 w-7" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-50 w-[360px]"
            variants={assistantVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Card className="shadow-2xl h-[500px] flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/billing-ai/100/100" data-ai-hint="robot assistant" />
                    <AvatarFallback>BA</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Billing Assistant</CardTitle>
                    <CardDescription>Ready for your command</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn('flex items-end gap-2', { 'justify-end': msg.sender === 'user' })}>
                    {msg.sender === 'bot' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/billing-ai/100/100" />
                        <AvatarFallback>BA</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn('max-w-[85%] rounded-lg px-3 py-2 text-sm', {
                        'bg-primary text-primary-foreground': msg.sender === 'user',
                        'bg-muted': msg.sender === 'bot',
                      })}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                    <div className="flex items-end gap-2">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src="https://picsum.photos/seed/billing-ai/100/100" />
                            <AvatarFallback>BA</AvatarFallback>
                        </Avatar>
                        <div className="max-w-[85%] rounded-lg px-3 py-2 bg-muted flex items-center gap-2">
                           <Loader2 className="h-4 w-4 animate-spin" />
                           <span className='text-sm text-muted-foreground'>Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-2 border-t">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Go to orders"
                                            autoComplete='off'
                                            {...field}
                                            disabled={isProcessing}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="icon" aria-label="Send Command" disabled={isProcessing}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </Form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
