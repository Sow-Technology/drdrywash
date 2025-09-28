import { Leaf, BadgePercent, Headset, ShoppingBag, CheckCircle, Flower, MonitorSmartphone, Bike, Store, Truck, WashingMachine, User, Tag, Car, Asterisk, CreditCard } from 'lucide-react';
import type { Order, OrderStatus } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { mensPricing } from './mens-pricing';
import { womensPricing } from './womens-pricing';
import { sareePricing } from './saree-pricing';
import { accessoriesPricing } from './accessories-pricing';
import { carpetAndCurtainPricing } from './carpet-and-curtain-pricing';
import { washAndFoldPricing } from './wash-and-fold-pricing';
import { homeLinenPricing } from './home-linen-pricing';


const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    console.warn(`Image with id "${id}" not found. Using default.`);
    return PlaceHolderImages[0] || { imageUrl: '', imageHint: '' };
  }
  return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

export const howItWorksOnline = [
    {
        icon: MonitorSmartphone,
        title: "Order Online",
        description: "Schedule order using website or our App.",
    },
    {
        icon: Bike,
        title: "Pick Up",
        description: "We pickup your laundry as per your scheduled time.",
    },
    {
        icon: WashingMachine,
        title: "Cleaning",
        description: "We'll expertly launder/dry clean your order with top-quality service.",
    },
    {
        icon: Truck,
        title: "Drop Off",
        description: "Delivered at your doorstep at a time comfortable to you.",
    }
];

export const howItWorksStore = {
    icon: Store,
    title: "Visit Store",
};

export const orderStatuses: OrderStatus[] = [
  'Pick up Booked',
  'Agent Picked',
  'Reached the Store',
  'Getting Cleaned',
  'Out for Delivery',
  'Delivered',
];

const now = new Date();

export let mockOrders: Order[] = [
  {
    id: 'DDW123',
    customerName: 'Alice Johnson',
    phoneNumber: '(555) 123-4567',
    status: 'Getting Cleaned',
    items: [
      { serviceId: 'wash-fold', quantity: 15, name: 'Wash & Fold' },
      { serviceId: 'dry-cleaning', quantity: 2, name: 'Dry Cleaning' },
    ],
    pickupTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    deliveryTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    address: '123 Maple St, Springfield, IL',
    totalAmount: 2550,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    history: [
      { status: 'Pick up Booked', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 - 600000) },
      { status: 'Agent Picked', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
      { status: 'Reached the Store', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { status: 'Getting Cleaned', date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 'DDW456',
    customerName: 'Bob Smith',
    phoneNumber: '(555) 987-6543',
    status: 'Delivered',
    items: [{ serviceId: 'bedding', quantity: 1, name: 'Bedding' }],
    pickupTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    deliveryTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    address: '456 Oak Ave, Springfield, IL',
    totalAmount: 1200,
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    history: [
      { status: 'Pick up Booked', date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 - 600000) },
      { status: 'Agent Picked', date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { status: 'Reached the Store', date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000) },
      { status: 'Getting Cleaned', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
      { status: 'Out for Delivery', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { status: 'Delivered', date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 'DDW789',
    customerName: 'Alice Johnson',
    phoneNumber: '(555) 123-4567',
    status: 'Delivered',
    items: [
      { serviceId: 'ironing', quantity: 10, name: 'Ironing' }
    ],
    pickupTime: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    deliveryTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    address: '123 Maple St, Springfield, IL',
    totalAmount: 950,
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    history: [
      { status: 'Pick up Booked', date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000 - 300000) },
      { status: 'Agent Picked', date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) },
      { status: 'Reached the Store', date: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000) },
      { status: 'Getting Cleaned', date: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000) },
      { status: 'Out for Delivery', date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 - 300000) },
      { status: 'Delivered', date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
    ],
  },
   {
    id: 'DDW234',
    customerName: 'Charlie Brown',
    phoneNumber: '(555) 234-5678',
    status: 'Out for Delivery',
    items: [
      { serviceId: 'dry-cleaning', quantity: 5, name: 'Dry Cleaning' }
    ],
    pickupTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    deliveryTime: new Date(),
    address: '789 Pine Ln, Springfield, IL',
    totalAmount: 4250,
    paymentMethod: 'Card',
    paymentStatus: 'Pending',
    history: [
      { status: 'Pick up Booked', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 - 300000) },
      { status: 'Agent Picked', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { status: 'Reached the Store', date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
      { status: 'Getting Cleaned', date: new Date(now.getTime() - 12 * 60 * 60 * 1000) },
      { status: 'Out for Delivery', date: new Date(now.getTime() - 1 * 60 * 60 * 1000) },
    ],
  },
];

export function addMockOrder(order: Order) {
  mockOrders.unshift(order);
}

export const whyChooseUsItems = [
    {
        icon: User,
        title: "PROFESSIONALLY TRAINED GARMENTS CARE",
        description: "All Experts at fabric practice professional world-class processes to take care of your garments.",
        highlighted: false,
    },
    {
        icon: Tag,
        title: "NO MORE GARMENTS LOSS",
        description: "All garments are tagged with their respective codes right from intake and processed accordingly until delivered.",
        highlighted: false,
    },
     {
        icon: Asterisk,
        title: "NO GARMENTS DAMAGE",
        description: "No colour bleeding, no colour fading, no tearing or other damage risks under fabrico approved process.",
        highlighted: true,
    },
    {
        icon: CreditCard,
        title: "CONVENIENT PAYMENT OPTIONS",
        description: "Pay as you prefer via card, net banking, e-wallets, UPI, cash, etc. we accept all modes of payment.",
        highlighted: false,
    },
    {
        icon: Car,
        title: "CONVENIENT AND FREE PICK UP & DROP",
        description: "Now schedule and manage your pickup & Drop conveniently on the Fabrico app.",
        highlighted: false,
    },
];

export const faqItems = [
    {
        question: "How do I schedule a pickup?",
        answer: "You can easily schedule a pickup through our website. Just select your services, choose a pickup and delivery time, and we'll handle the rest."
    },
    {
        question: "What are your service areas?",
        answer: "We currently serve the greater Springfield area. You can enter your address during the order process to confirm if we deliver to your location."
    },
    {
        question: "How do I pay for my order?",
        answer: "We accept all major credit cards and online payments through our secure payment gateway. Payment is processed once you confirm your order."
    },
    {
        question: "What is your turnaround time?",
        answer: "Our standard turnaround time is 48 hours, but we also offer a 24-hour express service for an additional fee. You can select your preferred option when placing your order."
    },
    {
        question: "Can I track my order?",
        answer: "Yes! Once your order is placed, you will receive an order ID. You can use this ID on our 'Track Order' page to see real-time updates on your laundry's progress."
    }
];

export { mensPricing, womensPricing, sareePricing, accessoriesPricing, carpetAndCurtainPricing, washAndFoldPricing, homeLinenPricing };
