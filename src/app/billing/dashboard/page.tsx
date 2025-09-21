'use client';

import { DollarSign, Package, CreditCard, Clock, Users, Percent, CheckCircle, AlertCircle } from 'lucide-react';
import KpiCard from '@/components/billing/kpi-card';
import RevenueChart from '@/components/billing/revenue-chart';
import { mockOrders } from '@/lib/data';
import { RecentOrders } from '@/components/billing/recent-orders';
import { OrderStatusBreakdown } from '@/components/billing/order-status-breakdown';
import { ServicePerformance } from '@/components/billing/service-performance';
import { CustomerBreakdown } from '@/components/billing/customer-breakdown';
import { PaymentMethodBreakdown } from '@/components/billing/payment-method-breakdown';

export default function DashboardPage() {
  const paidOrders = mockOrders.filter((order) => order.paymentStatus === 'Paid');
  const pendingOrders = mockOrders.filter((order) => order.paymentStatus === 'Pending');

  const totalPaidValue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalPaidCount = paidOrders.length;
  
  const totalPendingValue = pendingOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalPendingCount = pendingOrders.length;
  
  const totalGST = mockOrders
    .filter(order => order.paymentStatus === 'Paid')
    .reduce((sum, order) => {
        const subtotal = order.totalAmount / 1.18;
        const gst = order.totalAmount - subtotal;
        return sum + gst;
    }, 0);

  const totalOrders = mockOrders.length;
  const deliveredOrders = mockOrders.filter(o => o.status === 'Delivered').length;
  const outForDeliveryOrders = mockOrders.filter(o => o.status === 'Out for Delivery').length;

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
          title="Fully Paid Orders"
          amount={`₹${totalPaidValue.toLocaleString()}`}
          description={`${totalPaidCount} orders have been fully paid`}
          icon={CheckCircle}
        />
        <KpiCard
          title="Pending Payments"
          amount={`₹${totalPendingValue.toLocaleString()}`}
          description={`${totalPendingCount} orders are awaiting payment`}
          icon={AlertCircle}
        />
        <KpiCard
          title="Total GST Collected"
          amount={`₹${totalGST.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          description="From all fully paid orders"
          icon={Percent}
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
