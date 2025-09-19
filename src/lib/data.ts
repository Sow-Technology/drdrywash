import { Shirt, Sparkles, CheckSquare, BedDouble, Truck, Package, WashingMachine, CheckCircle, Award, Clock, Rocket } from 'lucide-react';
import type { Order, OrderStatus } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { mensPricing } from './mens-pricing';
import { womensPricing } from './womens-pricing';
import { sareePricing } from './saree-pricing';
import { accessoriesPricing } from './accessories-pricing';
import { carpetAndCurtainPricing } from './carpet-and-curtain-pricing';
import { washAndFoldPricing } from './wash-and-fold-pricing';


const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    console.warn(`Image with id "${id}" not found. Using default.`);
    return PlaceHolderImages[0] || { imageUrl: '', imageHint: '' };
  }
  return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

export const howItWorksSteps = [
    {
        icon: Package,
        title: "Place Your Order",
        description: "Select your services and schedule a pickup time that works for you.",
    },
    {
        icon: Truck,
        title: "We Pick Up",
        description: "Our friendly driver will collect your laundry right from your doorstep.",
    },
    {
        icon: WashingMachine,
        title: "We Clean",
        description: "Our experts clean your items with the utmost care and attention to detail.",
    },
    {
        icon: CheckCircle,
        title: "We Deliver",
        description: "Receive your fresh, clean laundry back, ready to wear and enjoy.",
    },
];

export const orderStatuses: OrderStatus[] = [
  'Order Placed',
  'In Transit',
  'Cleaning',
  'Ready for Delivery',
  'Delivered',
];

const now = new Date();

export const mockOrders: Order[] = [
  {
    id: 'DDW123',
    customerName: 'Alice Johnson',
    status: 'Cleaning',
    items: [
      { serviceId: 'wash-fold', quantity: 15, name: 'Wash & Fold' },
      { serviceId: 'dry-cleaning', quantity: 2, name: 'Dry Cleaning' },
    ],
    pickupTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    deliveryTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    address: '123 Maple St, Springfield, IL',
    history: [
      { status: 'Order Placed', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 - 600000) },
      { status: 'In Transit', date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
      { status: 'Cleaning', date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    id: 'DDW456',
    customerName: 'Bob Smith',
    status: 'Delivered',
    items: [{ serviceId: 'bedding', quantity: 1, name: 'Bedding' }],
    pickupTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    deliveryTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    address: '456 Oak Ave, Springfield, IL',
    history: [
      { status: 'Order Placed', date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 - 600000) },
      { status: 'In Transit', date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { status: 'Cleaning', date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000) },
      { status: 'Ready for Delivery', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 - 600000) },
      { status: 'Delivered', date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
    ],
  },
];

export const whyChooseUsItems = [
    {
        icon: Award,
        title: "Expert Quality",
        description: "Our team uses state-of-the-art equipment and premium detergents to ensure your clothes are immaculate.",
    },
    {
        icon: Clock,
        title: "Ultimate Convenience",
        description: "Schedule pickup and delivery at your convenience. Laundry day has never been easier.",
    },
    {
        icon: Rocket,
        title: "Speedy Delivery",
        description: "Get your fresh, clean clothes back in as little as 24 hours. We value your time.",
    },
];

export const faqItems = [
    {
        question: "How do I schedule a pickup?",
        answer: "You can easily schedule a pickup through our website by clicking the 'Schedule a Pickup' button. Just select your services, choose a pickup and delivery time, and we'll handle the rest."
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

export { mensPricing, womensPricing, sareePricing, accessoriesPricing, carpetAndCurtainPricing, washAndFoldPricing };
