'use client';

import { mockOrders } from '@/lib/data';
import TrackingTimeline from '@/components/tracking/tracking-timeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Download, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
};
  
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const OrderDetailsCard = ({ order }: { order: (typeof mockOrders)[0] }) => (
    <motion.div className='space-y-8' variants={sectionVariants}>
        <motion.div className="text-center max-w-2xl mx-auto" variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Order #{order.id}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Hello, {order.customerName}! Here's the latest on your order.
            </p>
            <div className='mt-4 flex items-center justify-center gap-4'>
                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="text-lg py-1 px-4">{order.status}</Badge>
                <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                </Button>
            </div>
        </motion.div>

        <motion.div variants={itemVariants}>
            <TrackingTimeline currentStatus={order.status} history={order.history} />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto" variants={sectionVariants}>
            <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            {order.items.map(item => (
                                <li key={item.serviceId} className="flex justify-between">
                                    <span>{item.name} (x{item.quantity})</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
             <motion.div variants={itemVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule & Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div>
                            <p className="font-semibold">Pickup:</p>
                            <p className="text-muted-foreground">{format(order.pickupTime, 'PPP, p')}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Estimated Delivery:</p>
                            <p className="text-muted-foreground">{format(order.deliveryTime, 'PPP, p')}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Address:</p>
                            <p className="text-muted-foreground">{order.address}</p>
                        </div>
                    </CardContent>
                </Card>
             </motion.div>
        </motion.div>
    </motion.div>
);

const OrderHistoryCard = ({ orders, customerName }: { orders: typeof mockOrders, customerName: string }) => (
    <motion.div 
        className="max-w-3xl mx-auto"
        variants={sectionVariants}
    >
        <motion.div variants={itemVariants}>
            <Card>
                <CardHeader>
                    <CardTitle>Order History for {customerName}</CardTitle>
                    <CardDescription>Here are all the orders associated with this phone number.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {orders.map(order => (
                            <li key={order.id}>
                                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                                    <div className='flex items-center gap-4'>
                                        <FileText className="h-6 w-6 text-primary" />
                                        <div>
                                            <p className="font-semibold">Order #{order.id} <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className='ml-2'>{order.status}</Badge></p>
                                            <p className="text-sm text-muted-foreground">Ordered on: {format(order.pickupTime, 'PPP')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/track-order/${order.id}`}>View Details</Link>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Invoice
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    </motion.div>
);

export default function TrackedOrderPage({ params }: { params: { id: string } }) {
  const searchQuery = params.id.toUpperCase();
  
  // Try to find a single order by ID first
  const orderById = mockOrders.find((o) => o.id.toUpperCase() === searchQuery);

  // Then, find orders by phone number
  const ordersByPhone = mockOrders.filter(o => o.phoneNumber.replace(/[^\d]/g, '') === searchQuery.replace(/[^\d]/g, ''));
  
  if (orderById) {
      // Found a specific order, show its details and history of other orders from the same customer
      const customerOrders = mockOrders.filter(o => o.customerName === orderById.customerName && o.id !== orderById.id);
      return (
        <motion.div 
            className="container py-12 md:py-20 space-y-8"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            <OrderDetailsCard order={orderById} />
            {customerOrders.length > 0 && (
                <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Previous Order History</CardTitle>
                            <CardDescription>Here are your past completed orders.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {customerOrders.map(prevOrder => (
                                    <li key={prevOrder.id}>
                                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                                            <div className='flex items-center gap-4'>
                                                <FileText className="h-6 w-6 text-primary" />
                                                <div>
                                                    <p className="font-semibold">Order #{prevOrder.id}</p>
                                                    <p className="text-sm text-muted-foreground">Delivered on: {format(prevOrder.deliveryTime, 'PPP')}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/track-order/${prevOrder.id}`}>View Details</Link>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
      );
  }

  if (ordersByPhone.length > 0) {
      // Found orders by phone number, show the list
      return (
          <motion.div 
            className="container py-12 md:py-20"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
              <OrderHistoryCard orders={ordersByPhone} customerName={ordersByPhone[0].customerName} />
          </motion.div>
      );
  }

  // Nothing found
  return (
    <motion.div 
        className="container py-12 md:py-20"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
    >
        <motion.div variants={itemVariants}>
            <Alert variant="destructive" className="max-w-md mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Found</AlertTitle>
                <AlertDescription>
                    We couldn't find any orders with the ID or phone number "{params.id}". Please check your entry and try again.
                </AlertDescription>
            </Alert>
        </motion.div>
    </motion.div>
  );
}
