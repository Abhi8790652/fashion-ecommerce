"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaStarHalfAlt, FaShoppingCart, FaHeart, FaRegHeart, FaRegEye } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  isNew?: boolean
  rating?: number
}

export default function ProductCard({ id, name, price, image, isNew = false, rating = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  // Function to format the price with currency symbol
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    // Add empty stars to make it always 5 stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart functionality would go here
    alert(`Added ${name} to cart!`);
  };
  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart and redirect to checkout
    handleAddToCart(e);
    router.push('/checkout');
  };
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };
  
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image 
            src={image} 
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {isNew && (
            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}
          
          {/* Overlay with quick actions */}
          <div 
            className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <FaShoppingCart />
            </button>
            <button
              onClick={toggleWishlist}
              className="bg-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
            <Link
              href={`/products/${id}`}
              className="bg-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <FaRegEye />
            </Link>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-sm">
              {renderStars(rating)}
            </div>
            <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>
          <div className="font-bold text-primary">{formatPrice(price)}</div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-accent hover:bg-accent-dark text-white py-2 px-4 rounded-md transition-colors"
              aria-label="Buy now"
            >
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
} 