'use client';

import * as React from 'react';
import {
  ChevronLeft,
  MoreVertical,
  Truck,
  Copy,
  CreditCard,
  File,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { mockOrders, orderStatuses, mensPricing, womensPricing, washAndFoldPricing } from '@/lib/data';
import type { Order, OrderStatus, PaymentMethod, PaymentStatus } from '@/lib/types';

const allPricing = [
    ...mensPricing.map(p => ({ ...p, category: 'Men' })),
    ...womensPricing.map(p => ({ ...p, category: 'Women' })),
    ...washAndFoldPricing.map(p => ({ ...p, category: 'Wash & Fold' })),
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = React.useState<Order | undefined>(
    mockOrders.find((o) => o.id.toUpperCase() === params.id.toUpperCase())
  );
  
  const [orderItems, setOrderItems] = React.useState<any[]>([]);

  const calculateSubtotal = () => {
    return orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  if (!order) {
    return notFound();
  }

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder({ ...order, status: newStatus });
  };
  
  const handlePaymentChange = (newPaymentStatus: PaymentStatus, newPaymentMethod?: PaymentMethod) => {
      setOrder({ ...order, paymentStatus: newPaymentStatus, paymentMethod: newPaymentMethod || order.paymentMethod });
  };
  
  const handleAddItem = (productName: string, service: string, price: string) => {
    const priceValue = parseFloat(price.split('-')[0]); // Take the lower bound of price ranges
    const existingItem = orderItems.find(item => item.product === productName && item.service === service);
    if(existingItem) {
        setOrderItems(orderItems.map(item => item.product === productName && item.service === service ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
        setOrderItems([...orderItems, { product: productName, service, price: priceValue, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productName: string, service: string, quantity: number) => {
    if (quantity <= 0) {
        setOrderItems(orderItems.filter(item => !(item.product === productName && item.service === service)));
    } else {
        setOrderItems(orderItems.map(item => item.product === productName && item.service === service ? { ...item, quantity } : item));
    }
  };

  const subtotal = calculateSubtotal();
  const taxes = subtotal * 0.18; // 18% GST
  const total = subtotal + taxes;


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-5xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/billing/orders">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Order {order.id}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            {order.status}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order Items</CardTitle>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">Add Item</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Men</DropdownMenuLabel>
                        {mensPricing.map(item => (
                            <DropdownMenuItem key={item.product} onSelect={() => handleAddItem(item.product, 'Dry Clean', item.prices.dryClean)}>
                                {item.product} (Dry Clean)
                            </DropdownMenuItem>
                        ))}
                         <DropdownMenuSeparator />
                        <DropdownMenuLabel>Women</DropdownMenuLabel>
                        {womensPricing.map(item => (
                            <DropdownMenuItem key={item.product} onSelect={() => handleAddItem(item.product, 'Dry Clean', item.prices.dryClean)}>
                                {item.product} (Dry Clean)
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                 </DropdownMenu>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead className='w-[100px]'>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.service}</TableCell>
                            <TableCell>
                                <Input 
                                    type="number" 
                                    value={item.quantity} 
                                    onChange={(e) => handleQuantityChange(item.product, item.service, parseInt(e.target.value))} 
                                    className="w-16 h-8"
                                />
                            </TableCell>
                            <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
               <CardFooter className="justify-center border-t p-4">
                 <div className="ml-auto w-full max-w-sm space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes (18% GST)</span>
                        <span>₹{taxes.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                 </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={order.status} onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {orderStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    {order.customerName}
                  </CardTitle>
                  <CardDescription>{order.address}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Copy className="h-3.5 w-3.5" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Contact Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>{order.customerName}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href={`tel:${order.phoneNumber}`}>{order.phoneNumber}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Details</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Method
                      </dt>
                      <dd>{order.paymentMethod}</dd>
                    </div>
                     <div className="flex items-center justify-between">
                        <dt>Status</dt>
                        <dd>
                             <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'destructive'}>{order.paymentStatus}</Badge>
                        </dd>
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <dt className="text-muted-foreground">Total</dt>
                      <dd>₹{order.totalAmount.toLocaleString()}</dd>
                    </div>
                  </dl>
                  {order.paymentStatus === 'Pending' && (
                    <>
                    <Separator className="my-2" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='w-full'>Update Payment</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => handlePaymentChange('Paid', 'Cash')}>Mark as Paid (Cash)</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handlePaymentChange('Paid', 'Card')}>Mark as Paid (Card)</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handlePaymentChange('Paid', 'Online')}>Mark as Paid (Online)</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                  )}
                  {order.paymentStatus === 'Paid' && (
                    <>
                    <Separator className="my-2" />
                    <Button variant="outline" className='w-full'>
                        <File className="mr-2 h-4 w-4" />
                        Download Invoice
                    </Button>
                    </>
                  )}
                </div>
                 <Separator className="my-4" />
                 <div className="grid gap-3">
                    <div className="font-semibold">Schedule</div>
                     <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Pickup</dt>
                            <dd>{format(new Date(order.pickupTime), 'PPp')}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Delivery</dt>
                            <dd>{format(new Date(order.deliveryTime), 'PPp')}</dd>
                        </div>
                    </dl>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
         <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save</Button>
          </div>
      </div>
    </main>
  );
}
