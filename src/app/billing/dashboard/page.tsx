'use client';

import { DollarSign, Package, CreditCard, Clock } from 'lucide-react';
import KpiCard from '@/components/billing/kpi-card';
import RevenueChart from '@/components/billing/revenue-chart';
import { mockOrders } from '@/lib/data';
import { RecentOrders } from '@/components/billing/recent-orders';
import { OrderStatusBreakdown } from '@/components/billing/order-status-breakdown';
import { ServicePerformance } from '@/components/billing/service-performance';

export default function DashboardPage() {
  const totalRevenue = mockOrders
    .filter((order) => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const amountPending = mockOrders
    .filter((order) => order.paymentStatus === 'Pending')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const revenueByMethod = mockOrders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce(
      (acc, o) => {
        acc[o.paymentMethod] = (acc[o.paymentMethod] || 0) + o.totalAmount;
        return acc;
      },
      {} as { [key: string]: number }
    );
  
  const totalOrders = mockOrders.length;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue (Paid)"
          amount={`₹${totalRevenue.toLocaleString()}`}
          description={`Cash: ₹${(revenueByMethod['Cash'] || 0).toLocaleString()}, Card: ₹${(
            revenueByMethod['Card'] || 0
          ).toLocaleString()}, Online: ₹${(revenueByMethod['Online'] || 0).toLocaleString()}`}
          icon={DollarSign}
        />
        <KpiCard
          title="Amount Pending"
          amount={`₹${amountPending.toLocaleString()}`}
          description="From active & delivered orders"
          icon={Clock}
        />
        <KpiCard
          title="Total Orders"
          amount={`${totalOrders}`}
          description="All-time orders received"
          icon={Package}
        />
        <KpiCard
          title="Avg. Order Value"
          amount={`₹${(
            (totalRevenue + amountPending) /
            totalOrders
          ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="Average across all orders"
          icon={CreditCard}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
        <div className="lg:col-span-3">
          <RevenueChart orders={mockOrders} />
        </div>
        <div className="lg:col-span-2">
           <OrderStatusBreakdown orders={mockOrders} />
        </div>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8">
        <div className="lg:col-span-3">
          <RecentOrders />
        </div>
        <div className="lg:col-span-2">
          <ServicePerformance orders={mockOrders} />
        </div>
      </div>
    </main>
  );
}
