"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCardIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'
import { orderStorage } from '@/utils/orderStorage'
import { FaCreditCard, FaMoneyBillWave, FaQrcode } from 'react-icons/fa'

// Function to format price in INR
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Function to safely store data in sessionStorage with fallback
const safeSessionStorage = {
  setItem: (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('SessionStorage not available:', e);
      // Could implement a cookie fallback here if needed
      return false;
    }
  },
  getItem: (key: string) => {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      console.error('SessionStorage not available:', e);
      return null;
    }
  }
};

type PaymentMethod = 'card' | 'upi' | 'cod'

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate totals for order summary using useMemo
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 4000 ? 0 : 400;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cartItems]);

  // Mark field as touched when user interacts with it
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'postalCode') {
      formattedValue = value.replace(/\D/g, '').slice(0, 6);
    }
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Basic validation
  const getValidationError = (name: string, value: string) => {
    if (!value) return 'This field is required';
    if (name === 'email') {
      return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Validate all fields
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setTouched(prev => ({ ...prev, [key]: true }));
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
      }
    }
    // Save shipping info to sessionStorage
    try {
      sessionStorage.setItem('shippingInfo', JSON.stringify(formData));
      router.push('/checkout/payment');
    } catch (err) {
      setError('Failed to save shipping info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to checkout</h1>
          <button
            onClick={() => router.push('/login')}
            className="rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/products')}
            className="rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50">
        <div className="container py-16">
          <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
            <div className="ml-auto flex space-x-6 text-sm">
              <div className="flex items-center text-gray-600">
                <ShieldCheckIcon className="h-5 w-5 mr-1 text-green-500" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TruckIcon className="h-5 w-5 mr-1 text-primary" />
                <span>Free Shipping over ₹4,000</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    Shipping information
                    <TruckIcon className="ml-2 h-5 w-5 text-primary" />
                  </h2>
                  <div className="mt-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First name <span className="text-red-500">*</span>
                        </label>
                          <div className="mt-1 relative">
                          <input
                            type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            autoComplete="given-name"
                              className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                                ${touched.firstName && !formData.firstName ? 'border-red-300' : 'border-gray-300'}`}
                          />
                            {touched.firstName && !formData.firstName && (
                              <p className="mt-1 text-xs text-red-500">First name is required</p>
                            )}
                          </div>
                      </div>

                      <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            autoComplete="family-name"
                              className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                                ${touched.lastName && !formData.lastName ? 'border-red-300' : 'border-gray-300'}`}
                          />
                            {touched.lastName && !formData.lastName && (
                              <p className="mt-1 text-xs text-red-500">Last name is required</p>
                            )}
                          </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            autoComplete="email"
                              className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                                ${touched.email && getValidationError('email', formData.email) ? 'border-red-300' : 'border-gray-300'}`}
                          />
                            {touched.email && getValidationError('email', formData.email) && (
                              <p className="mt-1 text-xs text-red-500">{getValidationError('email', formData.email)}</p>
                            )}
                          </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="address"
                            name="address"
                              value={formData.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            autoComplete="street-address"
                              className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                                ${touched.address && !formData.address ? 'border-red-300' : 'border-gray-300'}`}
                          />
                            {touched.address && !formData.address && (
                              <p className="mt-1 text-xs text-red-500">Address is required</p>
                            )}
                          </div>
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="city"
                            name="city"
                              value={formData.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            autoComplete="address-level2"
                              className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                                ${touched.city && !formData.city ? 'border-red-300' : 'border-gray-300'}`}
                          />
                            {touched.city && !formData.city && (
                              <p className="mt-1 text-xs text-red-500">City is required</p>
                            )}
                          </div>
                      </div>

                      <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            Postal code <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            autoComplete="postal-code"
                              className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm
                                ${touched.postalCode && !formData.postalCode ? 'border-red-300' : 'border-gray-300'}`}
                          />
                            {touched.postalCode && !formData.postalCode && (
                              <p className="mt-1 text-xs text-red-500">Postal code is required</p>
                            )}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full rounded-md bg-accent px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-accent/90 ${
                      loading ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                  >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order summary</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6 px-6">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/product/${product.id}`}>{product.name}</Link>
                            </h3>
                            <p className="ml-4">{formatPrice(product.price * product.quantity)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty: {product.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 py-6 px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{formatPrice(subtotal)}</p>
                  </div>
                  <div className="flex justify-between text-base text-gray-500 mt-2">
                    <p>Shipping</p>
                    <p>{shipping === 0 ? 'Free' : formatPrice(shipping)}</p>
                  </div>
                  <div className="flex justify-between text-base text-gray-500 mt-2">
                    <p>Tax (5%)</p>
                    <p>{formatPrice(tax)}</p>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
                    <p>Order total</p>
                    <p>{formatPrice(total)}</p>
                  </div>
                </div>
              </div>

              {/* Security and Info */}
              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center"><ShieldCheckIcon className="h-5 w-5 mr-2"/> Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
} 