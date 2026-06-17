"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useFeaturedProducts } from '@/contexts/FeaturedProductsContext'
import SimplePopup from '@/components/SimplePopup'

// Add formatPrice function to format currency in Indian Rupees
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useCart();
  const { featuredProducts, timeUntilNextRotation } = useFeaturedProducts();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  const addToWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };
  
  const handleAddToCart = (productId: number | undefined, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (productId === undefined) return;
    
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.src || '',
        category: product.category
      });
      alert("Item added to cart!");
    }
  };

  const handleBuyNow = (product: typeof featuredProducts[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.src || '',
      category: product.category
    });
    router.push('/checkout');
  };

  // Format time until next rotation
  const formatTimeUntilNextRotation = () => {
    const minutes = Math.floor(timeUntilNextRotation / 60000);
    const seconds = Math.floor((timeUntilNextRotation % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen">
      <SimplePopup />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Fashion Kiduniya</h1>
            <p className="text-xl mb-8">Discover the latest trends in fashion</p>
            <Link
              href="/products"
              className="bg-accent text-white px-8 py-3 rounded-md hover:bg-accent/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="text-sm text-gray-500">
              Next rotation in: {formatTimeUntilNextRotation()}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl">
                <div className="aspect-square w-full overflow-hidden bg-gray-200">
                  <Image
                    src={product.images[0]?.src || ''}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 px-3 py-1 bg-accent/80 text-white text-xs font-medium rounded-br-md">
                    NEW
                  </div>
                  <button 
                    onClick={(e) => addToWishlist(product.id, e)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-110 transition-all duration-300"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    {wishlist.includes(product.id) ? (
                      <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-accent">{formatPrice(product.price)}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleAddToCart(product.id, e)}
                        className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => handleBuyNow(product, e)}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        aria-label={`Buy ${product.name} now`}
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
      </section>

      <Footer />
    </main>
  );
} 