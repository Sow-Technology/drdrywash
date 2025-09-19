import Image from 'next/image';
import { services } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServiceList() {
  return (
    <section id="services" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a range of professional services to meet all your laundry needs.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  data-ai-hint={service.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <service.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline">{service.name}</CardTitle>
                </div>
                <CardDescription className="pt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="font-semibold">{service.price}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                  <Link href="/order">Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
