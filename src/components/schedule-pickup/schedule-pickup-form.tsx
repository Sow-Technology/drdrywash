'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const scheduleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  address: z.string().min(10, 'Please enter a valid address.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  pickupDate: z.date({
    required_error: 'A pickup date is required.',
  }),
  pickupTime: z.string({
    required_error: 'A pickup time is required.',
  }),
  specialInstructions: z.string().optional(),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export default function SchedulePickupForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      specialInstructions: '',
    },
  });

  async function onSubmit(data: ScheduleFormValues) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: 'Pickup Scheduled!',
            description: `Thanks, ${data.name}! We'll see you on ${format(data.pickupDate, 'PPP')} around ${data.pickupTime}.`,
        });
        form.reset();
    }, 1500);
  }
  
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i;
    return [`${hour}:00`, `${hour}:30`];
  }).flat();
  timeSlots.pop(); // Remove 18:30

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
        <CardDescription>Let us know where and when to pick up your laundry.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 555-5555" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
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
                          disabled={(date) =>
                            date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 30))
                          }
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
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>{`${time} - ${parseInt(time.split(':')[0]) + 1}:${time.split(':')[1]}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                        <Textarea placeholder="e.g., Please ring the doorbell. Clothes are in the blue bag." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Scheduling...' : 'Confirm Pickup'}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
