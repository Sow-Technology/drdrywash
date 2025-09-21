'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Order } from '@/lib/types';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
};

export function CustomerBreakdown({ orders }: { orders: Order[] }) {
  const customerData = React.useMemo(() => {
    const customerOrders: { [key: string]: Order[] } = {};
    orders.forEach(order => {
        if (!customerOrders[order.customerName]) {
            customerOrders[order.customerName] = [];
        }
        customerOrders[order.customerName].push(order);
    });

    const segments = {
        new: { revenue: 0, count: 0 },
        existing: { revenue: 0, count: 0 },
    };

    Object.values(customerOrders).forEach(customerOrderList => {
        if (customerOrderList.length === 1) {
            segments.new.count++;
            segments.new.revenue += customerOrderList[0].totalAmount;
        } else {
            segments.existing.count++;
            segments.existing.revenue += customerOrderList.reduce((sum, order) => sum + order.totalAmount, 0);
        }
    });

    return [
      { name: 'New Customers', revenue: segments.new.revenue, count: segments.new.count },
      { name: 'Existing Customers', revenue: segments.existing.revenue, count: segments.existing.count },
    ];
  }, [orders]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Segmentation</CardTitle>
        <CardDescription>
          Revenue and count of new vs. returning customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart
              accessibilityLayer
              data={customerData}
              layout="vertical"
              margin={{
                left: 10,
                right: 10,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-xs"
                width={110}
              />
              <XAxis dataKey="revenue" type="number" hide />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent 
                    formatter={(value, name, props) => {
                        if (name === 'revenue' && props.payload) {
                           return (
                                <div>
                                    <p>Revenue: ₹{Number(value).toLocaleString()}</p>
                                    <p>Customers: {props.payload.count}</p>
                                </div>
                           )
                        }
                        return value;
                    }}
                    labelFormatter={() => ''}
                    indicator="dot"
                />}
              />
              <Bar
                dataKey="revenue"
                layout="vertical"
                fill="var(--color-revenue)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
