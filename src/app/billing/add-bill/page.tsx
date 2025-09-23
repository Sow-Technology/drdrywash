

'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays } from 'date-fns';
import {
  ChevronLeft,
  PlusCircle,
  X,
  CalendarIcon,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { allProductCategoriesWithServices, ProductWithServices } from '@/lib/all-products-with-services';
import { Logo } from '@/components/shared/logo';
import { addMockOrder } from '@/lib/data';
import type { Order } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { mockBranches } from '@/lib/branches';
import type { Branch } from '@/lib/branches';

const lineItemSchema = z.object({
  category: z.string().min(1, 'Category is required.'),
  product: z.string().min(1, 'Product is required.'),
  service: z.string().min(1, 'Service is required.'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
  price: z.coerce.number().min(0, 'Price cannot be negative.'),
});

const addBillSchema = z.object({
  branchId: z.string().min(1, "Please select a branch."),
  customerName: z.string().min(2, 'Customer name is required.'),
  customerPhone: z.string().min(10, 'A valid phone number is required.'),
  customerAddress: z.string().min(10, 'Customer address is required.'),
  invoiceDate: z.date(),
  dueDate: z.date(),
  invoiceNumber: z.string().min(1, 'Invoice number is required.'),
  lineItems: z.array(lineItemSchema).min(1, 'At least one item is required.'),
  paymentMethod: z.string().min(1, 'Payment method is required.'),
  paymentInstructions: z.string().optional(),
  shippingCharge: z.coerce.number().min(0).optional().default(0),
});

type AddBillFormValues = z.infer<typeof addBillSchema>;

export default function AddBillPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const defaultDueDate = addDays(new Date(), 30);
  const [selectedBranch, setSelectedBranch] = React.useState<Branch | null>(mockBranches.length > 0 ? mockBranches[0] : null);

  const form = useForm<AddBillFormValues>({
    resolver: zodResolver(addBillSchema),
    defaultValues: {
      branchId: mockBranches.length > 0 ? mockBranches[0].id : '',
      invoiceDate: new Date(),
      dueDate: defaultDueDate,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      lineItems: [{ category: '', product: '', service: '', quantity: 1, price: 0 }],
      paymentMethod: 'Cash',
      paymentInstructions: 'Please make the payment upon delivery.',
      shippingCharge: 0,
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'lineItems',
  });

  const lineItems = form.watch('lineItems');
  const branchId = form.watch('branchId');
  const shippingCharge = form.watch('shippingCharge');


  React.useEffect(() => {
    const branch = mockBranches.find(b => b.id === branchId) || null;
    setSelectedBranch(branch);
  }, [branchId]);


  const subtotal = React.useMemo(() => {
    return lineItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity) || 0), 0);
  }, [lineItems]);

  const taxes = subtotal * 0.18; // 18% GST
  const total = subtotal + taxes + (shippingCharge || 0);

  const getProductsForCategory = (categoryId: string) => {
    return allProductCategoriesWithServices.find(cat => cat.id === categoryId)?.products || [];
  }
  
  const handleCategoryChange = (index: number, categoryId: string) => {
    update(index, {
        ...lineItems[index],
        category: categoryId,
        product: '',
        service: '',
        price: 0,
    });
  };

  const handleProductChange = (index: number, productName: string) => {
    update(index, {
        ...lineItems[index],
        product: productName,
        service: '',
        price: 0,
    });
  };

  const handleServiceChange = (index: number, serviceName: string) => {
      const categoryId = lineItems[index].category;
      const productName = lineItems[index].product;
      const products = getProductsForCategory(categoryId);
      const product = products.find(p => p.name === productName);
      const service = product?.services.find(s => s.name === serviceName);
      if (service) {
          update(index, {
              ...lineItems[index],
              service: serviceName,
              price: service.price,
          });
      }
  };
  
  async function onSubmit(data: AddBillFormValues) {
    setIsLoading(true);

    const newOrder: Order = {
      id: data.invoiceNumber,
      customerName: data.customerName,
      phoneNumber: data.customerPhone,
      address: data.customerAddress,
      status: 'Pick up Booked',
      paymentMethod: data.paymentMethod as Order['paymentMethod'],
      paymentStatus: 'Pending',
      pickupTime: data.invoiceDate,
      deliveryTime: data.dueDate,
      totalAmount: total,
      items: data.lineItems.map(item => ({
        name: `${item.product} (${item.service})`,
        quantity: item.quantity,
        serviceId: item.product,
      })),
      history: [{ status: 'Pick up Booked', date: new Date() }],
    };

    addMockOrder(newOrder);
    
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: 'Invoice Created!',
            description: `Invoice ${data.invoiceNumber} for ${data.customerName} has been successfully created.`,
        });
        form.reset({
            branchId: mockBranches.length > 0 ? mockBranches[0].id : '',
            invoiceDate: new Date(),
            dueDate: defaultDueDate,
            invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
            customerName: '',
            customerPhone: '',
            customerAddress: '',
            lineItems: [{ category: '', product: '', service: '', quantity: 1, price: 0 }],
            paymentMethod: 'Cash',
            paymentInstructions: 'Please make the payment upon delivery.'
        });
        router.push('/billing/orders');
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/billing/orders">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create New Invoice
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" type="button" onClick={() => form.reset()}>
              Discard
            </Button>
            <Button size="sm" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Invoice
            </Button>
          </div>
        </div>

        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                    <div>
                        <Logo />
                        {selectedBranch ? (
                            <div className="text-sm text-muted-foreground mt-2">
                                <p className="font-semibold">{selectedBranch.name}</p>
                                <p>{selectedBranch.address}</p>
                                <p>{selectedBranch.phone}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground mt-2">Please select a branch</p>
                        )}
                    </div>
                    <div className="text-left sm:text-right mt-4 sm:mt-0">
                        <h2 className="text-2xl font-bold tracking-tight">BILLING STATEMENT</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                            <span className="text-muted-foreground">Invoice Date:</span>
                            <span>{format(form.watch('invoiceDate'), 'MM/dd/yy')}</span>
                            <span className="text-muted-foreground">Invoice No:</span>
                            <span>{form.watch('invoiceNumber')}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Separator />
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <h3 className="font-semibold">Bill To:</h3>
                        <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="Customer Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="Phone Number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="customerAddress"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Customer Address" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="branchId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Branch</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a branch" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {mockBranches.map(branch => (
                                        <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name="invoiceDate"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice Date</FormLabel>
                                    <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                        >
                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                    </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                        >
                                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                    </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="invoiceNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Invoice Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[18%]">Category</TableHead>
                                <TableHead className="w-[18%]">Product</TableHead>
                                <TableHead className="w-[18%]">Service</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fields.map((field, index) => {
                                const selectedCategoryId = lineItems[index]?.category;
                                const currentProducts = getProductsForCategory(selectedCategoryId);
                                const selectedProduct = currentProducts.find(p => p.name === lineItems[index]?.product);
                                
                                return (
                                <TableRow key={field.id}>
                                    <TableCell>
                                        <FormField
                                            control={form.control}
                                            name={`lineItems.${index}.category`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={(value) => { field.onChange(value); handleCategoryChange(index, value); }} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {allProductCategoriesWithServices.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            control={form.control}
                                            name={`lineItems.${index}.product`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={(value) => { field.onChange(value); handleProductChange(index, value); }} value={field.value} disabled={!selectedCategoryId}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Product" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {currentProducts.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                         <FormField
                                            control={form.control}
                                            name={`lineItems.${index}.service`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={(value) => { field.onChange(value); handleServiceChange(index, value); }} value={field.value} disabled={!selectedProduct}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Service" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {selectedProduct?.services.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            control={form.control}
                                            name={`lineItems.${index}.quantity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            control={form.control}
                                            name={`lineItems.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        ₹{((Number(lineItems[index]?.price) || 0) * (Number(lineItems[index]?.quantity) || 0)).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => append({ category: '', product: '', service: '', quantity: 1, price: 0 })}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
                <div className="flex justify-end">
                    <div className="w-full max-w-sm space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Taxes (18% GST)</span>
                            <span>₹{taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Shipping Charge</span>
                             <FormField
                                control={form.control}
                                name="shippingCharge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} className="w-24 h-8 text-right" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                 <Separator />
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                        <h3 className="font-semibold">Payment Details</h3>
                         <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a method" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Card">Credit/Debit Card</SelectItem>
                                        <SelectItem value="Online">Online Payment</SelectItem>
                                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="paymentInstructions"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Payment Instructions</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <h3 className="font-semibold">Notes</h3>
                        <Textarea placeholder="Thank you for your business!" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" type="button" onClick={() => form.reset()}>
              Discard
            </Button>
            <Button size="sm" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Invoice
            </Button>
        </div>
      </form>
    </Form>
  );
}
