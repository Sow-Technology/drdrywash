import Link from 'next/link';
import { services } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No hidden fees. Simple, upfront pricing for our premium services.
          </p>
        </div>
        <Card className="mt-16 max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Our Rates</CardTitle>
                <CardDescription>Prices for our most popular services. For detailed pricing, please check during order placement.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[40%]">Service</TableHead>
                        <TableHead>Starting Price</TableHead>
                        <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell className="font-medium flex items-center gap-3">
                                <service.icon className="h-5 w-5 text-muted-foreground" />
                                {service.name}
                            </TableCell>
                            <TableCell>{service.price}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild size="sm" variant="ghost">
                                    <Link href="/order">Order</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
         <div className="mt-12 text-center">
            <Button size="lg" asChild>
                <Link href="/order">
                    Get Started & See Full Price List
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
         </div>
      </div>
    </section>
  );
}
