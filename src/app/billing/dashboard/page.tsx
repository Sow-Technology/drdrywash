'use client';

import { DollarSign, Package, CreditCard, Clock, Users, Percent } from 'lucide-react';
import KpiCard from '@/components/billing/kpi-card';
import RevenueChart from '@/components/billing/revenue-chart';
import { mockOrders } from '@/lib/data';
import { RecentOrders } from '@/components/billing/recent-orders';
import { OrderStatusBreakdown } from '@/components/billing/order-status-breakdown';
import { ServicePerformance } from '@/components/billing/service-performance';
import { CustomerBreakdown } from '@/components/billing/customer-breakdown';
import { PaymentMethodBreakdown } from '@/components/billing/payment-method-breakdown';

export default function DashboardPage() {
  const totalRevenue = mockOrders
    .filter((order) => order.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const totalGST = mockOrders
    .filter(order => order.paymentStatus === 'Paid')
    .reduce((sum, order) => {
        const subtotal = order.totalAmount / 1.18;
        const gst = order.totalAmount - subtotal;
        return sum + gst;
    }, 0);

  const amountPending = mockOrders
    .filter((order) => order.paymentStatus === 'Pending')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const totalOrders = mockOrders.length;
  const deliveredOrders = mockOrders.filter(o => o.status === 'Delivered').length;
  const outForDeliveryOrders = mockOrders.filter(o => o.status === 'Out for Delivery').length;
  const cleaningOrders = mockOrders.filter(o => o.status === 'Getting Cleaned').length;
  const bookedOrders = mockOrders.filter(o => o.status === 'Agent Picked').length;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <KpiCard
          title="Total Orders"
          amount={`${totalOrders}`}
          description={`${deliveredOrders} delivered, ${outForDeliveryOrders} in transit`}
          icon={Package}
        />
         <KpiCard
          title="Orders In-Progress"
          amount={`${cleaningOrders}`}
          description={`${bookedOrders} just picked up`}
          icon={Clock}
        />
        <KpiCard
          title="Total Revenue (Paid)"
          amount={`₹${totalRevenue.toLocaleString()}`}
          description={`Includes ₹${totalGST.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} GST`}
          icon={DollarSign}
        />
        <KpiCard
          title="Amount Pending"
          amount={`₹${amountPending.toLocaleString()}`}
          description="From orders not yet paid"
          icon={CreditCard}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 md:gap-8">
        <div className="lg:col-span-3">
          <RevenueChart orders={mockOrders} />
        </div>
        <div className="lg:col-span-2">
           <PaymentMethodBreakdown orders={mockOrders} />
        </div>
         <div className="lg:col-span-2">
           <CustomerBreakdown orders={mockOrders} />
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
       <div className="grid grid-cols-1 gap-4 md:gap-8">
        <div>
          <OrderStatusBreakdown orders={mockOrders} />
        </div>
      </div>
    </main>
  );
}
