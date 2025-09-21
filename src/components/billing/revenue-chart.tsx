'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  startOfToday,
  startOfWeek,
  startOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
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
    color: 'hsl(var(--primary))',
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
          start: startOfWeek(today),
          end: today,
        };
        dataGrouper = eachDayOfInterval(interval);
        dateFormat = 'EEE';
        break;
      case 'weekly':
        interval = {
          start: startOfMonth(today),
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
    <Card className="xl:col-span-1">
      <CardHeader className="items-center sm:flex-row gap-2">
        <div className="grid flex-1 gap-2">
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            Showing total revenue for the selected period
          </CardDescription>
        </div>
        <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
                Total revenue this period: ₹{totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="h-[300px] mt-4">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
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
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
