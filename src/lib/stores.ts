export type Store = {
  name: string;
  address: string;
  phone: string;
  type: 'company' | 'partner';
};

export const stores: Store[] = [
  {
    name: 'Dr. Dry Wash - Main Branch',
    address: '984 Wintergreen Rd, Tucker, GA 30084',
    phone: '712-336-2459',
    type: 'company',
  },
  {
    name: 'Dr. Dry Wash - Downtown',
    address: '456 Oak Avenue, Springfield, IL 62704',
    phone: '217-555-1234',
    type: 'company',
  },
  {
    name: 'FreshFold Express',
    address: '789 Pine Ln, Springfield, IL',
    phone: '(555) 234-5678',
    type: 'partner',
  },
  {
    name: 'Sparkle Cleaners',
    address: '321 Birch Blvd, Shelbyville, IL',
    phone: '(555) 876-5432',
    type: 'partner',
  },
];
