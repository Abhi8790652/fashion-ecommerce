"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatPrice } from '@/utils/formatPrice'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

interface Order {
  orderNumber: string
  orderDate: string
  items: OrderItem[]
  totals: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
  customer: {
    name: string
    email: string
    address: string
    cardNumber: string
  }
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]')
      setOrders(orderHistory)
    } catch (error) {
      console.error('Error loading order history:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
            <p className="mb-8 text-gray-600">You haven't placed any orders yet.</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container py-16">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Order History</h1>
          
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.orderNumber} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Order #{order.orderNumber}</h2>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-primary">{formatPrice(order.totals.total)}</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">{order.customer.address}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
                      <p className="text-sm text-gray-600">
                        Card ending in {order.customer.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                                <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 py-4 bg-gray-50">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p className="font-medium text-gray-900">{formatPrice(order.totals.subtotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <p>Shipping</p>
                    <p className="font-medium text-gray-900">
                      {order.totals.shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(order.totals.shipping)
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <p>Tax</p>
                    <p className="font-medium text-gray-900">{formatPrice(order.totals.tax)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                    <p>Total</p>
                    <p className="text-primary">{formatPrice(order.totals.total)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 