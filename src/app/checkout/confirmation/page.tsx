"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleIcon, ChevronLeftIcon, ArrowRightIcon, DocumentDuplicateIcon, PrinterIcon, ClipboardDocumentCheckIcon, MapPinIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth, User as AuthUser } from '@/contexts/AuthContext';
import { orderStorage, Order } from '@/utils/orderStorage';
import { FaCheckCircle, FaShoppingBag, FaTruck, FaCreditCard } from 'react-icons/fa';

// Safe session storage accessor
const safeSessionStorage = {
  getItem: (key: string) => {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      console.error('SessionStorage not available:', e);
      return null;
    }
  }
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 2
  }).format(price);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Generate a random tracking number
function generateTrackingNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prefix = chars.charAt(Math.floor(Math.random() * chars.length)) + 
                chars.charAt(Math.floor(Math.random() * chars.length));
  const numbers = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `${prefix}${numbers}`;
}

// Get estimated shipping and delivery dates
function getEstimatedDates() {
  const today = new Date();
  
  // Shipping in 1-2 business days
  const shippingDate = new Date(today);
  shippingDate.setDate(today.getDate() + 1 + Math.floor(Math.random() * 2));
  
  // Delivery in 3-5 days after shipping
  const deliveryDate = new Date(shippingDate);
  deliveryDate.setDate(shippingDate.getDate() + 3 + Math.floor(Math.random() * 3));
  
  return {
    shipping: formatDate(shippingDate),
    delivery: formatDate(deliveryDate)
  };
}

