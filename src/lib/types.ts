export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  imageHint: string;
};

export type OrderStatus =
  | 'Order Placed'
  | 'In Transit'
  | 'Cleaning'
  | 'Ready for Delivery'
  | 'Delivered';

export type Order = {
  id: string;
  customerName: string;
  status: OrderStatus;
  items: { serviceId: string; quantity: number; name: string }[];
  pickupTime: Date;
  deliveryTime: Date;
  address: string;
  history: {
    status: OrderStatus;
    date: Date;
  }[];
};
