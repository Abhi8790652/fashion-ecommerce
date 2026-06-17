"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { XMarkIcon, ShoppingBagIcon, TrashIcon, ArrowRightIcon, ClockIcon, HeartIcon, TruckIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

// Function to format price in INR
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Sample recommended products
const recommendedProducts = [
  {
    id: 101,
    name: 'Casual Jacket',
    price: 3999,
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb',
    category: 'men',
  },
  {
    id: 102,
    name: 'Summer Top',
    price: 1799,
    image: 'https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg?auto=compress&cs=tinysrgb',
    category: 'women',
  },
  {
    id: 103,
    name: 'Denim Jeans',
    price: 2499,
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb',
    category: 'men',
  },
];

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedForLater, setSavedForLater] = useState<any[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Calculate estimated delivery date (3-5 business days from now)
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5); // 5 days from now
    
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.10 : 0;
  const shipping = subtotal > 4000 ? 0 : 400;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + shipping + tax;

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle quantity changes
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  // Handle coupon code application
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'fashion10') {
      setCouponApplied(true);
      toast.success('Coupon applied successfully! 10% discount added.');
    } else {
      toast.error('Invalid coupon code. Try FASHION10 for 10% off.');
    }
  };
  
  // Handle save for later
  const handleSaveForLater = (item: any) => {
    removeFromCart(item.id);
    setSavedForLater([...savedForLater, item]);
    toast.success(`${item.name} saved for later`);
  };
  
  // Handle move to cart
  const handleMoveToCart = (item: any, index: number) => {
    addToCart(item);
    setSavedForLater(savedForLater.filter((_, i) => i !== index));
    toast.success(`${item.name} moved to cart`);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  // Create some sample alternate images for products
  const getProductImages = (item: any) => {
    // This is a placeholder - in a real app, products would have their own image galleries
    const baseImage = item.image;
    return [
      baseImage,
      "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb",
      "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb"
    ];
  };
  
  // Handle image navigation
  const handleImageNav = (id: number, direction: 'prev' | 'next') => {
    const images = getProductImages({ id, image: '' });
    const currentIndex = activeImageIndex[id] || 0;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    
    setActiveImageIndex({
      ...activeImageIndex,
      [id]: newIndex
    });
  };

  return (
    <>
      <Navbar />
      
      <main className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
            {cartItems.length > 0 && (
              <button 
                onClick={() => {
                  clearCart();
                  toast.success('Cart cleared successfully');
                }}
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
            )}
          </div>
          
          {loading ? (
            // Loading skeleton
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="animate-pulse space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="h-24 w-24 bg-gray-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-24 w-24 bg-gray-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 mb-6">
                <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Start Shopping
              </Link>
              
              {savedForLater.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Saved for Later ({savedForLater.length})</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {savedForLater.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="relative h-40 w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">Category: {item.category}</p>
                          <p className="mt-1 text-lg font-medium text-primary">{formatPrice(item.price)}</p>
                          <button
                            onClick={() => handleMoveToCart(item, index)}
                            className="mt-3 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark text-sm"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 lg:mb-0">
                  <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm text-gray-700">
                        Estimated delivery by <span className="font-medium">{getEstimatedDeliveryDate()}</span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item) => {
                      const productImages = getProductImages(item);
                      const currentImageIndex = activeImageIndex[item.id] || 0;
                      
                      return (
                        <li key={item.id} className="p-6 flex flex-col sm:flex-row">
                          <div className="flex items-center flex-1">
                            <div className="flex-shrink-0 relative h-28 w-28 rounded-md overflow-hidden group">
                              <Image
                                src={productImages[currentImageIndex]}
                                alt={item.name}
                                fill
                                className="object-cover object-center transition duration-300 group-hover:scale-105"
                              />
                              
                              {/* Image navigation */}
                              {productImages.length > 1 && (
                                <>
                                  <button 
                                    onClick={() => handleImageNav(item.id, 'prev')}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-r p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Previous image"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                  </button>
                                  <button 
                                    onClick={() => handleImageNav(item.id, 'next')}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-l p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Next image"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                  </button>
                                </>
                              )}
                              
                              {/* Image indicators */}
                              {productImages.length > 1 && (
                                <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
                                  {productImages.map((_, idx) => (
                                    <span 
                                      key={idx} 
                                      className={`h-1.5 w-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="ml-4 flex-1">
                              <h3 className="font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">Category: {item.category}</p>
                              <div className="mt-2 flex items-center">
                                <p className="text-lg font-medium text-primary">{formatPrice(item.price)}</p>
                                <p className="ml-2 text-sm text-gray-500 line-through">{formatPrice(Math.round(item.price * 1.2))}</p>
                                <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">20% OFF</span>
                              </div>
                              <div className="mt-2 flex text-sm space-x-4">
                                <button
                                  onClick={() => handleSaveForLater(item)}
                                  className="flex items-center text-gray-500 hover:text-primary"
                                >
                                  <HeartIcon className="h-4 w-4 mr-1" />
                                  Save for later
                                </button>
                                <button
                                  onClick={() => {
                                    removeFromCart(item.id);
                                    toast.success(`${item.name} removed from cart`);
                                  }}
                                  className="flex items-center text-gray-500 hover:text-red-500"
                                  aria-label={`Remove ${item.name} from cart`}
                                >
                                  <TrashIcon className="h-4 w-4 mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-0 flex items-center">
                            <div className="flex border border-gray-300 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                aria-label={`Decrease quantity for ${item.name}`}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value)) {
                                    handleQuantityChange(item.id, value);
                                  }
                                }}
                                className="w-12 text-center border-x border-gray-300 py-1"
                                aria-label={`Quantity for ${item.name}`}
                                title={`Quantity for ${item.name}`}
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                aria-label={`Increase quantity for ${item.name}`}
                              >
                                +
                              </button>
                            </div>

                            <div className="ml-4 text-right">
                              <p className="text-sm text-gray-500">Item Total</p>
                              <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <Link 
                      href="/"
                      className="inline-flex items-center text-primary hover:text-primary-dark"
                    >
                      <span>Continue Shopping</span>
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                {/* Recommendations */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">You might also like</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                        <div className="relative h-48 w-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">{product.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">Category: {product.category}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="text-lg font-medium text-primary">{formatPrice(product.price)}</p>
                            <button 
                              onClick={() => {
                                addToCart(product);
                                toast.success(`${product.name} added to cart`);
                              }}
                              className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-4 mt-6 lg:mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                  
                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apply Coupon
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="FASHION10"
                        className="flex-1 min-w-0 block rounded-l-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponApplied}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md ${
                          couponApplied
                            ? 'bg-green-600 text-white'
                            : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                      >
                        {couponApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="mt-1 text-sm text-green-600">10% discount applied!</p>
                    )}
                  </div>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</p>
                      <p className="font-medium text-gray-900">{formatPrice(subtotal)}</p>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <p className="text-green-600">Discount (10%)</p>
                        <p className="font-medium text-green-600">-{formatPrice(discount)}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm border-t border-gray-200 pt-4">
                      <p className="text-gray-600">Shipping</p>
                      <div>
                        <p className="font-medium text-gray-900">
                          {shipping === 0 ? 'Free' : formatPrice(shipping)}
                        </p>
                        {shipping > 0 && (
                          <p className="text-xs text-gray-500">Free shipping on orders over ₹4,000</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Tax (5%)</p>
                      <p className="font-medium text-gray-900">{formatPrice(tax)}</p>
            </div>

                    <div className="flex justify-between text-base border-t border-gray-200 pt-4">
                      <p className="font-medium text-gray-900">Total</p>
                      <p className="font-bold text-primary">{formatPrice(total)}</p>
                    </div>
                  </div>
                  
                  {/* Delivery Information */}
                  <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-center mb-2">
                      <ClockIcon className="h-5 w-5 text-primary mr-2" />
                      <h4 className="text-sm font-medium text-gray-900">Delivery Information</h4>
                    </div>
                    <p className="text-sm text-gray-700">
                      Standard delivery: 3-5 business days
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Express delivery available at checkout
                    </p>
                </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                    <div className="mt-3 flex items-center justify-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">Secure Checkout</span>
                </div>
                </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Saved for Later section (when cart is not empty) */}
          {cartItems.length > 0 && savedForLater.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Saved for Later ({savedForLater.length})</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {savedForLater.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="mt-1 text-sm text-gray-500">Category: {item.category}</p>
                      <p className="mt-1 text-lg font-medium text-primary">{formatPrice(item.price)}</p>
                      <button
                        onClick={() => handleMoveToCart(item, index)}
                        className="mt-3 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark text-sm transition-colors"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  )
} 