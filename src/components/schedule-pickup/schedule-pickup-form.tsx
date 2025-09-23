'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, MapPin, LocateFixed } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

const scheduleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  address: z.string().min(10, 'Please enter a valid address.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  pickupDate: z.date({
    required_error: 'A pickup date is required.',
  }),
  pickupTime: z.string({
    required_error: 'A pickup time is required.',
  }),
  specialInstructions: z.string().optional(),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

// Surat, Gujarat, India
const defaultCenter = {
  lat: 21.1702,
  lng: 72.8311,
};

const MapPlaceholder = () => (
  <div className="w-full h-[300px] rounded-md bg-muted flex flex-col items-center justify-center">
    <MapPin className="w-10 h-10 text-muted-foreground mb-2" />
    <p className="text-muted-foreground">Loading map...</p>
    <Skeleton className="w-full h-full" />
  </div>
);

export default function SchedulePickupForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      location: defaultCenter,
      specialInstructions: '',
    },
  });
  
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleMarkerDrag = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarkerPosition(newPos);
      form.setValue('location', newPos);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(newPos);
          setMapCenter(newPos);
          form.setValue('location', newPos);
          mapRef.current?.panTo(newPos);
        },
        () => {
          toast({
            variant: 'destructive',
            title: 'Location Error',
            description: 'Could not get your current location. Please enable location services.',
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Location Error',
        description: 'Geolocation is not supported by this browser.',
      });
    }
  };
  
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
        setMarkerPosition(defaultCenter);
        setMapCenter(defaultCenter);
    }, 1500);
  }
  
  const timeSlots = Array.from({ length: 7 }, (_, i) => {
    const hour = 11 + i;
    return [`${hour}:00`, `${hour}:30`];
  }).flat();
  timeSlots.push("18:00");

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
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <FormLabel>Pickup Location</FormLabel>
                      <FormDescription>Drag the pin to your exact pickup location.</FormDescription>
                    </div>
                     <Button type="button" variant="outline" size="sm" onClick={handleCurrentLocation}>
                      <LocateFixed className="mr-2 h-4 w-4" />
                      Use Current Location
                    </Button>
                  </div>
                  <FormControl>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '300px', borderRadius: 'var(--radius)' }}
                        center={mapCenter}
                        zoom={12}
                        onLoad={handleMapLoad}
                      >
                        <Marker
                          position={markerPosition}
                          draggable={true}
                          onDragEnd={handleMarkerDrag}
                        />
                      </GoogleMap>
                    ) : (
                      <MapPlaceholder />
                    )}
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
                            date < new Date(new Date().setHours(0, 0, 0, 0)) || date > new Date(new Date().setDate(new Date().getDate() + 30))
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
                            {timeSlots.map(time => {
                              const [hour, minute] = time.split(':');
                              const nextHour = (parseInt(hour) + 1).toString().padStart(2,'0');

                              return (
                                <SelectItem key={time} value={time}>{`${time} - ${minute === '00' ? `${hour}:30` : `${nextHour}:00`}`}</SelectItem>
                              )
                            })}
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
            <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" asChild className="w-full">
                    <Link href="/pricing">Check Prices</Link>
                </Button>
                <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Scheduling...' : 'Confirm Pickup'}
                </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
