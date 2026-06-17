"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { products } from '@/models/Product'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

// Format price in Indian Rupees
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ProductsPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return b.featured ? 1 : -1;
    }
  });

  const addToWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.src || '',
      category: product.category
    });
  };

  const handleBuyNow = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.src || '',
      category: product.category
    });
    router.push('/checkout');
  };

  return (
    <main>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2"
              aria-label="Filter by category"
              title="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="shoes">Shoes</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2"
              aria-label="Sort products"
              title="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <p className="text-gray-600">
            Showing {sortedProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-square">
                <Image
                  src={product.images[0]?.src || ''}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </div>
                )}
                <button 
                  onClick={() => addToWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition-all duration-300"
                  aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {wishlist.includes(product.id) ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-accent">{formatPrice(product.price)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
                      aria-label={`Add ${product.name} to cart`}
                      title={`Add ${product.name} to cart`}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                      aria-label={`Buy ${product.name} now`}
                      title={`Buy ${product.name} now`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
} 