// Delivery partners with placeholder images
const deliveryPartners = [
  {
    name: 'FastShip Express',
    logo: 'https://placehold.co/200x100/2563eb/ffffff?text=FastShip',
    website: 'https://fastship.example.com'
  },
  {
    name: 'Global Logistics',
    logo: 'https://placehold.co/200x100/16a34a/ffffff?text=Global+Logistics',
    website: 'https://globallogistics.example.com'
  },
  {
    name: 'SpeedPost',
    logo: 'https://placehold.co/200x100/d97706/ffffff?text=SpeedPost',
    website: 'https://speedpost.example.com'
  }
];

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <div className="bg-gray-200 h-8 w-3/4 mb-8 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 mb-4 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/3 mb-8 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 h-6 w-1/3 mb-4 rounded"></div>
          <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 w-1/2 mb-6 rounded"></div>
          
          <div className="bg-gray-200 h-6 w-1/3 mb-4 rounded"></div>
          <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 w-1/2 mb-6 rounded"></div>
        </div>
        <div>
          <div className="bg-gray-200 h-6 w-1/3 mb-4 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex space-x-4">
                <div className="bg-gray-200 h-16 w-16 rounded"></div>
                <div className="flex-1">
                  <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/4 mb-2 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingNumber] = useState(() => generateTrackingNumber());
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedPartner] = useState(() => deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)]);
  const [estimatedDates] = useState(() => getEstimatedDates());
  const confettiRef = useRef<HTMLDivElement>(null);
  const orderLoadAttemptsRef = useRef(0);
  const isMountedRef = useRef(true);
  
  // Calculate totals - ALWAYS call useMemo
  const { subtotal, shipping, tax, total } = useMemo(() => {
    if (!orderDetails) {
      return { subtotal: 0, shipping: 0, tax: 0, total: 0 }; // Provide default values when orderDetails is null
    }
    const subtotal = orderDetails.items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }, [orderDetails]);

  // Timeline steps - ALWAYS call useMemo
  const timeline = useMemo(() => [
    { label: 'Order Placed', icon: <CheckCircleIconSolid className="h-6 w-6 text-green-500" /> },
    { label: 'Processing', icon: <ArrowRightIcon className="h-6 w-6 text-blue-500" /> },
    { label: 'Shipped', icon: <TruckIcon className="h-6 w-6 text-yellow-500" /> },
    { label: 'Delivered', icon: <CheckCircleIcon className="h-6 w-6 text-gray-400" /> },
  ], []);

  // getPaymentMethodText - ALWAYS call useCallback
  const getPaymentMethodText = useCallback((method: Order['customer']['paymentMethod']) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card'
      case 'upi':
        return 'UPI'
      case 'cod':
        return 'Cash on Delivery'
      default:
        return method
    }
  }, []);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      setError('No order ID provided');
      setLoading(false);
      return;
    }

    const loadOrder = () => {
      if (!isMountedRef.current) return;

      try {
        const orders = orderStorage.getOrders();
        const order = orders.find(o => o.id === orderId);
        
        if (order) {
          setOrderDetails(order);
          setLoading(false);
          return;
        }

        // If order not found and we haven't exceeded retries, try again
        if (orderLoadAttemptsRef.current < 3) {
          orderLoadAttemptsRef.current += 1;
          setTimeout(loadOrder, 500);
          return;
        }

        // If we get here, order was not found after all attempts
        setError('Order not found');
        setLoading(false);
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    loadOrder();

    return () => {
      isMountedRef.current = false;
    };
  }, [searchParams]);

  // Handle copy tracking number
  const handleCopyTracking = useCallback(() => {
    navigator.clipboard.writeText(trackingNumber)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy tracking number: ', err);
      });
  }, [trackingNumber]);

  // Handle print
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Processing your order...</h2>
          <p className="mt-2 text-gray-600">Please wait while we confirm your purchase</p>
        </div>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Order not found</h2>
          <p className="mt-2 text-gray-600">We couldn't find the order you're looking for.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 mb-16 p-8 bg-white rounded-lg shadow-md">
        {/* Animated Success Banner */}
        <div className="flex flex-col items-center mb-8">
          <div ref={confettiRef} className="mb-4 animate-bounce">
            <FaCheckCircle className="h-16 w-16 text-green-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
        {/* Progress Timeline */}
        <div className="flex items-center justify-center mb-10">
          {timeline.map((step, idx) => (
            <div key={step.label} className="flex items-center">
              <div className={`flex flex-col items-center ${idx === 0 ? '' : 'ml-4'}`}>
                <div className="bg-white rounded-full shadow p-2 mb-1">{step.icon}</div>
                <span className={`text-xs font-semibold ${idx === 0 ? 'text-green-600' : idx === 1 ? 'text-blue-600' : idx === 2 ? 'text-yellow-600' : 'text-gray-400'}`}>{step.label}</span>
              </div>
              {idx < timeline.length - 1 && <div className="w-8 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 mx-2 rounded" />}
            </div>
          ))}
        </div>
        {/* Order Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-8 p-6 rounded-lg shadow bg-gradient-to-br from-blue-50 to-indigo-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <FaCreditCard className="h-5 w-5 mr-2 text-primary" /> Customer Information
              </h2>
              <p className="text-gray-600">{orderDetails.customer.name}</p>
              <p className="text-gray-600">{orderDetails.customer.email}</p>
              {orderDetails.customer.paymentMethod === 'card' && (
                <p className="text-gray-600">•••• •••• •••• ----</p>
              )}
              {orderDetails.customer.paymentMethod === 'upi' && orderDetails.customer.upiId && (
                <p className="text-gray-600">UPI ID: {orderDetails.customer.upiId}</p>
              )}
            </div>
            <div className="mb-8 p-6 rounded-lg shadow bg-gradient-to-br from-green-50 to-yellow-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-primary" /> Shipping Address
              </h2>
              <p className="text-gray-600">{orderDetails.customer.name}</p>
              <p className="text-gray-600">{orderDetails.customer.address}</p>
            </div>
            <div className="mb-8 p-6 rounded-lg shadow bg-gradient-to-br from-yellow-50 to-pink-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2 text-primary" /> Tracking Information
              </h2>
              <div className="flex items-center mb-2">
                <span className="font-mono font-medium text-lg">{trackingNumber}</span>
                <button onClick={handleCopyTracking} className="ml-2 text-primary hover:text-primary-dark print:hidden p-1 transition" title="Copy tracking number">
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  {copySuccess && <span className="absolute text-xs bg-gray-800 text-white px-2 py-1 rounded ml-1">Copied!</span>}
                </button>
              </div>
              <a href={`/track?order=${orderDetails.id}`} className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">Track Order</a>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h2>
              {orderDetails.items.map((item: any, index: number) => (
                <div key={index} className="flex py-3 border-b border-gray-200 last:border-0">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Payment method: {getPaymentMethodText(orderDetails.customer.paymentMethod)}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Delivery Partner</h2>
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-2 mr-3">
                  <Image 
                    src={selectedPartner.logo} 
                    alt={selectedPartner.name} 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium">{selectedPartner.name}</p>
                  <a 
                    href={selectedPartner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline print:hidden"
                  >
                    Visit website
                  </a>
                  <span className="text-sm text-gray-500 hidden print:inline">{selectedPartner.website}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-sm text-gray-500">Expected Shipping:</p>
                  <p className="font-medium">{estimatedDates.shipping}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Delivery:</p>
                  <p className="font-medium">{estimatedDates.delivery}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p className="mb-1">Handling time: 1-2 business days</p>
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-amber-600">Important:</span> Tracking will be updated within 24 hours of shipment.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-500 print:hidden">
          <p>A confirmation email has been sent to {orderDetails.customer.email}</p>
          <p className="mt-1">Thank you for shopping with us!</p>
          <div className="mt-6">
            <Link href="/account/orders" className="inline-block px-6 py-3 bg-primary text-white rounded shadow hover:bg-primary-dark transition font-semibold">
              View Order History
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 