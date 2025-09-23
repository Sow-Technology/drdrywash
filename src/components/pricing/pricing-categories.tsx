
'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  mensPricing,
  womensPricing,
  sareePricing,
  accessoriesPricing,
  carpetAndCurtainPricing,
  homeLinenPricing,
  washAndFoldPricing,
} from '@/lib/data';

const NoResultsFound = () => (
  <div className="text-center text-muted-foreground py-8 col-span-full">
    <p>No matching products found.</p>
  </div>
);

const PricingTable = ({
  data,
  headers,
}: {
  data: any[];
  headers: string[];
}) => {
  if (data.length === 0) return null;

  return (
    <Card className="w-full h-full border-t-4 border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="text-sm text-center">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium text-center">{item.product}</TableCell>
                {Object.keys(item.prices).map((key) => (
                  <TableCell key={key} className="text-center tabular-nums">
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
  data,
}: {
  data: { product: string; price: string }[];
}) => {
  if (data.length === 0) return null;

  return (
    <Card className="w-full h-full border-t-4 border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm text-center">Product</TableHead>
              <TableHead className="text-center text-sm">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium text-center">{item.product}</TableCell>
                <TableCell className="text-center tabular-nums">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default function PricingCategories({ searchQuery }: { searchQuery: string }) {
  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter(item =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const pricingSections = useMemo(() => [
    {
      id: 'men',
      title: 'Men',
      component: PricingTable,
      props: {
        data: filterData(mensPricing),
        headers: [
          'Product',
          'Premium Laundry',
          'Dry Clean',
          'Premium Steam Press',
        ],
      },
    },
    {
      id: 'ladies-wear',
      title: 'Ladies Wear',
      component: PricingTable,
      props: {
        data: filterData(womensPricing),
        headers: [
          'Product',
          'Premium Laundry',
          'Dry Clean',
          'Premium Steam Press',
        ],
      },
    },
    {
      id: 'sarees',
      title: 'Sarees',
      component: PricingTable,
      props: {
        data: filterData(sareePricing),
        headers: ['Product', 'Roll press', 'Polish - Extra', 'Dry Clean', 'Starch - Extra'],
      },
    },
    {
        id: 'home-linen',
        title: 'Home Linen',
        component: SimplePricingTable,
        props: {
            data: filterData(homeLinenPricing),
        },
    },
    {
      id: 'accessories',
      title: 'Accessories',
      component: SimplePricingTable,
      props: {
        data: filterData(accessoriesPricing),
      },
    },
    {
      id: 'carpet-curtain',
      title: 'Carpet and Curtain',
      component: PricingTable,
      props: {
        data: filterData(carpetAndCurtainPricing),
        headers: [
          'Product',
          'Premium Laundry',
          'Dry Clean',
        ],
      },
    },
    {
      id: 'wash-fold',
      title: 'Regular Wash and Iron / Wash & Fold',
      component: PricingTable,
      props: {
        data: filterData(washAndFoldPricing),
        headers: ['Product', 'Regular Wash & Iron', 'Regular Wash & Fold', 'Only Iron'],
      },
    },
    {
        id: 'shoes',
        title: 'Shoes - Cleaning and Conditioning',
        component: () => <div className="text-center p-8">Coming Soon!</div>,
        props: { data: [] }
    },
    {
        id: 'repairs',
        title: 'Repairs Service',
        component: () => <div className="text-center p-8">Coming Soon!</div>,
        props: { data: [] }
    },
  ], [searchQuery]);

  const hasResults = pricingSections.some(section => section.id === 'shoes' || section.id === 'repairs' || section.props.data.length > 0);
  const topRowCategories = pricingSections.slice(0, 5);
  const bottomRowCategories = pricingSections.slice(5);

  return (
    <Tabs defaultValue="men" className="w-full">
        <div className="flex flex-col items-center">
            <TabsList className="h-auto">
                {topRowCategories.map(section => (
                <TabsTrigger key={section.id} value={section.id}>{section.title}</TabsTrigger>
                ))}
            </TabsList>
            <TabsList className="h-auto mt-2">
                {bottomRowCategories.map(section => (
                <TabsTrigger key={section.id} value={section.id}>{section.title}</TabsTrigger>
                ))}
            </TabsList>
        </div>
      <AnimatePresence mode="wait">
        {pricingSections.map(section => {
          const Comp = section.component;
          if (!hasResults && !['shoes', 'repairs'].includes(section.id)) return null;

          return (
            <TabsContent key={section.id} value={section.id}>
              <motion.div
                key={section.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='mt-8'
              >
                {section.props.data.length > 0 || ['shoes', 'repairs'].includes(section.id) ? (
                  // @ts-ignore
                  <Comp {...section.props} />
                ) : (
                  <NoResultsFound />
                )}
              </motion.div>
            </TabsContent>
          );
        })}
        {!hasResults && (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='mt-8'
            >
                <NoResultsFound />
            </motion.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
}
