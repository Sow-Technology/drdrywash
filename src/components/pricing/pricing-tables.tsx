'use client';

import {
  mensPricing,
  womensPricing,
  sareePricing,
  accessoriesPricing,
  carpetAndCurtainPricing,
  washAndFoldPricing,
} from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const PricingTable = ({
  title,
  data,
  headers,
}: {
  title: string;
  data: any[];
  headers: string[];
}) => (
  <Card className="w-full h-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold font-headline">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.product}</TableCell>
              {Object.keys(item.prices).map((key) => (
                <TableCell key={key} className="text-right">
                  {item.prices[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const SimplePricingTable = ({
  title,
  data,
}: {
  title: string;
  data: { product: string; price: string }[];
}) => (
  <Card className="w-full h-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold font-headline">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.product}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function PricingTables() {
  const pricingSections = [
    {
      component: PricingTable,
      props: {
        title: "Men's Pricing",
        data: mensPricing,
        headers: [
          'Product',
          'Premium Laundry',
          'Dry Clean',
          'Premium Steam Press',
          'Luxe Service',
        ],
      },
    },
    {
      component: PricingTable,
      props: {
        title: "Women's Pricing",
        data: womensPricing,
        headers: [
          'Product',
          'Premium Laundry',
          'Dry Clean',
          'Premium Steam Press',
          'Luxe Service',
        ],
      },
    },
    {
      component: PricingTable,
      props: {
        title: 'Saree Pricing',
        data: sareePricing,
        headers: ['Product', 'Roll press', 'Polish - Extra', 'Dry Clean', 'Starch - Extra'],
      },
    },
    {
      component: SimplePricingTable,
      props: {
        title: 'Accessories Pricing',
        data: accessoriesPricing,
      },
    },
    {
      component: PricingTable,
      props: {
        title: 'Carpet & Curtain Pricing',
        data: carpetAndCurtainPricing,
        headers: [
          'Product',
          'Premium Laundry',
          'Dry Clean',
          'Luxe Service',
          'Wash & Fold',
          'Wash & Iron',
        ],
      },
    },
    {
      component: PricingTable,
      props: {
        title: 'Wash & Fold/Iron Pricing',
        data: washAndFoldPricing,
        headers: ['Product', 'Regular Wash & Iron', 'Regular Wash & Fold'],
      },
    },
  ];

  return (
    <div className="space-y-12">
      {pricingSections.map((section, index) => {
        const Comp = section.component;
        return (
          <motion.div key={index} variants={itemVariants}>
            {/* @ts-ignore */}
            <Comp {...section.props} />
          </motion.div>
        );
      })}
    </div>
  );
}
