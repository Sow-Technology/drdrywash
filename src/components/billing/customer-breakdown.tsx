'use client';

import * as React from 'react';
import { Pie, PieChart, Cell, Tooltip } from 'recharts';
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
import { Users } from 'lucide-react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export function CustomerBreakdown({ orders }: { orders: Order[] }) {

  const customerData = React.useMemo(() => {
    const customerOrderCounts: { [key: string]: number } = {};
    orders.forEach(order => {
        customerOrderCounts[order.customerName] = (customerOrderCounts[order.customerName] || 0) + 1;
    });

    let newCustomers = 0;
    let existingCustomers = 0;
    Object.values(customerOrderCounts).forEach(count => {
        if (count === 1) {
            newCustomers++;
        } else {
            existingCustomers++;
        }
    });

    return [
      { name: 'New Customers', value: newCustomers, fill: COLORS[0] },
      { name: 'Existing Customers', value: existingCustomers, fill: COLORS[1] },
    ];
  }, [orders]);

  const totalCustomers = customerData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Segmentation</CardTitle>
        <CardDescription>
          A breakdown of new vs. returning customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center">
          <ChartContainer config={{}} className="w-full h-full">
            <PieChart>
              <Tooltip
                content={<ChartTooltipContent 
                    formatter={(value) => `${value} customers`}
                    hideLabel 
                />}
              />
              <Pie
                data={customerData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                paddingAngle={2}
                labelLine={false}
                 label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                        <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            className="text-xs font-bold"
                        >
                            {`${(percent * 100).toFixed(0)}%`}
                        </text>
                    );
                }}
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-foreground flex items-center">
                  <tspan>{totalCustomers}</tspan>
              </text>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {customerData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }}></span>
                    <span className="text-muted-foreground">{entry.name}</span>
                    <span className="font-semibold">{entry.value}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
