'use client';

import { useMemo } from 'react';
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

const NoResultsFound = () => (
  <div className="text-center text-muted-foreground py-8">
    <p>No matching products found.</p>
  </div>
)

const PricingTable = ({
  title,
  data,
  headers,
}: {
  title: string;
  data: any[];
  headers: string[];
}) => {
  if (data.length === 0) return null;

  return (
    <Card className="w-full h-full border-t-4 border-primary/20 hover:shadow-lg transition-shadow duration-300">
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
                <TableHead key={header} className="text-sm">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{item.product}</TableCell>
                {Object.keys(item.prices).map((key) => (
                  <TableCell key={key} className="text-right tabular-nums">
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
};

const SimplePricingTable = ({
  title,
  data,
}: {
  title: string;
  data: { product: string; price: string }[];
}) => {
  if (data.length === 0) return null;

  return (
    <Card className="w-full h-full border-t-4 border-primary/20 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm">Product</TableHead>
              <TableHead className="text-right text-sm">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell className="text-right tabular-nums">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default function PricingTables({ searchQuery }: { searchQuery: string }) {
  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter(item =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const pricingSections = useMemo(() => [
    {
      id: 'mens',
      component: PricingTable,
      props: {
        title: "Men's Pricing",
        data: filterData(mensPricing),
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
      id: 'womens',
      component: PricingTable,
      props: {
        title: "Women's Pricing",
        data: filterData(womensPricing),
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
      id: 'saree',
      component: PricingTable,
      props: {
        title: 'Saree Pricing',
        data: filterData(sareePricing),
        headers: ['Product', 'Roll press', 'Polish - Extra', 'Dry Clean', 'Starch - Extra'],
      },
    },
    {
      id: 'accessories',
      component: SimplePricingTable,
      props: {
        title: 'Accessories Pricing',
        data: filterData(accessoriesPricing),
      },
    },
    {
      id: 'carpet',
      component: PricingTable,
      props: {
        title: 'Carpet & Curtain Pricing',
        data: filterData(carpetAndCurtainPricing),
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
      id: 'wash-fold',
      component: PricingTable,
      props: {
        title: 'Wash & Fold/Iron Pricing',
        data: filterData(washAndFoldPricing),
        headers: ['Product', 'Regular Wash & Iron', 'Regular Wash & Fold', 'Only Iron'],
      },
    },
  ], [searchQuery]);

  const hasResults = pricingSections.some(section => section.props.data.length > 0);

  return (
    <div className="space-y-12">
      {hasResults ? (
        pricingSections.map((section) => {
          const Comp = section.component;
          if (section.props.data.length === 0) return null;
          return (
            <motion.div key={section.id} variants={itemVariants}>
              {/* @ts-ignore */}
              <Comp {...section.props} />
            </motion.div>
          );
        })
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
}
