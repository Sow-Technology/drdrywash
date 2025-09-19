'use client';

import { mensPricing, womensPricing, sareePricing, accessoriesPricing, carpetAndCurtainPricing, washAndFoldPricing } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

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

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
};


export default function Pricing() {
  const [activeTab, setActiveTab] = useState("men");
  return (
    <motion.section 
        id="pricing" 
        className="py-20 md:py-28 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold tracking-tight font-headline sm:text-4xl"
            variants={itemVariants}
          >
            Transparent Pricing
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            No hidden fees. Simple, upfront pricing for our premium services.
            <br />
            <span className='text-sm'>*Please note that the prices above are exclusive of GST</span>
          </motion.p>
        </div>

        <motion.div variants={itemVariants}>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-16 max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                    <TabsTrigger value="men">Men</TabsTrigger>
                    <TabsTrigger value="women">Women</TabsTrigger>
                    <TabsTrigger value="saree">Saree</TabsTrigger>
                    <TabsTrigger value="accessories">Accessories</TabsTrigger>
                    <TabsTrigger value="carpet-curtain">Carpet &amp; Curtain</TabsTrigger>
                    <TabsTrigger value="wash-fold">Wash &amp; Fold/Iron</TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -20 },
                    }}
                    transition={{ duration: 0.3 }}
                    className='mt-4'
                >
                    <TabsContent value="men" forceMount>
                        <PricingTable title="Men's Pricing" data={mensPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Premium Steam Press", "Luxe Service"]} />
                    </TabsContent>
                    <TabsContent value="women" forceMount>
                        <PricingTable title="Women's Pricing" data={womensPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Premium Steam Press", "Luxe Service"]} />
                    </TabsContent>
                    <TabsContent value="saree" forceMount>
                        <PricingTable title="Saree Pricing" data={sareePricing} headers={["Product", "Roll press", "Polish - Extra", "Dry Clean", "Starch - Extra"]} />
                    </TabsContent>
                    <TabsContent value="accessories" forceMount>
                        <SimplePricingTable title="Accessories Pricing" data={accessoriesPricing} />
                    </TabsContent>
                    <TabsContent value="carpet-curtain" forceMount>
                        <PricingTable title="Carpet &amp; Curtain Pricing" data={carpetAndCurtainPricing} headers={["Product", "Premium Laundry", "Dry Clean", "Luxe Service", "Wash &amp; Fold", "Wash &amp; Iron"]} />
                    </TabsContent>
                    <TabsContent value="wash-fold" forceMount>
                        <PricingTable title="Wash &amp; Fold/Iron Pricing" data={washAndFoldPricing} headers={["Product", "Regular Wash &amp; Iron", "Regular Wash &amp; Fold"]} />
                    </TabsContent>
                </motion.div>
                </AnimatePresence>
            </Tabs>
        </motion.div>

        <motion.div 
            className="my-16 max-w-3xl mx-auto text-center"
            variants={itemVariants}
        >
          <h3 className="text-2xl font-bold mb-4">- Delivery Options -</h3>
          <div className="space-y-2 text-lg text-muted-foreground">
            <p><span className="font-semibold text-foreground">STANDARD DELIVERY (72 HOURS)</span> – NO EXTRA CHARGE</p>
            <p><span className="font-semibold text-foreground">SEMI-EXPRESS (48 HOURS)</span> – 1.5X PRICE (50% EXTRA)</p>
            <p><span className="font-semibold text-foreground">EXPRESS DELIVERY (24 HOURS)</span> – 2X PRICE (100% EXTRA)</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
