export type PricingCategory = {
    product: string;
    prices: { [key: string]: string };
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
