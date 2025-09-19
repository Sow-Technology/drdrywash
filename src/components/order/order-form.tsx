'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { CalendarIcon, Check, CreditCard, Minus, Plus, ShoppingCart, Truck, User } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { mensPricing, womensPricing, sareePricing, accessoriesPricing, carpetAndCurtainPricing, washAndFoldPricing } from '@/lib/data';

const serviceSchema = z.object({
  serviceId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const orderSchema = z.object({
  services: z.array(serviceSchema).min(1, 'Please select at least one service.'),
  pickupDate: z.date({ required_error: 'A pickup date is required.' }),
  deliveryDate: z.date({ required_error: 'A delivery date is required.' }),
  address: z.string().min(10, 'Please enter a valid address.'),
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const steps = [
  { id: 'services', title: 'Select Services', icon: ShoppingCart },
  { id: 'schedule', title: 'Schedule & Details', icon: Truck },
  { id: 'payment', title: 'Payment', icon: CreditCard },
  { id: 'confirmation', title: 'Confirmation', icon: Check },
];

const allServices = [
    ...mensPricing.map(p => ({id: p.product, name: p.product, description: `Men's clothing`, price: ''})),
    ...womensPricing.map(p => ({id: p.product, name: p.product, description: `Women's clothing`, price: ''})),
    ...sareePricing.map(p => ({id: p.product, name: p.product, description: 'Saree', price: ''})),
    ...accessoriesPricing.map(p => ({id: p.product, name: p.product, description: 'Accessory', price: ''})),
    ...carpetAndCurtainPricing.map(p => ({id: p.product, name: p.product, description: 'Home Textile', price: ''})),
    ...washAndFoldPricing.map(p => ({id: p.product, name: p.product, description: 'Wash &amp; Fold/Iron', price: ''}))
]

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      services: [],
      address: '',
      name: '',
      email: '',
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'services',
  });

  const processStep = async () => {
    let output;
    if (currentStep === 0) {
      output = await form.trigger('services');
    } else if (currentStep === 1) {
      output = await form.trigger(['pickupDate', 'deliveryDate', 'address', 'name', 'email']);
    } else {
      output = true;
    }

    if (!output) return;

    if (currentStep < steps.length - 1) {
        if (currentStep === steps.length - 2) {
            // Mock payment processing
            toast({
                title: "Payment Successful!",
                description: "Your payment has been processed.",
            });
        }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    const existingServiceIndex = fields.findIndex((field) => field.serviceId === serviceId);
    if (existingServiceIndex > -1) {
      remove(existingServiceIndex);
    } else {
      append({ serviceId, quantity: 1 });
    }
  };

  const handleQuantityChange = (serviceIndex: number, change: number) => {
    const currentQuantity = fields[serviceIndex].quantity;
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      update(serviceIndex, { ...fields[serviceIndex], quantity: newQuantity });
    }
  };
  
  const resetForm = () => {
    form.reset();
    setCurrentStep(0);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                  currentStep > index ? 'bg-primary text-primary-foreground' : 
                  currentStep === index ? 'bg-primary/20 text-primary border-2 border-primary' : 'bg-muted text-muted-foreground'
                )}
              >
                {currentStep > index ? <Check/> : <step.icon className="h-5 w-5" />}
              </div>
              {index < steps.length - 1 && (
                <div className={cn('flex-auto border-t-2 transition-colors mx-2', currentStep > index ? 'border-primary' : 'border-muted')} />
              )}
            </div>
          ))}
        </div>
        <CardTitle className="text-2xl font-headline text-center">{steps[currentStep].title}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allServices.map((service) => {
                      const serviceIndex = fields.findIndex((field) => field.serviceId === service.id);
                      const isSelected = serviceIndex > -1;
                      return (
                        <div key={service.id}>
                          <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors", isSelected && "bg-primary/5")}>
                            <FormControl>
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => handleServiceToggle(service.id)}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none w-full">
                              <FormLabel>{service.name}</FormLabel>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                              {isSelected && (
                                <div className="flex items-center pt-2">
                                    <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(serviceIndex, -1)}><Minus className="h-4 w-4"/></Button>
                                    <Input className="h-6 w-12 text-center mx-2" readOnly value={fields[serviceIndex].quantity} />
                                    <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(serviceIndex, 1)}><Plus className="h-4 w-4"/></Button>
                                </div>
                              )}
                            </div>
                          </FormItem>
                        </div>
                      );
                    })}
                     <FormMessage>{form.formState.errors.services?.message}</FormMessage>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="pickupDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Pickup Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="deliveryDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Delivery Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < (form.getValues("pickupDate") || new Date())}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Pickup/Delivery Address</FormLabel><FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                    <div className="text-center space-y-4">
                        <CreditCard className="mx-auto h-16 w-16 text-primary"/>
                        <p className="text-muted-foreground">This is a mock payment step.</p>
                        <p>In a real application, you would integrate a payment gateway like Stripe here.</p>
                        <p>Click "Confirm Order" to simulate a successful payment.</p>
                    </div>
                )}
                {currentStep === 3 && (
                  <div className="text-center space-y-4 flex flex-col items-center">
                    <Check className="h-16 w-16 text-green-500 bg-green-100 rounded-full p-2"/>
                    <h3 className="text-2xl font-semibold">Thank You for Your Order!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Your order has been placed successfully. You will receive a confirmation email shortly. You can track your order status using your order ID: <span className="font-bold text-primary">DDW{Math.floor(Math.random() * 900) + 100}</span>
                    </p>
                    <Button onClick={resetForm}>Place Another Order</Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button variant="outline" onClick={goToPreviousStep} type="button">
                Previous
              </Button>
            )}
            {currentStep < steps.length - 2 ? (
              <Button onClick={processStep} type="button" className="ml-auto">
                Next
              </Button>
            ) : currentStep === steps.length - 2 ? (
                <Button onClick={processStep} type="button" className="ml-auto">
                    Confirm Order
                </Button>
            ): null }
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
