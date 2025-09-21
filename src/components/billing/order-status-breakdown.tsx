'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { orderStatuses } from '@/lib/data';
import type { Order } from '@/lib/types';
import { cn } from '@/lib/utils';


export function OrderStatusBreakdown({ orders }: { orders: Order[] }) {
  const statusCounts = React.useMemo(() => {
    return orderStatuses.map((status) => ({
      status,
      count: orders.filter((order) => order.status === status).length,
    }));
  }, [orders]);

  const totalOrders = orders.length;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Order Status Breakdown</CardTitle>
        <CardDescription>
          A live look at where all your orders are in the process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusCounts.map(({ status, count }) => {
            const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
            return (
              <div key={status} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-muted-foreground">{status}</span>
                  <span className="font-semibold text-foreground">{count} Orders</span>
                </div>
                <Progress value={percentage} aria-label={`${percentage.toFixed(0)}% of orders are ${status}`} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
