"use client"

import { useState, useEffect } from 'react'
import { FaFilter, FaHome, FaArrowUp, FaShoppingCart } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products } from '@/models/Product'

const filterOptions = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'shirts', label: 'Shirts' },
      { value: 't-shirts', label: 'T-Shirts' },
      { value: 'jeans', label: 'Jeans' },
      { value: 'pants', label: 'Pants' },
      { value: 'jackets', label: 'Jackets' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: 'xxl', label: 'XXL' },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'black', label: 'Black' },
      { value: 'blue', label: 'Blue' },
      { value: 'gray', label: 'Gray' },
      { value: 'brown', label: 'Brown' },
    ],
  },
]

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

export default function MenPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    price: [0, 5000] as [number, number],
    sortBy: 'newest'
  });

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (category: string) => {
    if (activeFilters.category.includes(category)) {
      setActiveFilters({
        ...activeFilters,
        category: activeFilters.category.filter(c => c !== category)
      });
    } else {
      setActiveFilters({
        ...activeFilters,
        category: [...activeFilters.category, category]
      });
    }
  };

  const handlePriceChange = (value: [number, number]) => {
    setActiveFilters({
      ...activeFilters,
      price: value
    });
  };

  const handleSortChange = (value: typeof activeFilters.sortBy) => {
    setActiveFilters({
      ...activeFilters,
      sortBy: value
    });
  };

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    // Ensure only men's products are considered for this page
    if (product.category !== 'men') {
      return false;
    }

    // Subcategory filter (from filterOptions in men/page.tsx)
    if (activeFilters.category.length > 0 && !(product.subcategory && activeFilters.category.includes(product.subcategory))) {
      return false;
    }
    
    // Price filter
    if (product.price < activeFilters.price[0] || product.price > activeFilters.price[1]) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeFilters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return a.newArrival ? -1 : b.newArrival ? 1 : 0;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <>
      <Navbar />
      
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1920&q=80"
            alt="Men's Fashion"
            fill
            priority
            style={{objectFit: "cover"}}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Men's Collection</h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Explore our latest men's fashion collection, featuring casual styles, formal wear, and accessories.
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="container py-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="hidden lg:block">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>

              <div className="mt-4 divide-y divide-gray-200">
                {filterOptions.map((filter) => (
                  <div key={filter.id} className="py-6">
                    <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                    <div className="mt-2 space-y-2">
                      {filter.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${filter.id}-${option.value}`}
                            name={`${filter.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                          />
                          <label
                            htmlFor={`${filter.id}-${option.value}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Men's Products</h2>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="mr-3 p-2 text-gray-500 lg:hidden"
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    aria-label="Toggle filter menu"
                  >
                    <FaFilter className="h-5 w-5" />
                  </button>
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-accent focus:outline-none focus:ring-accent sm:text-sm"
                    defaultValue="Most Popular"
                    aria-label="Sort products by"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Banners */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80" 
                    alt="Shirts"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700/70 to-transparent flex items-center">
                    <h3 className="text-white text-2xl font-bold ml-6">Shirts</h3>
                  </div>
                </div>
                
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80" 
                    alt="Jeans"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/70 to-transparent flex items-center">
                    <h3 className="text-white text-2xl font-bold ml-6">Jeans</h3>
                  </div>
                </div>
                
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80" 
                    alt="Jackets"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/70 to-transparent flex items-center">
                    <h3 className="text-white text-2xl font-bold ml-6">Jackets</h3>
                  </div>
                </div>
                
                <div className="relative h-40 overflow-hidden rounded-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e9?auto=format&fit=crop&w=800&q=80" 
                    alt="Accessories"
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 to-transparent flex items-center">
                    <h3 className="text-white text-2xl font-bold ml-6">Accessories</h3>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]?.src || ''}
                    isNew={product.newArrival}
                    rating={product.rating}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent/90 transition-colors"
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      <Footer />
    </>
  )
} 