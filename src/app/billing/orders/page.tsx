'use client';

import * as React from 'react';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from 'lucide-react';
import * as XLSX from 'xlsx';

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockOrders } from '@/lib/data';
import type { OrderStatus } from '@/lib/types';
import Link from 'next/link';

const orderStatuses: OrderStatus[] = [
  'Pick up Booked',
  'Agent Picked',
  'Reached the Store',
  'Getting Cleaned',
  'Out for Delivery',
  'Delivered',
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | 'all'>('all');

  const filteredOrders = React.useMemo(() => {
    return mockOrders.filter(order => {
        const matchesSearch =
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.phoneNumber.includes(searchQuery);
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleExport = () => {
    const formattedOrders = filteredOrders.map(order => ({
      'Order ID': order.id,
      'Customer Name': order.customerName,
      'Phone Number': order.phoneNumber,
      'Status': order.status,
      'Payment Status': order.paymentStatus,
      'Payment Method': order.paymentMethod,
      'Pickup Time': new Date(order.pickupTime).toLocaleString(),
      'Delivery Time': new Date(order.deliveryTime).toLocaleString(),
      'Address': order.address,
      'Total Amount': order.totalAmount,
      'Items': order.items.map(item => `${item.name} (x${item.quantity})`).join(', '),
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {orderStatuses.map(status => (
                <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
            ))}
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/schedule-pickup">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-rap">
                        Add Order
                    </span>
                </Link>
            </Button>
          </div>
        </div>
        <TabsContent value={statusFilter}>
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Manage your orders and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Payment Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Pickup Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id}>
                       <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.phoneNumber}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                       <TableCell className="hidden md:table-cell">
                        <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'outline'}>
                            {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(order.pickupTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">₹{order.totalAmount.toLocaleString()}</TableCell>
                       <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/billing/orders/${order.id}`}>Update Order</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Customer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{filteredOrders.length}</strong> of <strong>{mockOrders.length}</strong> orders.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
