'use client';

import { mensPricing, womensPricing, sareePricing, accessoriesPricing, carpetAndCurtainPricing, washAndFoldPricing } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

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

const SimplePricingTable = ({ title, data }: { title: string, data: { product: string, price: string }[] }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
};


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
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="men">Men</TabsTrigger>
                <TabsTrigger value="women">Women</TabsTrigger>
                <TabsTrigger value="saree">Saree</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
                <TabsTrigger value="carpet-curtain">Carpet &amp; Curtain</TabsTrigger>
                <TabsTrigger value="wash-fold">Wash &amp; Fold/Iron</TabsTrigger>
            </TabsList>
            <TabsContent value="men" asChild>
                <motion.div {...motionProps}>
                    <PricingTable title="Men's Pricing" data={mensPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Premium Steam Press", "Luxe Service"]} />
                </motion.div>
            </TabsContent>
            <TabsContent value="women" asChild>
                <motion.div {...motionProps}>
                    <PricingTable title="Women's Pricing" data={womensPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Premium Steam Press", "Luxe Service"]} />
                </motion.div>
            </TabsContent>
            <TabsContent value="saree" asChild>
                <motion.div {...motionProps}>
                    <PricingTable title="Saree Pricing" data={sareePricing} headers={["Product", "Roll press", "Polish - Extra", "Dry Clean", "Starch - Extra"]} />
                </motion.div>
            </TabsContent>
            <TabsContent value="accessories" asChild>
                <motion.div {...motionProps}>
                    <SimplePricingTable title="Accessories Pricing" data={accessoriesPricing} />
                </motion.div>
            </TabsContent>
            <TabsContent value="carpet-curtain" asChild>
                <motion.div {...motionProps}>
                    <PricingTable title="Carpet &amp; Curtain Pricing" data={carpetAndCurtainPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Luxe Service", "Wash &amp; Fold", "Wash &amp; Iron"]} />
                </motion.div>
            </TabsContent>
            <TabsContent value="wash-fold" asChild>
                <motion.div {...motionProps}>
                    <PricingTable title="Wash &amp; Fold/Iron Pricing" data={washAndFoldPricing} headers={["Product", "Regular Wash &amp; Iron", "Regular Wash &amp; Fold"]} />
                </motion.div>
            </TabsContent>
        </Tabs>

        <div className="my-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">- Delivery Options -</h3>
          <div className="space-y-2 text-lg text-muted-foreground">
            <p><span className="font-semibold text-foreground">STANDARD DELIVERY (72 HOURS)</span> – NO EXTRA CHARGE</p>
            <p><span className="font-semibold text-foreground">SEMI-EXPRESS (48 HOURS)</span> – 1.5X PRICE (50% EXTRA)</p>
            <p><span className="font-semibold text-foreground">EXPRESS DELIVERY (24 HOURS)</span> – 2X PRICE (100% EXTRA)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
