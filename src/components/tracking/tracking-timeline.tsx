import { orderStatuses } from '@/lib/data';
import type { OrderStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check, Circle, Loader, Truck, WashingMachine, Package, PackageCheck, UserCheck, Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const statusIcons = {
  'Pick up Booked': Package,
  'Agent Picked': UserCheck,
  'Reached the Store': Store,
  'Getting Cleaned': WashingMachine,
  'Out for Delivery': Truck,
  'Delivered': PackageCheck,
};

type TrackingTimelineProps = {
  currentStatus: OrderStatus;
  history: { status: OrderStatus; date: Date }[];
};

export default function TrackingTimeline({ currentStatus, history }: TrackingTimelineProps) {
  const currentStatusIndex = orderStatuses.indexOf(currentStatus);

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Your Order Progress</CardTitle>
        <CardDescription>Follow your laundry's journey from pickup to delivery.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-8 md:space-y-0 md:space-x-4">
          {orderStatuses.map((status, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const Icon = statusIcons[status as keyof typeof statusIcons] || Circle;
            const historyEntry = history.find(h => h.status === status);

            return (
              <div key={status} className="flex-1 flex items-start md:items-center md:flex-col md:text-center">
                <div className="flex flex-col md:flex-row items-center w-full">
                    <div className="flex items-center">
                        <div
                            className={cn(
                            'relative flex h-12 w-12 items-center justify-center rounded-full border-2',
                            isCompleted || isCurrent ? 'border-primary' : 'border-muted',
                            isCompleted ? 'bg-primary text-primary-foreground' : isCurrent ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                            )}
                        >
                            <Icon className="h-6 w-6" />
                            {isCurrent && <span className="absolute h-full w-full rounded-full bg-primary/20 animate-ping"></span>}
                        </div>
                         {index < orderStatuses.length - 1 && (
                            <div className="h-16 w-0.5 md:h-0.5 md:w-full bg-muted flex-1 md:ml-2" >
                                <div className={cn('h-full w-full', (isCompleted || isCurrent) && "bg-primary")}></div>
                            </div>
                        )}
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-4">
                        <p className={cn('font-semibold', isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground')}>{status}</p>
                        {historyEntry && (
                            <p className="text-xs text-muted-foreground">{historyEntry.date.toLocaleDateString()} at {historyEntry.date.toLocaleTimeString()}</p>
                        )}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
