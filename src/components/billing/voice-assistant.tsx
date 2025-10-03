'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Mic, MicOff, Send, X, Languages, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { billingAssistant, type Conversation } from '@/ai/flows/billing-assistant-flow';

const fabVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const assistantVariants = {
  closed: { opacity: 0, y: 50, scale: 0.95 },
  open: { opacity: 1, y: 0, scale: 1 },
};

const supportedLanguages = [
    { code: 'en-US', name: 'English' },
    { code: 'hi-IN', name: 'हिंदी (Hindi)' },
    { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
]

export default function BillingVoiceAssistant() {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [history, setHistory] = React.useState<Conversation>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(supportedLanguages[0].code);
  
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const { register, handleSubmit, watch, setValue, reset } = useForm<{ prompt: string }>({
    defaultValues: { prompt: '' },
  });
  const promptValue = watch('prompt');

  const playAudio = async (text: string) => {
    if (isMuted || !text) return;
    try {
        const { audio } = await textToSpeech({ text });
        if (audioRef.current) {
            audioRef.current.src = audio;
            audioRef.current.play();
        }
    } catch (error) {
        console.error("Failed to play audio:", error);
        toast({
            variant: "destructive",
            title: "Audio Error",
            description: "Could not play the assistant's voice.",
        });
    }
  };

  const setupRecognition = React.useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Browser Not Supported',
        description: 'Speech recognition is not supported by your browser.',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
        setIsListening(false);
        // Restart listening if the assistant is open
        if (isOpen) {
          try {
            recognition.start();
          } catch (e) {
            // May fail if already started
          }
        }
    };
    recognition.onerror = (event) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
          console.error('Speech recognition error:', event.error);
          toast({
            variant: 'destructive',
            title: 'Voice Error',
            description: `Speech recognition error: ${event.error}`,
          });
      }
    };

    let finalTranscript = '';
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      const transcript = finalTranscript || interimTranscript;

      if (!isOpen && transcript.toLowerCase().includes('hey hello')) {
        handleOpen(true);
        finalTranscript = ''; // Reset after activation
      }

      if (isOpen && finalTranscript) {
         setValue('prompt', finalTranscript);
         handleSubmit(onSubmit)(); // Automatically submit
         finalTranscript = ''; // Reset for next command
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [selectedLang, isOpen, setValue, handleSubmit, toast]);


  React.useEffect(() => {
    setupRecognition();
    return () => {
      recognitionRef.current?.stop();
    };
  }, [setupRecognition]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  React.useEffect(scrollToBottom, [history]);

  const addMessage = (role: 'user' | 'model', text: string) => {
    setHistory((prev) => [...prev, { role, content: [{ text }] }]);
  };
  
  const handleOpen = (fromVoice = false) => {
    setIsOpen(true);
    const initialPrompt = fromVoice ? "Hi, how can I help?" : "Hello! I'm your billing assistant. How can I help you?";
    setHistory([{ role: 'model', content: [{ text: initialPrompt }] }]);
    playAudio(initialPrompt);
  };

  const handleClose = () => {
    setIsOpen(false);
    setHistory([]);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  };
  
  const onSubmit = async (data: { prompt: string }) => {
    if (isProcessing || !data.prompt.trim()) return;

    setIsProcessing(true);
    const newUserHistory: Conversation = [...history, { role: 'user', content: [{ text: data.prompt }] }];
    setHistory(newUserHistory);
    reset();

    try {
      const rawResponse = await billingAssistant(newUserHistory);
      const response = JSON.parse(rawResponse);

      let responseText = '';
      let toolCalled = false;

      for (const part of response.content) {
        if (part.text) {
          responseText += part.text;
        }
        if (part.toolRequest) {
          toolCalled = true;
          const { name, input } = part.toolRequest;
          if (name === 'navigateTo') {
            router.push(input.path);
            const toolResponseText = `Navigating you to ${input.path.replace('/', ' ')}.`;
            responseText += toolResponseText;
          }
        }
      }
      
      addMessage('model', responseText);
      playAudio(responseText);

    } catch (error) {
      console.error("AI flow error:", error);
      const errorMsg = "Sorry, I encountered an error. Please try again.";
      addMessage('model', errorMsg);
      playAudio(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  return (
    <>
      <audio ref={audioRef} hidden />
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
                onClick={() => handleOpen()}
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
                    <CardDescription>
                      {isListening ? "Listening..." : "Ready for your command"}
                    </CardDescription>
                  </div>
                </div>
                <div className='flex items-center'>
                    <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="h-8 w-8">
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Languages className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {supportedLanguages.map(lang => (
                                <DropdownMenuItem key={lang.code} onSelect={() => setSelectedLang(lang.code)}>
                                    {lang.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {history.map((msg, index) => (
                  <div key={index} className={cn('flex items-end gap-2', { 'justify-end': msg.role === 'user' })}>
                    {msg.role === 'model' && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/seed/billing-ai/100/100" />
                        <AvatarFallback>BA</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn('max-w-[85%] rounded-lg px-3 py-2 text-sm', {
                        'bg-primary text-primary-foreground': msg.role === 'user',
                        'bg-muted': msg.role === 'model',
                      })}>
                      <p>{msg.content[0].text}</p>
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
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
                      <div className="relative flex-1">
                          <Input
                              placeholder="e.g., Go to orders"
                              autoComplete='off'
                              {...register('prompt')}
                              disabled={isProcessing}
                              className="pr-10"
                          />
                          <Button 
                              type='button' 
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                              onClick={toggleListening}
                          >
                              {isListening ? <Mic className="h-4 w-4 text-primary" /> : <MicOff className="h-4 w-4 text-muted-foreground" />}
                          </Button>
                      </div>
                      <Button type="submit" size="icon" aria-label="Send Command" disabled={isProcessing}>
                          <Send className="h-4 w-4" />
                      </Button>
                  </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
