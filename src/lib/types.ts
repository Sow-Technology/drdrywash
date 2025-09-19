export type PricingCategory = {
    product: string;
    prices: { [key: string]: string };
};

export type OrderStatus =
  | 'Pick up Booked'
  | 'Agent Picked'
  | 'Reached the Store'
  | 'Getting Cleaned'
  | 'Out for Delivery'
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
