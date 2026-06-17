"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

const shoesCollection = [
  {
    id: 1,
    name: 'Classic Leather Sneakers',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'men',
    description: 'Premium leather sneakers with comfortable cushioning',
    rating: 4.8,
    reviewCount: 124,
    isNew: true
  },
  {
    id: 2,
    name: 'Running Shoes',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28',
    category: 'unisex',
    description: 'Lightweight running shoes with advanced support',
    rating: 4.6,
    reviewCount: 89,
    isNew: false
  },
  {
    id: 3,
    name: 'Casual Loafers',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a',
    category: 'men',
    description: 'Comfortable loafers for everyday wear',
    rating: 4.5,
    reviewCount: 67,
    isNew: true
  },
  {
    id: 4,
    name: 'Designer Heels',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    category: 'women',
    description: 'Elegant heels for special occasions',
    rating: 4.7,
    reviewCount: 45,
    isNew: true
  }
];

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ShoesCollection() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof shoesCollection[0] | null>(null);

  const addToWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleAddToCart = (product: typeof shoesCollection[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert("Item added to cart!");
  };

  const handleBuyNow = (product: typeof shoesCollection[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    router.push('/checkout');
  };

  const openQuickView = (product: typeof shoesCollection[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Premium Footwear Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step into style with our curated collection of high-quality shoes. From casual to formal, 
            we offer the perfect pair for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shoesCollection.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                )}
                <button 
                  onClick={(e) => addToWishlist(product.id, e)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition-all duration-300"
                >
                  {wishlist.includes(product.id) ? (
                    <FaHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={(e) => openQuickView(product, e)}
                >
                  <span className="text-sm font-medium flex items-center justify-center">Quick View</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-accent">{formatPrice(product.price)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(product, e)}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{quickViewProduct.name}</h2>
                  <button
                    onClick={closeQuickView}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-square">
                    <Image
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-gray-600 mb-4">{quickViewProduct.description}</p>
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Price</h3>
                      <p className="text-2xl font-bold text-accent">{formatPrice(quickViewProduct.price)}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Rating</h3>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">
                              {i < Math.floor(quickViewProduct.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">({quickViewProduct.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={(e) => handleAddToCart(quickViewProduct, e)}
                        className="flex-1 bg-accent text-white py-3 rounded-md hover:bg-accent/90 transition-colors"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => handleBuyNow(quickViewProduct, e)}
                        className="flex-1 bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/shoes"
            className="inline-block bg-accent text-white px-8 py-3 rounded-md hover:bg-accent/90 transition-colors"
          >
            View All Shoes
          </Link>
        </div>
      </div>
    </section>
  );
} 