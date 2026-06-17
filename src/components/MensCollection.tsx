"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaShoppingCart, FaTimes, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'

// Define product items with appropriate details
const collectionItems = [
  { id: 201, name: "Blue Casual Shirt", price: 4199, category: "men" },
  { id: 202, name: "Black Formal Suit", price: 24999, category: "men" },
  { id: 203, name: "Gray Sweatshirt", price: 3699, category: "men" },
  { id: 204, name: "Denim Jacket", price: 5499, category: "men" },
  { id: 205, name: "Brown Jacket", price: 6999, category: "men" },
  { id: 206, name: "Casual T-Shirt", price: 2499, category: "men" },
  { id: 207, name: "White Shirt", price: 3999, category: "men" },
  { id: 208, name: "Striped Shirt", price: 4299, category: "men" },
  { id: 209, name: "Navy Blue Jacket", price: 7499, category: "men" },
  { id: 210, name: "Leather Jacket", price: 9999, category: "men" },
  { id: 211, name: "Summer T-Shirt", price: 2799, category: "men" },
  { id: 212, name: "Formal Blazer", price: 8999, category: "men" },
];

const collectionImages = [
  "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/3760233/pexels-photo-3760233.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1049317/pexels-photo-1049317.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb"
];

// Function to format price in INR
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function MensCollection() {
  const { addToCart, cartCount } = useCart();
  
  const [quickViewProduct, setQuickViewProduct] = useState<{
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  } | null>(null);

  const openQuickView = (product: typeof collectionItems[0], image: string) => {
    setQuickViewProduct({
      ...product,
      image
    });
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct);
      alert(`Added ${quickViewProduct.name} to cart!`);
      closeQuickView();
    }
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Hero Image */}
          <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg bg-neutral-100">
            <div className="absolute top-0 left-0 p-3 md:p-5 bg-white/80 backdrop-blur-sm rounded-br-lg z-10">
              <p className="text-sm text-neutral-500 font-medium">FASHIONKIDUNIYA</p>
            </div>
            <Image 
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb"
              alt="Men's Fashion Collection" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Men's Clothing Collection</h2>
            <p className="text-lg text-neutral-600">Elevate your style with our premium selection of men's fashion essentials. Crafted for the modern gentleman.</p>
            
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-neutral-900">25% OFF</span>
              <span className="text-lg text-neutral-500 line-through">Regular Price</span>
            </div>
            
            <Link href="/men">
              <button className="px-6 py-3 bg-neutral-900 text-white font-medium rounded hover:bg-neutral-800 transition-colors">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
        
        {/* Cart Icon with Counter */}
        <div className="fixed top-24 right-8 z-40">
          <div className="relative bg-white rounded-full p-3 shadow-lg">
            <FaShoppingBag className="text-primary text-xl" />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </div>
            )}
          </div>
        </div>
        
        {/* Collection Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-8">Explore Our Collection</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collectionItems.map((item, index) => (
              <div key={index} className="group relative h-[300px] overflow-hidden rounded-lg bg-neutral-100">
                <Image 
                  src={collectionImages[index]}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => openQuickView(item, collectionImages[index])}
                >
                  <span className="text-sm font-medium flex items-center justify-center">Quick View</span>
                </div>
                <div className="absolute top-2 right-2 bg-white/80 text-primary px-2 py-1 text-xs font-bold rounded">
                  {formatPrice(item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                <Image 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Right side - Content */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold">{quickViewProduct.name}</h3>
                  <button 
                    onClick={closeQuickView}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                
                <div className="mt-4">
                  <p className="text-accent font-bold text-xl">{formatPrice(quickViewProduct.price)}</p>
                  <div className="mt-2 flex items-center">
                    <div className="flex text-yellow-400">
                      <span className="text-sm">★★★★☆</span>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">(28 reviews)</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600">
                    This premium {quickViewProduct.name.toLowerCase()} is crafted with high-quality materials for comfort and durability. Perfect for any occasion, this {quickViewProduct.category} item will elevate your style.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Size</h4>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button 
                        key={size}
                        className="h-10 w-10 border border-gray-300 flex items-center justify-center rounded hover:border-primary hover:bg-primary/5"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Cart Info */}
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Cart</h4>
                  <p className="text-gray-600 text-sm">
                    Current items in cart: <span className="font-bold text-primary">{cartCount}</span>
                  </p>
                </div>
                
                <div className="mt-auto pt-6 flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaShoppingCart />
                    <span>Add to Cart</span>
                  </button>
                  
                  <Link href={`/product/${quickViewProduct.id}`}>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-md transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
} 