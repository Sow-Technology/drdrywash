'use client';

import { motion } from 'framer-motion';
import { stores } from '@/lib/stores';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
  </svg>
);

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const results = stores.filter((store) =>
      store.address.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredStores(results);
  };

  const handleShowAll = () => {
    setFilteredStores(stores);
    setSearchQuery('');
  };

  return (
    <motion.div
      className="container py-12 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.h1
          className="text-4xl font-bold tracking-tight font-headline sm:text-5xl"
          variants={itemVariants}
        >
          Find Nearest Store to you
        </motion.h1>

        <motion.div
          className="mt-8 max-w-lg mx-auto flex flex-col items-center gap-4"
          variants={itemVariants}
        >
          <Input
            type="text"
            placeholder="Enter a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-base"
          />
          <div className="flex gap-4">
            <Button onClick={handleShowAll} variant="secondary">
              All Stores
            </Button>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={sectionVariants}
      >
        {filteredStores.map((store, index) => {
          const cleanedPhone = store.phone.replace(/[^\d]/g, '');
          const whatsappLink = `https://wa.me/${cleanedPhone}`;

          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{store.name}</CardTitle>
                    <Badge
                      variant={
                        store.type === 'company' ? 'default' : 'secondary'
                      }
                    >
                      {store.type === 'company'
                        ? 'Company Store'
                        : 'Partner Store'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-muted-foreground" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        store.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {store.address}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <a
                      href={`tel:${cleanedPhone}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
      {filteredStores.length === 0 && (
        <motion.div
          className="text-center text-muted-foreground py-16"
          variants={itemVariants}
        >
          <p>No stores found for your search.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
