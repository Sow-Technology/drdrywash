import { mensPricing, womensPricing, sareePricing } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PricingTable = ({ title, data, headers }: { title: string, data: any[], headers: string[] }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.product}</TableCell>
                            {Object.keys(item.prices).map(key => (
                                <TableCell key={key}>{item.prices[key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Transparent Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No hidden fees. Simple, upfront pricing for our premium services.
            <br />
            <span className='text-sm'>*Please note that the prices above are exclusive of GST</span>
          </p>
        </div>
        <Tabs defaultValue="men" className="mt-16 max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="men">Men</TabsTrigger>
                <TabsTrigger value="women">Women</TabsTrigger>
                <TabsTrigger value="saree">Saree</TabsTrigger>
            </TabsList>
            <TabsContent value="men">
                 <PricingTable title="Men's Pricing" data={mensPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Premium Steam Press", "Luxe Service"]} />
            </TabsContent>
            <TabsContent value="women">
                <PricingTable title="Women's Pricing" data={womensPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Premium Steam Press", "Luxe Service"]} />
            </TabsContent>
            <TabsContent value="saree">
                <PricingTable title="Saree Pricing" data={sareePricing} headers={["Product", "Roll press", "Polish - Extra", "Dry Clean", "Starch - Extra"]} />
            </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
