import { mensPricing } from './mens-pricing';
import { womensPricing } from './womens-pricing';
import { sareePricing } from './saree-pricing';
import { accessoriesPricing } from './accessories-pricing';
import { carpetAndCurtainPricing } from './carpet-and-curtain-pricing';
import { homeLinenPricing } from './home-linen-pricing';
import { washAndFoldPricing } from './wash-and-fold-pricing';

export type Product = {
    product: string;
    price: number;
};

export type ProductCategory = {
    id: string;
    title: string;
    products: Product[];
};

const parsePrice = (priceString: string | undefined): number => {
    if (!priceString || priceString === '-') return 0;
    // Takes the first number from a string like "210-275"
    return parseFloat(priceString.split('-')[0]);
};

const getProductsFromPricing = (pricingData: any[], priceKey: string): Product[] => {
    return pricingData.map(item => ({
        product: item.product,
        price: parsePrice(item.prices ? item.prices[priceKey] : item.price),
    }));
};

const getSimpleProducts = (pricingData: {product: string, price: string}[]): Product[] => {
    return pricingData.map(item => ({
        product: item.product,
        price: parsePrice(item.price)
    }));
}

export const allProductCategories: ProductCategory[] = [
    {
        id: 'men',
        title: 'Men',
        products: getProductsFromPricing(mensPricing, 'dryClean'),
    },
    {
        id: 'ladies-wear',
        title: 'Ladies Wear',
        products: getProductsFromPricing(womensPricing, 'dryClean'),
    },
    {
        id: 'sarees',
        title: 'Sarees',
        products: getProductsFromPricing(sareePricing, 'dryClean'),
    },
    {
        id: 'home-linen',
        title: 'Home Linen',
        products: getSimpleProducts(homeLinenPricing),
    },
    {
        id: 'accessories',
        title: 'Accessories',
        products: getSimpleProducts(accessoriesPricing),
    },
    {
        id: 'carpet-curtain',
        title: 'Carpet and Curtain',
        products: getProductsFromPricing(carpetAndCurtainPricing, 'dryClean'),
    },
    {
      id: 'wash-fold',
      title: 'Regular Wash and Iron / Wash & Fold',
      products: getProductsFromPricing(washAndFoldPricing, 'regularWashAndIron'),
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
