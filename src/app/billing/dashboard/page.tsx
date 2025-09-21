'use client';

import { DollarSign, Package, Truck, WashingMachine } from 'lucide-react';
import KpiCard from '@/components/billing/kpi-card';
import RevenueChart from '@/components/billing/revenue-chart';
import { mockOrders } from '@/lib/data';
import { RecentOrders } from '@/components/billing/recent-orders';

export default function DashboardPage() {
  const ordersBooked = mockOrders.filter(
    (order) => order.status !== 'Pick up Booked'
  ).length;
  const ordersCleaning = mockOrders.filter(
    (order) => order.status === 'Getting Cleaned'
  ).length;
  const ordersForDelivery = mockOrders.filter(
    (order) => order.status === 'Out for Delivery'
  ).length;
  const ordersDelivered = mockOrders.filter(
    (order) => order.status === 'Delivered'
  ).length;

  const totalReceived = mockOrders
    .filter((order) => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const amountPending = mockOrders
    .filter((order) => order.paymentStatus === 'Pending')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const totalRevenue = totalReceived + amountPending;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          amount={`₹${totalRevenue.toLocaleString()}`}
          description={`${(
            (ordersDelivered / mockOrders.length) *
            100
          ).toFixed(0)}% of orders completed`}
          icon={DollarSign}
        />
        <KpiCard
          title="Orders Booked"
          amount={`+${ordersBooked}`}
          description="Pickups completed"
          icon={Package}
        />
        <KpiCard
          title="In Cleaning"
          amount={`${ordersCleaning}`}
          description="Orders currently being processed"
          icon={WashingMachine}
        />
        <KpiCard
          title="Out for Delivery"
          amount={`${ordersForDelivery}`}
          description="Orders on their way to customers"
          icon={Truck}
        />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <RevenueChart orders={mockOrders} />
        <RecentOrders />
      </div>
    </main>
  );
}
