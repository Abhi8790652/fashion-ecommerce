"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaShoppingCart, FaEye, FaCheckCircle } from 'react-icons/fa'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

// Sample watch data - replace with your actual watch data
const watches = [
  {
    id: 'w1',
    name: 'Classic Chronograph',
    price: 12999,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Elegant chronograph watch with leather strap',
  },
  {
    id: 'w2',
    name: 'Sport Digital',
    price: 8999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    description: 'Water-resistant digital sports watch',
  },
  {
    id: 'w3',
    name: 'Minimalist Automatic',
    price: 15999,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Sleek automatic watch with minimalist design',
  },
  {
    id: 'w4',
    name: 'Smart Fitness',
    price: 11999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Smart',
    description: 'Advanced fitness tracking smartwatch',
  },
  {
    id: 'w5',
    name: 'Diver Professional',
    price: 24999,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    description: 'Professional diving watch with 300m water resistance',
  },
  {
    id: 'w6',
    name: 'Vintage Collection',
    price: 18999,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Classic vintage-inspired timepiece',
  },
  {
    id: 'w7',
    name: 'Smart Hybrid',
    price: 14999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Smart',
    description: 'Hybrid smartwatch with analog display',
  },
  {
    id: 'w8',
    name: 'Limited Edition',
    price: 29999,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Exclusive limited edition timepiece',
  },
]

export default function WatchSection() {
  const { addToCart } = useCart()
  const [hoveredWatch, setHoveredWatch] = useState<string | null>(null)
  const [loadingWatch, setLoadingWatch] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const handleBuyNow = async (watch: any) => {
    setLoadingWatch(watch.id)
    setProgress(0)
    setShowSuccess(false)

    // Simulate loading with progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setProgress(i)
    }

    addToCart({ ...watch, quantity: 1 } as any)
    setShowSuccess(true)
    
    // Wait for success animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/checkout')
  }

  const handleAddToCart = async (watch: any) => {
    setLoadingWatch(watch.id)
    setProgress(0)
    setShowSuccess(false)

    // Simulate loading with progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setProgress(i)
    }

    addToCart({ ...watch, quantity: 1 } as any)
    setShowSuccess(true)
    
    // Wait for success animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoadingWatch(null)
    setShowSuccess(false)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Premium Watches</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of exquisite timepieces, from classic chronographs to modern smartwatches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {watches.map((watch, index) => (
            <div
              key={watch.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative"
              onMouseEnter={() => setHoveredWatch(watch.id)}
              onMouseLeave={() => setHoveredWatch(null)}
            >
              {/* Loading Overlay */}
              {loadingWatch === watch.id && (
                <div
                  className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    {!showSuccess ? (
                      <>
                        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Processing...</p>
                        <p className="text-sm mt-2">{progress}%</p>
                      </>
                    ) : (
                      <div
                        className="text-green-400"
                      >
                        <FaCheckCircle className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-semibold">Success!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="relative h-64">
                <Image
                  src={watch.image}
                  alt={watch.name}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredWatch === watch.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAddToCart(watch)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                    aria-label={`Add ${watch.name} to cart`}
                  >
                    <FaShoppingCart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleBuyNow(watch)}
                    className="bg-accent text-white p-3 rounded-full hover:bg-accent/90 transition-colors"
                    aria-label={`Buy ${watch.name} now`}
                  >
                    <FaEye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{watch.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{watch.description}</p>
                <p className="text-accent font-bold">₹{watch.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/products/watches"
            className="inline-block bg-accent text-white px-8 py-3 rounded-md hover:bg-accent/90 transition-colors"
          >
            View All Watches
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 