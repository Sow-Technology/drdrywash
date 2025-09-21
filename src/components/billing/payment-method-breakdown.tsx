'use client';

import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Order, PaymentMethod } from '@/lib/types';
import { Separator } from '../ui/separator';

const COLORS = {
    'Cash': 'hsl(var(--chart-1))',
    'Card': 'hsl(var(--chart-2))',
    'Online': 'hsl(var(--chart-3))'
};

export function PaymentMethodBreakdown({ orders }: { orders: Order[] }) {
  const paidOrders = orders.filter(o => o.paymentStatus === 'Paid');

  const paymentData = React.useMemo(() => {
    const paymentMethods: { [key in PaymentMethod]: number } = { 'Cash': 0, 'Card': 0, 'Online': 0 };

    paidOrders.forEach((order) => {
        paymentMethods[order.paymentMethod] += order.totalAmount;
    });

    return Object.entries(paymentMethods)
      .map(([name, value]) => ({
        name: name as PaymentMethod,
        value,
        fill: COLORS[name as PaymentMethod],
      }))
      .sort((a, b) => b.value - a.value);
  }, [paidOrders]);

  const totalRevenue = paymentData.reduce((sum, item) => sum + item.value, 0);

  const totalGST = paidOrders.reduce((sum, order) => {
      const subtotal = order.totalAmount / 1.18;
      return sum + (order.totalAmount - subtotal);
  }, 0);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Breakdown of revenue from paid orders.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[200px] flex items-center justify-center">
          <ChartContainer config={{}} className="w-full h-full">
            <PieChart>
              <Tooltip
                content={<ChartTooltipContent 
                    formatter={(value) => `₹${Number(value).toLocaleString()}`}
                    hideLabel 
                />}
              />
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                paddingAngle={2}
                labelLine={false}
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
               <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-foreground">
                  ₹{totalRevenue.toLocaleString()}
              </text>
            </PieChart>
          </ChartContainer>
        </div>
         <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {paymentData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }}></span>
                    <span className="text-muted-foreground">{entry.name}</span>
                </div>
            ))}
        </div>
      </CardContent>
       <CardFooter className="flex-col items-start gap-2 text-sm pt-6">
          <Separator />
          <div className="flex w-full justify-between font-medium text-muted-foreground mt-2">
            <span>Total GST Collected (18%)</span>
            <span className="text-foreground">₹{totalGST.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
       </CardFooter>
    </Card>
  );
}
