'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const trackOrderSchema = z.object({
  orderId: z.string().min(3, 'Please enter a valid Order ID.'),
});

type TrackOrderFormValues = z.infer<typeof trackOrderSchema>;

export default function TrackOrderForm() {
  const router = useRouter();
  const form = useForm<TrackOrderFormValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderId: '',
    },
  });

  function onSubmit(data: TrackOrderFormValues) {
    router.push(`/track-order/${data.orderId.toUpperCase()}`);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
        <CardDescription>Enter your order ID to see the latest status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., DDW123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Track Order
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
