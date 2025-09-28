
'use client';

import { useMemo, useState } from 'react';
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
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const NoResultsFound = () => (
  <div className="text-center text-muted-foreground py-8 col-span-full">
    <p>No matching products found.</p>
  </div>
);

const PricingCard = ({ item }: { item: any }) => {
    const [activeSub, setActiveSub] = useState(item.subCategories[0].name);
    const activeSubData = item.subCategories.find((sc: any) => sc.name === activeSub);
    const itemImage = PlaceHolderImages.find(img => img.id === item.imageId);

    return (
        <Card className="w-full flex items-center justify-between p-4 border-b-2 hover:shadow-lg transition-shadow duration-300">
            <div className='flex-1'>
                <h3 className="font-bold text-lg">{item.product}</h3>
                <div className='flex flex-wrap gap-2 my-2'>
                    {item.subCategories.map((sc: any) => (
                        <Badge 
                            key={sc.name}
                            variant={activeSub === sc.name ? 'default' : 'secondary'}
                            onClick={() => setActiveSub(sc.name)}
                            className="cursor-pointer"
                        >
                            {sc.name}
                        </Badge>
                    ))}
                </div>
                <div className='flex gap-4 text-sm mt-2'>
                    {activeSubData && Object.entries(activeSubData.prices).map(([service, price]) => (
                        price !== '-' && (
                            <div key={service}>
                                <p className='text-muted-foreground'>{service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                                <p className='font-semibold'>₹{price}/pc</p>
                            </div>
                        )
                    ))}
                </div>
            </div>
            {itemImage && (
                <div className='w-24 h-24 relative hidden sm:block'>
                    <Image
                        src={itemImage.imageUrl}
                        alt={item.product}
                        data-ai-hint={itemImage.imageHint}
                        fill
                        className="object-contain"
                    />
                </div>
            )}
        </Card>
    );
};


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
                    {item.prices[key] !== '-' ? `₹${item.prices[key]}` : '-'}
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
                <TableCell className="text-center tabular-nums">₹{item.price}</TableCell>
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
      isNew: true,
      data: filterData(mensPricing),
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
        component: () => <div className="text-center p-8 text-muted-foreground">Coming Soon!</div>,
        props: { data: [] }
    },
    {
        id: 'repairs',
        title: 'Repairs Service',
        component: () => <div className="text-center p-8 text-muted-foreground">Coming Soon!</div>,
        props: { data: [] }
    },
  ], [searchQuery]);

  const hasResults = pricingSections.some(section => section.id === 'shoes' || section.id === 'repairs' || (section.isNew ? section.data.length > 0 : section.props.data.length > 0) );
  
  return (
    <Tabs defaultValue="men" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="h-auto">
                {pricingSections.map(section => (
                <TabsTrigger key={section.id} value={section.id}>{section.title}</TabsTrigger>
                ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

      <AnimatePresence mode="wait">
        {pricingSections.map(section => {
          const Comp = section.component;
          const data = section.isNew ? section.data : section.props.data;

          return (
            <TabsContent key={section.id} value={section.id}>
              <motion.div
                key={section.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='mt-8 space-y-4'
              >
                {data.length > 0 || ['shoes', 'repairs'].includes(section.id) ? (
                    section.isNew ? (
                        data.map((item: any, index: number) => <PricingCard key={index} item={item} />)
                    ) : (
                        // @ts-ignore
                        <Comp {...section.props} />
                    )
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
