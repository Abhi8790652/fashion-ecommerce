"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { products } from '@/models/Product'

interface FeaturedProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  images: { src: string }[];
}

interface FeaturedProductsContextType {
  featuredProducts: FeaturedProduct[];
  timeUntilNextRotation: number;
}

const FeaturedProductsContext = createContext<FeaturedProductsContextType>({
  featuredProducts: [],
  timeUntilNextRotation: 0,
});

export const useFeaturedProducts = () => useContext(FeaturedProductsContext);

export const FeaturedProductsProvider = ({ children }: { children: ReactNode }) => {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [timeUntilNextRotation, setTimeUntilNextRotation] = useState(300000); // 5 minutes in milliseconds

  useEffect(() => {
    // Select 8 random products as featured
    const selectFeaturedProducts = () => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 8));
    };

    // Initial selection
    selectFeaturedProducts();

    // Set up rotation timer
    const rotationInterval = setInterval(() => {
      selectFeaturedProducts();
      setTimeUntilNextRotation(300000); // Reset timer
    }, 300000);

    // Update countdown timer
    const countdownInterval = setInterval(() => {
      setTimeUntilNextRotation(prev => Math.max(0, prev - 1000));
    }, 1000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <FeaturedProductsContext.Provider value={{ featuredProducts, timeUntilNextRotation }}>
      {children}
    </FeaturedProductsContext.Provider>
  );
}; 