'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  startOfToday,
  startOfWeek,
  startOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
  subDays,
  subMonths,
} from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Order } from '@/lib/types';

type TimeFrame = 'daily' | 'weekly' | 'monthly';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
};

export default function RevenueChart({ orders }: { orders: Order[] }) {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>('monthly');

  const today = startOfToday();

  const getChartData = React.useCallback(() => {
    let interval;
    let dataGrouper;
    let dateFormat;

    switch (timeFrame) {
      case 'daily':
        interval = {
          start: subDays(today, 6),
          end: today,
        };
        dataGrouper = eachDayOfInterval(interval);
        dateFormat = 'EEE';
        break;
      case 'weekly':
        interval = {
          start: subMonths(today, 2),
          end: today,
        };
        dataGrouper = eachWeekOfInterval(interval, { weekStartsOn: 1 });
        dateFormat = "MMM d";
        break;
      case 'monthly':
      default:
        interval = {
          start: new Date(today.getFullYear(), 0, 1),
          end: today,
        };
        dataGrouper = eachMonthOfInterval(interval);
        dateFormat = 'MMM';
        break;
    }
    
    return dataGrouper.map((date) => {
      const revenue = orders
        .filter((order) => {
           const orderDate = new Date(order.deliveryTime);
           if (timeFrame === 'daily') {
               return format(orderDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
           }
           if (timeFrame === 'weekly') {
                return format(startOfWeek(orderDate, {weekStartsOn: 1}), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
           }
           return orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, order) => sum + order.totalAmount, 0);

      return {
        date: format(date, dateFormat),
        revenue,
      };
    });
  }, [timeFrame, orders, today]);

  const chartData = getChartData();
  
  const totalRevenue = chartData.reduce((acc, item) => acc + item.revenue, 0);

  return (
    <Card className="h-full">
      <CardHeader className="items-start sm:flex-row gap-2">
        <div className="grid flex-1 gap-2">
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            Showing total revenue for the selected period. Total: ₹{totalRevenue.toLocaleString()}
          </CardDescription>
        </div>
        <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Last 7 Days</SelectItem>
            <SelectItem value="weekly">Last 3 Months (Weekly)</SelectItem>
            <SelectItem value="monthly">This Year (Monthly)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="h-[300px] mt-4">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" formatter={(value) => `₹${value.toLocaleString()}`} />}
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
