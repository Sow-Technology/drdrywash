import { mockOrders } from '@/lib/data';
import TrackingTimeline from '@/components/tracking/tracking-timeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function TrackedOrderPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id.toUpperCase() === params.id.toUpperCase());

  if (!order) {
    return (
        <div className="container py-12 md:py-20">
            <Alert variant="destructive" className="max-w-md mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Order Not Found</AlertTitle>
                <AlertDescription>
                    We couldn't find an order with the ID "{params.id}". Please check the ID and try again.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="container py-12 md:py-20 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Order #{order.id}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Hello, {order.customerName}! Here's the latest on your order.
            </p>
            <div className='mt-4'>
                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="text-lg py-1 px-4">{order.status}</Badge>
            </div>
        </div>

        <TrackingTimeline currentStatus={order.status} history={order.history} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        {order.items.map(item => (
                             <li key={item.serviceId} className="flex justify-between">
                                <span>{item.name} (x{item.quantity})</span>
                             </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Schedule & Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <p className="font-semibold">Pickup:</p>
                        <p className="text-muted-foreground">{format(order.pickupTime, 'PPP, p')}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Estimated Delivery:</p>
                        <p className="text-muted-foreground">{format(order.deliveryTime, 'PPP, p')}</p>
                    </div>
                     <div>
                        <p className="font-semibold">Address:</p>
                        <p className="text-muted-foreground">{order.address}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
