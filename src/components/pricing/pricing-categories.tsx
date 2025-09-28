
'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Card,
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
                                <p className='text-muted-foreground'>{service}</p>
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

export default function PricingCategories({ searchQuery }: { searchQuery: string }) {
  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter(item =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const pricingSections = useMemo(() => [
    { id: 'men', title: 'Men', data: filterData(mensPricing) },
    { id: 'ladies-wear', title: 'Ladies Wear', data: filterData(womensPricing) },
    { id: 'sarees', title: 'Sarees', data: filterData(sareePricing) },
    { id: 'home-linen', title: 'Home Linen', data: filterData(homeLinenPricing) },
    { id: 'accessories', title: 'Accessories', data: filterData(accessoriesPricing) },
    { id: 'carpet-curtain', title: 'Carpet and Curtain', data: filterData(carpetAndCurtainPricing) },
    { id: 'wash-fold', title: 'Regular Wash & Fold', data: filterData(washAndFoldPricing) },
    { id: 'shoes', title: 'Shoes - Cleaning', data: [] },
    { id: 'repairs', title: 'Repairs Service', data: [] },
  ], [searchQuery]);

  const hasResults = pricingSections.some(section => section.data.length > 0);
  
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
          const data = section.data;

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
                {data.length > 0 ? (
                    data.map((item: any, index: number) => <PricingCard key={index} item={item} />)
                ) : (
                  (section.id === 'shoes' || section.id === 'repairs') ?
                  <div className="text-center p-8 text-muted-foreground">Coming Soon!</div> :
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
