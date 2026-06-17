"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaMoneyBillWave, FaQrcode, FaArrowLeft, FaInfoCircle, FaCreditCard, FaExclamationCircle, FaCheckCircle, FaLock } from 'react-icons/fa'
import { useCart, CartItem } from '@/contexts/CartContext'
import { useAuth, User } from '@/contexts/AuthContext'
import { orderStorage, Order } from '@/utils/orderStorage'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type PaymentMethod = 'cod' | 'upi' | 'card'

// Update UPI QR code path to use local image
const UPI_QR_CODE = '/images/payment/upi-qr.jpg'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartItems, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card')
  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [orderProgress, setOrderProgress] = useState(0)
  const [showOrderProcessing, setShowOrderProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate total
  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout/payment')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate payment method specific fields
      if (selectedMethod === 'card') {
        if (!cardNumber || !expiryDate || !cvv) {
          throw new Error('Please fill in all card details')
        }
        // Basic card validation
        if (cardNumber.replace(/\s/g, '').length !== 16) {
          throw new Error('Please enter a valid 16-digit card number')
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
          throw new Error('Please enter a valid expiry date (MM/YY)')
        }
        if (!/^\d{3,4}$/.test(cvv)) {
          throw new Error('Please enter a valid CVV')
        }
      }

      // if (selectedMethod === 'upi') {
      //   if (!upiId) {
      //     throw new Error('Please enter your UPI ID')
      //   }now com e=
      //   if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(upiId)) {
      //     throw new Error('Please enter a valid UPI ID (e.g., username@bank)')
      //   }
      // }

      // Show payment success animation
      setPaymentSuccess(true)
      
      // Wait for payment success animation
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Start order processing animation
      setPaymentSuccess(false)
      setShowOrderProcessing(true)
      setOrderProgress(0)

      // Simulate order processing with progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setOrderProgress(i)
      }

      // Create order data
      const newOrderNumber = `ORD-${Date.now()}`
      const orderData: Order = {
        id: newOrderNumber,
        items: cartItems.map(item => ({...item, id: String(item.id)})),
        total: total,
        customer: {
          name: user?.name || '',
          email: user?.email || '',
          address: user?.address || '',
          paymentMethod: selectedMethod,
          ...(selectedMethod === 'upi' && { upiId: upiId }),
          ...(selectedMethod === 'card' && { last4CardDigits: cardNumber.slice(-4) }),
        },
        date: new Date().toISOString(),
        status: 'pending',
      }

      // Save order to localStorage
      orderStorage.addOrder(orderData)

      // Redirect to confirmation page immediately
      router.push(`/checkout/confirmation?orderId=${newOrderNumber}`)

      // Clear cart after successful order
      clearCart()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  if (!user) {
    return null
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Please add items to your cart before proceeding to payment.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center text-gray-600 hover:text-accent"
        >
          <FaArrowLeft className="mr-2" />
          Back to Checkout
        </motion.button>

        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Complete Your Payment</h1>
            <p className="text-gray-600">Choose your preferred payment method</p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 rounded-lg bg-red-50 p-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {/* Order Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </motion.div>
                ))}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">Total</p>
                    <p className="text-lg font-semibold text-accent">₹{total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Select Payment Method</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    {/* Card Payment Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex cursor-pointer rounded-lg border p-6 shadow-sm transition-all duration-200 hover:border-accent ${
                        selectedMethod === 'card'
                          ? 'border-accent ring-2 ring-accent bg-accent/5'
                          : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedMethod('card')}
                    >
                      <div className="flex flex-1 items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                          <FaCreditCard className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex flex-col">
                          <span className="block text-base font-medium text-gray-900">
                            Credit/Debit Card
                          </span>
                          <span className="mt-1 text-sm text-gray-500">
                            Pay securely with your card
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={selectedMethod === 'card'}
                          onChange={() => setSelectedMethod('card')}
                          className="h-5 w-5 border-gray-300 text-accent focus:ring-accent"
                          aria-label="Card Payment"
                        />
                      </div>
                    </motion.div>

                    {/* UPI Payment Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex cursor-pointer rounded-lg border p-6 shadow-sm transition-all duration-200 hover:border-accent ${
                        selectedMethod === 'upi'
                          ? 'border-accent ring-2 ring-accent bg-accent/5'
                          : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedMethod('upi')}
                    >
                      <div className="flex flex-1 items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                          <FaQrcode className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex flex-col">
                          <span className="block text-base font-medium text-gray-900">UPI Payment</span>
                          <span className="mt-1 text-sm text-gray-500">
                            Pay instantly with UPI
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center">
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                          checked={selectedMethod === 'upi'}
                          onChange={() => setSelectedMethod('upi')}
                          className="h-5 w-5 border-gray-300 text-accent focus:ring-accent"
                          aria-label="UPI Payment"
                        />
                      </div>
                    </motion.div>

                    {/* Cash on Delivery Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex cursor-pointer rounded-lg border p-6 shadow-sm transition-all duration-200 hover:border-accent ${
                        selectedMethod === 'cod'
                          ? 'border-accent ring-2 ring-accent bg-accent/5'
                          : 'border-gray-300'
                      }`}
                      onClick={() => setSelectedMethod('cod')}
                    >
                      <div className="flex flex-1 items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                          <FaMoneyBillWave className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex flex-col">
                          <span className="block text-base font-medium text-gray-900">
                            Cash on Delivery
                          </span>
                          <span className="mt-1 text-sm text-gray-500">
                            Pay when you receive your order
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={selectedMethod === 'cod'}
                          onChange={() => setSelectedMethod('cod')}
                          className="h-5 w-5 border-gray-300 text-accent focus:ring-accent"
                          aria-label="Cash on Delivery"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Payment Method Details */}
                  <AnimatePresence mode="wait">
                    {selectedMethod === 'card' && (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-6"
                      >
                        <div className="rounded-lg bg-accent/5 p-6">
                          <div className="flex items-start">
                            <FaInfoCircle className="mt-1 mr-3 h-6 w-6 text-accent" />
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Card Payment Instructions</h3>
                              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  Enter your card details securely
                                </li>
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  Your payment is protected by SSL encryption
                                </li>
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  We accept all major credit and debit cards
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                              Card Number
                            </label>
                            <div className="mt-1 relative">
                              <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <FaLock className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedMethod === 'upi' && (
                      <motion.div
                        key="upi"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-6"
                      >
                        <div className="rounded-lg bg-accent/5 p-6">
                          <div className="flex items-start">
                            <FaInfoCircle className="mt-1 mr-3 h-6 w-6 text-accent" />
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">UPI Payment Instructions</h3>
                              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  Scan the QR code with any UPI app
                                </li>
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  Enter the exact amount of ₹{total.toFixed(2)}
                                </li>
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  Add a note with your order number
                                </li>
                                <li className="flex items-center">
                                  <span className="mr-2">•</span>
                                  Complete the payment in your UPI app
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                          {/* Amount Display */}
                          <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-sm">
                            <div className="text-center">
                              <p className="text-sm text-gray-600">Amount to Pay</p>
                              <p className="mt-1 text-3xl font-bold text-accent">₹{total.toFixed(2)}</p>
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative h-64 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                          >
                            <Image
                              src={UPI_QR_CODE}
                              alt="UPI QR Code"
                              fill
                              className="rounded-lg object-contain"
                            />
                          </motion.div>
                          <p className="text-center text-sm text-gray-500">
                            Scan this QR code with your UPI app to pay ₹{total.toFixed(2)}
                          </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                          <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
                            UPI ID (Optional)
                          </label>
                          <input
                            type="text"
                            id="upiId"
                            name="upiId"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="example@upi"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent focus:outline-none focus:ring-accent"
                          />
                          <p className="mt-2 text-sm text-gray-500">
                            Enter your UPI ID if you prefer to pay directly (e.g., username@bank)
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {selectedMethod === 'cod' && (
                      <motion.div
                        key="cod"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 rounded-lg bg-accent/5 p-6"
                      >
                        <div className="flex items-start">
                          <FaInfoCircle className="mt-1 mr-3 h-6 w-6 text-accent" />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Cash on Delivery Instructions</h3>
                            <ul className="mt-3 space-y-2 text-sm text-gray-600">
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Pay the exact amount of ₹{total.toFixed(2)} when your order arrives
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Keep the exact change ready
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Verify the order before making payment
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Get a receipt from the delivery person
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className={`w-full rounded-md bg-accent px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-accent/90 ${
                        loading ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </div>
                      ) : (
                        'Complete Payment'
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Success Overlay */}
      <AnimatePresence mode="wait">
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="rounded-lg bg-white p-8 text-center shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
              >
                <FaCheckCircle className="h-8 w-8 text-green-500" />
              </motion.div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Payment Successful!</h2>
              <p className="text-gray-600">Your payment has been processed successfully.</p>
            </motion.div>
          </motion.div>
        )}

        {/* Order Processing Overlay */}
        {showOrderProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="rounded-lg bg-white p-8 text-center shadow-xl"
            >
              <div className="relative mb-6">
                <svg className="w-24 h-24 mx-auto">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="44"
                    cx="48"
                    cy="48"
                  />
                  <motion.circle
                    className="text-accent"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="44"
                    cx="48"
                    cy="48"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: orderProgress / 100 }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">{orderProgress}%</span>
                </div>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Processing Your Order</h2>
              <p className="text-gray-600">Please wait while we confirm your order...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 