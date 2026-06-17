"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaShoppingCart, FaTimes, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'

const shirts = [
  { color: 'Light Blue', price: 4199 },
  { color: 'Dark Gray', price: 4199 },
  { color: 'Coral Pink', price: 4199 },
  { color: 'Navy Blue', price: 4199 },
  { color: 'Light Blue Striped', price: 4599 },
  { color: 'White', price: 3699 },
  { color: 'Charcoal', price: 4199 },
  { color: 'Light Gray', price: 4199 },
  { color: 'Pink', price: 4199 },
  { color: 'Blue', price: 4199 },
  { color: 'Sky Blue', price: 4199 },
  { color: 'Light Gray Striped', price: 4599 },
];

const shirtImages = [
  "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/2058664/pexels-photo-2058664.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/6764031/pexels-photo-6764031.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/6764507/pexels-photo-6764507.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/6069530/pexels-photo-6069530.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/6121448/pexels-photo-6121448.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/6712057/pexels-photo-6712057.jpeg?auto=compress&cs=tinysrgb",
];

// Function to format price in INR
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ShirtCollection() {
  const { addToCart, cartCount } = useCart();
  
  const [quickViewProduct, setQuickViewProduct] = useState<{
    color: string;
    price: number;
    image: string;
    index: number;
  } | null>(null);

  const openQuickView = (shirt: typeof shirts[0], image: string, index: number) => {
    setQuickViewProduct({
      color: shirt.color,
      price: shirt.price,
      image,
      index
    });
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart({
        id: 300 + quickViewProduct.index, // Using a base ID of 300 to avoid conflicts
        name: `${quickViewProduct.color} Shirt`,
        price: quickViewProduct.price,
        image: quickViewProduct.image,
        category: 'men'
      });
      alert(`Added ${quickViewProduct.color} Shirt to cart!`);
      closeQuickView();
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Shirt Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our selection of high-quality shirts perfect for any occasion.
            From casual to formal, we have the perfect fit for you.
          </p>
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {shirts.map((shirt, index) => (
            <div key={index} className="group">
              <div className="relative h-[350px] overflow-hidden bg-gray-100 rounded-md mb-3">
                <Image
                  src={shirtImages[index]}
                  alt={`${shirt.color} Shirt`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => openQuickView(shirt, shirtImages[index], index)}
                >
                  <span className="text-sm font-medium flex items-center justify-center">Quick View</span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900">{shirt.color} Shirt</h3>
              <p className="text-gray-700">{formatPrice(shirt.price)}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/men/shirts">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors" aria-label="View all shirts">
              View All Shirts
            </button>
          </Link>
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
                    alt={`${quickViewProduct.color} Shirt`} 
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Right side - Content */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold">{quickViewProduct.color} Shirt</h3>
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
                      <span className="ml-2 text-sm text-gray-500">(32 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-gray-600">
                      This premium {quickViewProduct.color.toLowerCase()} shirt is crafted from 100% cotton with a comfortable fit and excellent durability. Perfect for casual outings or formal occasions.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Size</h4>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button 
                          key={size}
                          className="h-10 w-10 border border-gray-300 flex items-center justify-center rounded hover:border-primary hover:bg-primary/5"
                          aria-label={`Select size ${size}`}
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
                      aria-label="Add to cart"
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                    
                    <Link href={`/product/${quickViewProduct.index + 1}`}>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-md transition-colors" aria-label="View product details">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 