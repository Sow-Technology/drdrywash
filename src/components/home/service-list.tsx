import { Shirt, Sparkles, CheckSquare, BedDouble } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

const services = [
  {
    id: 'wash-fold',
    icon: Shirt,
    title: 'Wash & Fold',
    description: 'Expert washing and perfect folding for your everyday wear.',
  },
  {
    id: 'dry-cleaning',
    icon: Sparkles,
    title: 'Dry Cleaning',
    description: 'Specialized care for your delicate and valuable garments.',
  },
  {
    id: 'ironing',
    icon: CheckSquare,
    title: 'Pressing & Ironing',
    description: 'Crisp, wrinkle-free finish for a sharp, professional look.',
  },
  {
    id: 'bedding',
    icon: BedDouble,
    title: 'Bedding & Linens',
    description: 'Fresh and clean duvets, comforters, and bed sheets.',
  },
];

export default function ServiceList() {
  return (
    <section id="services" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a range of professional laundry services to meet all your needs.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const serviceImage = PlaceHolderImages.find(img => img.id === service.id);
            return (
              <Card key={service.id} className="overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                {serviceImage && (
                  <Image
                    src={serviceImage.imageUrl}
                    alt={serviceImage.description}
                    data-ai-hint={serviceImage.imageHint}
                    width={600}
                    height={400}
                    className="object-cover h-48 w-full"
                  />
                )}
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
