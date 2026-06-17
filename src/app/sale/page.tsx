"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { TagIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/utils/formatPrice'
import { toast } from 'react-hot-toast'

// Sale products data
const saleProducts = [
  {
    id: 1,
    name: 'Women\'s Summer Floral Dress',
    href: '/women/dresses/summer-floral',
    price: 5999,
    salePrice: 3999,
    discount: 45,
    color: 'Floral',
    size: 'xs to free',
    imageSrc: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Model wearing a floral summer dress.',
    rating: 4.5,
    reviewCount: 38,
    category: 'women',
    featured: true,
  },
  {
    id: 2,
    name: 'Men\'s Classic Denim Jacket',
    href: '/men/outerwear/denim-jacket',
    price: 8999,
    salePrice: 5999,
    discount: 33,
    color: 'Blue',
    size: 'M to XXL',
    imageSrc: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Front view of men\'s denim jacket.',
    rating: 4.3,
    reviewCount: 42,
    category: 'men',
    featured: true,
  },
  {
    id: 3,
    name: 'Premium Leather Sneakers',
    href: '/men/shoes/leather-sneakers',
    price: 12999,
    salePrice: 7999,
    discount: 38,
    color: 'White/Brown',
    size: '7-12',
    imageSrc: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Pair of premium leather sneakers.',
    rating: 4.7,
    reviewCount: 56,
    category: 'shoes',
    featured: true,
  },
  {
    id: 4,
    name: 'Women\'s Casual Blouse',
    href: '/women/tops/casual-blouse',
    price: 4599,
    salePrice: 2999,
    discount: 35,
    color: 'Light Blue',
    size: 'XS to L',
    imageSrc: 'https://images.unsplash.com/photo-1512207849305-ce64f355d062?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Woman wearing a light blue casual blouse.',
    rating: 4.2,
    reviewCount: 29,
    category: 'women',
    featured: false,
  },
  {
    id: 5,
    name: 'Men\'s Slim Fit Chinos',
    href: '/men/pants/slim-chinos',
    price: 6999,
    salePrice: 4999,
    discount: 29,
    color: 'Khaki',
    size: '30-40',
    imageSrc: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Model wearing slim fit chino pants.',
    rating: 4.4,
    reviewCount: 31,
    category: 'men',
    featured: false,
  },
  {
    id: 6,
    name: 'Women\'s Leather Handbag',
    href: '/accessories/bags/leather-handbag',
    price: 14999,
    salePrice: 9999,
    discount: 33,
    color: 'Brown',
    size: 'One Size',
    imageSrc: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Brown leather women\'s handbag.',
    rating: 4.8,
    reviewCount: 47,
    category: 'accessories',
    featured: true,
  },
  {
    id: 7,
    name: 'Women\'s Evening Gown',
    href: '/women/dresses/evening-gown',
    price: 19999,
    salePrice: 12999,
    discount: 35,
    color: 'Black',
    size: 'S to XL',
    imageSrc: 'https://images.unsplash.com/photo-1586323287528-98793a464af5?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Model wearing a black evening gown.',
    rating: 4.9,
    reviewCount: 24,
    category: 'women',
    featured: false,
  },
  {
    id: 8,
    name: 'Men\'s Formal Suit',
    href: '/men/formal/suit',
    price: 29999,
    salePrice: 19999,
    discount: 33,
    color: 'Navy Blue',
    size: '38-48',
    imageSrc: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&auto=format&fit=crop&q=60',
    imageAlt: 'Man wearing a navy blue formal suit.',
    rating: 4.7,
    reviewCount: 36,
    category: 'men',
    featured: true,
  },
];

// Categories with sale items
const saleCategories = [
  { name: 'Women', href: '/women', count: saleProducts.filter(p => p.category === 'women').length },
  { name: 'Men', href: '/men', count: saleProducts.filter(p => p.category === 'men').length },
  { name: 'Accessories', href: '/accessories', count: saleProducts.filter(p => p.category === 'accessories').length },
  { name: 'Shoes', href: '/shoes', count: saleProducts.filter(p => p.category === 'shoes').length },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SalePage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('discount');
  
  const filteredProducts = selectedCategory === 'all' 
    ? saleProducts 
    : saleProducts.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discount - a.discount;
      case 'price-low-high':
        return a.salePrice - b.salePrice;
      case 'price-high-low':
        return b.salePrice - a.salePrice;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const featuredProducts = saleProducts.filter(product => product.featured);

  const handleAddToCart = (product: typeof saleProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.imageSrc,
      category: product.category
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&auto=format&fit=crop&q=60"
            alt="Sale banner"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-48 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">Seasonal Sale</h1>
          <p className="mt-4 text-xl text-white">
            Save up to 45% on selected items. Limited time offer.
          </p>
          <a
            href="#products"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Featured sale items */}
      <section aria-labelledby="featured-heading" className="relative mx-auto max-w-7xl px-4 pt-16 pb-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Featured Sale Items
          </h2>
          <a href="#all-products" className="text-sm font-semibold text-accent hover:text-accent/80">
            Browse all sale items<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <div className="relative h-72 w-full">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    priority={product.featured}
                    loading="eager"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-accent px-2 py-1 text-xs font-bold text-white">
                    -{product.discount}%
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-4 w-4 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(product.salePrice)}</p>
                  <p className="text-sm font-medium text-gray-400 line-through">{formatPrice(product.price)}</p>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCart(product)}
                className="mt-2 hidden group-hover:flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent/90"
              >
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sale benefits */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <TagIcon className="h-8 w-8 text-accent" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Exclusive Discounts</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Save up to 45% on selected items across our entire collection.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Free Shipping</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Free shipping on all sale items for orders over ₹4000.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Limited Time</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Sale ends soon. Get your favorite items before they're gone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All sale products */}
      <section id="all-products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 id="products-heading" className="sr-only">Sale products</h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
              <ul className="mt-4 space-y-4">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`${
                      selectedCategory === 'all'
                        ? 'font-medium text-accent'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    All Sale Items
                  </button>
                </li>
                {saleCategories.map((category) => (
                  <li key={category.name}>
                    <button
                      onClick={() => setSelectedCategory(category.name.toLowerCase())}
                      className={`${
                        selectedCategory === category.name.toLowerCase()
                          ? 'font-medium text-accent'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Sort By</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-accent focus:outline-none focus:ring-accent sm:text-sm"
                aria-label="Sort products by"
              >
                <option value="discount">Highest Discount</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <div className="relative h-72 w-full">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        priority={product.featured}
                        loading={product.featured ? "eager" : "lazy"}
                        className="object-cover object-center"
                      />
                      <div className="absolute top-2 right-2 rounded-full bg-accent px-2 py-1 text-xs font-bold text-white">
                        -{product.discount}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color} · {product.size}
                      </p>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                              'h-4 w-4 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(product.salePrice)}</p>
                      <p className="text-sm font-medium text-gray-400 line-through">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 hidden group-hover:flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent/90"
                  >
                    <ShoppingBagIcon className="mr-2 h-4 w-4" />
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="bg-accent">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="rounded-3xl bg-accent px-6 py-6 md:py-12 md:px-12 lg:px-16 lg:flex lg:items-center lg:justify-between xl:py-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              <span className="block">Want first access to sales?</span>
              <span className="block text-white">Sign up for our newsletter.</span>
            </h2>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border-white focus:border-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent rounded-md"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-white hover:bg-accent hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 transition-colors duration-300"
                >
                  Notify me
                </button>
              </form>
              <p className="mt-3 text-sm text-white">
                We care about your data. Read our{' '}
                <a href="#" className="font-medium text-white underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 