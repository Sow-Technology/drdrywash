'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generatePromotionalBanner } from '@/ai/flows/generate-promotional-banner';
import type { GeneratePromotionalBannerOutput } from '@/ai/flows/generate-promotional-banner';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const promoSchema = z.object({
  laundryServiceType: z.string().min(1, 'Please select a service type.'),
  discountPercentage: z.coerce.number().min(1, 'Discount must be at least 1%').max(100, 'Discount cannot exceed 100%'),
  targetAudience: z.string().min(3, 'Please specify a target audience.'),
});

type PromoFormValues = z.infer<typeof promoSchema>;

export default function PromoGeneratorForm() {
  const { toast } = useToast();
  const [result, setResult] = useState<GeneratePromotionalBannerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PromoFormValues>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      laundryServiceType: 'wash & fold',
      discountPercentage: 20,
      targetAudience: 'students',
    },
  });

  async function onSubmit(data: PromoFormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generatePromotionalBanner(data);
      setResult(response);
      toast({
        title: 'Banner Generated!',
        description: 'Your new promotional banner is ready.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'There was an error generating the banner. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a Promotion</CardTitle>
          <CardDescription>Fill in the details to generate a unique promotional banner with AI.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="laundryServiceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laundry Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wash & fold">Wash & Fold</SelectItem>
                        <SelectItem value="dry cleaning">Dry Cleaning</SelectItem>
                        <SelectItem value="ironing">Ironing</SelectItem>
                        <SelectItem value="bedding">Bedding</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., busy professionals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Generating...' : 'Generate Banner'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardContent className="p-6 w-full h-full flex flex-col items-center justify-center">
          {isLoading && (
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Generating your banner...</p>
            </div>
          )}
          {!isLoading && !result && (
            <div className="text-center text-muted-foreground">
                <p>Your generated banner will appear here.</p>
            </div>
          )}
          {result && (
            <div className="space-y-4 text-center w-full">
                <h3 className="text-xl font-semibold">Generated Banner</h3>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                    <Image src={result.imageUrl} alt="Generated promotional banner" layout="fill" objectFit="cover" />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-left mb-2">Banner Text:</h4>
                    <p className="text-muted-foreground text-left">"{result.bannerText}"</p>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
