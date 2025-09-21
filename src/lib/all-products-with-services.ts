import { mensPricing } from './mens-pricing';
import { womensPricing } from './womens-pricing';
import { sareePricing } from './saree-pricing';
import { accessoriesPricing } from './accessories-pricing';
import { carpetAndCurtainPricing } from './carpet-and-curtain-pricing';
import { homeLinenPricing } from './home-linen-pricing';
import { washAndFoldPricing } from './wash-and-fold-pricing';

export type Service = {
    name: string;
    price: number;
};

export type ProductWithServices = {
    name: string;
    services: Service[];
};

export type ProductCategoryWithServices = {
    id: string;
    title: string;
    products: ProductWithServices[];
};

const parsePrice = (priceString: string | undefined): number => {
    if (!priceString || priceString === '-') return 0;
    return parseFloat(priceString.split('-')[0]);
};

const transformPricingData = (pricingData: any[]): ProductWithServices[] => {
    return pricingData.map(item => {
        const services: Service[] = [];
        if (item.prices) {
            for (const [key, value] of Object.entries(item.prices)) {
                if (value !== '-') {
                    const serviceName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    services.push({ name: serviceName, price: parsePrice(value as string) });
                }
            }
        } else if (item.price) {
             services.push({ name: 'Standard', price: parsePrice(item.price) });
        }
        return {
            name: item.product,
            services: services,
        };
    });
};

export const allProductCategoriesWithServices: ProductCategoryWithServices[] = [
    {
        id: 'men',
        title: 'Men',
        products: transformPricingData(mensPricing),
    },
    {
        id: 'ladies-wear',
        title: 'Ladies Wear',
        products: transformPricingData(womensPricing),
    },
    {
        id: 'sarees',
        title: 'Sarees',
        products: transformPricingData(sareePricing),
    },
    {
        id: 'home-linen',
        title: 'Home Linen',
        products: transformPricingData(homeLinenPricing),
    },
    {
        id: 'accessories',
        title: 'Accessories',
        products: transformPricingData(accessoriesPricing),
    },
    {
        id: 'carpet-curtain',
        title: 'Carpet and Curtain',
        products: transformPricingData(carpetAndCurtainPricing),
    },
    {
      id: 'wash-fold',
      title: 'Regular Wash and Iron / Wash & Fold',
      products: transformPricingData(washAndFoldPricing),
    },
     {
        id: 'shoes',
        title: 'Shoes - Cleaning and Conditioning',
        products: [], // Coming soon
    },
    {
        id: 'repairs',
        title: 'Repairs Service',
        products: [], // Coming soon
    },
];
