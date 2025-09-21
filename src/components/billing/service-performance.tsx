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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function ServicePerformance({ orders }: { orders: Order[] }) {
  const [metric, setMetric] = React.useState<'revenue' | 'count'>('revenue');

  const serviceData = React.useMemo(() => {
    const services: { [key: string]: { revenue: number; count: number } } = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!services[item.name]) {
          services[item.name] = { revenue: 0, count: 0 };
        }
        // Approximate revenue per item for demo purposes
        const itemRevenue = order.totalAmount / order.items.reduce((sum, i) => sum + i.quantity, 0) * item.quantity;
        services[item.name].revenue += itemRevenue;
        services[item.name].count += item.quantity;
      });
    });

    return Object.entries(services)
      .map(([name, data]) => ({
        name,
        value: data[metric],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5
  }, [orders, metric]);

  const totalValue = serviceData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-full">
      <CardHeader className="items-start sm:flex-row gap-2">
        <div className="grid flex-1 gap-2">
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>
            Top 5 services by {metric === 'revenue' ? 'revenue' : 'order count'}.
          </CardDescription>
        </div>
        <Select value={metric} onValueChange={(value) => setMetric(value as 'revenue' | 'count')}>
          <SelectTrigger className="w-[120px] rounded-lg sm:ml-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="count">Count</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
            <ChartContainer config={{}} className="w-full h-full">
            <PieChart>
                <Tooltip
                    content={<ChartTooltipContent 
                        formatter={(value) => metric === 'revenue' ? `₹${Number(value).toLocaleString()}` : value.toLocaleString()}
                        hideLabel 
                    />}
                />
                <Pie
                    data={serviceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={60}
                    paddingAngle={2}
                    labelLine={false}
                    label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                        index,
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
                {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-foreground">
                    {metric === 'revenue' ? `₹${totalValue.toLocaleString()}` : totalValue.toLocaleString()}
                </text>
            </PieChart>
            </ChartContainer>
        </div>
         <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {serviceData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-muted-foreground">{entry.name}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
