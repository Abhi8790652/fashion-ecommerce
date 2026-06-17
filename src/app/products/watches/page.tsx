"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaEye, FaFilter, FaCheckCircle } from 'react-icons/fa'
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
    brand: 'TimeMaster',
  },
  {
    id: 'w2',
    name: 'Sport Digital',
    price: 8999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    description: 'Water-resistant digital sports watch',
    brand: 'SportPro',
  },
  {
    id: 'w3',
    name: 'Minimalist Automatic',
    price: 15999,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Sleek automatic watch with minimalist design',
    brand: 'Elegance',
  },
  {
    id: 'w4',
    name: 'Smart Fitness',
    price: 11999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Smart',
    description: 'Advanced fitness tracking smartwatch',
    brand: 'TechFit',
  },
  {
    id: 'w5',
    name: 'Diver Professional',
    price: 24999,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    description: 'Professional diving watch with 300m water resistance',
    brand: 'DiveMaster',
  },
  {
    id: 'w6',
    name: 'Vintage Collection',
    price: 18999,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Classic vintage-inspired timepiece',
    brand: 'VintageTime',
  },
  {
    id: 'w7',
    name: 'Smart Hybrid',
    price: 14999,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Smart',
    description: 'Hybrid smartwatch with analog display',
    brand: 'SmartTech',
  },
  {
    id: 'w8',
    name: 'Limited Edition',
    price: 29999,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Luxury',
    description: 'Exclusive limited edition timepiece',
    brand: 'LuxuryTime',
  },
]

const categories = ['All', 'Luxury', 'Sports', 'Smart']
const brands = ['All', 'TimeMaster', 'SportPro', 'Elegance', 'TechFit', 'DiveMaster', 'VintageTime', 'SmartTech', 'LuxuryTime']
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  { label: '₹15,000 - ₹25,000', min: 15000, max: 25000 },
  { label: 'Above ₹25,000', min: 25000, max: Infinity },
]

export default function WatchesPage() {
  const { addToCart } = useCart()
  const [hoveredWatch, setHoveredWatch] = useState<string | null>(null)
  const [loadingWatch, setLoadingWatch] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
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

  const filteredWatches = watches.filter(watch => {
    const categoryMatch = selectedCategory === 'All' || watch.category === selectedCategory
    const brandMatch = selectedBrand === 'All' || watch.brand === selectedBrand
    const priceMatch = watch.price >= selectedPriceRange.min && watch.price <= selectedPriceRange.max
    return categoryMatch && brandMatch && priceMatch
  })

  const sortedWatches = [...filteredWatches].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-64 flex-shrink-0"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
                aria-label="Toggle filters"
              >
                <FaFilter className="w-5 h-5" />
              </button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range}
                        onChange={() => setSelectedPriceRange(range)}
                        className="mr-2"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{sortedWatches.length} watches found</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-2"
              aria-label="Sort watches by"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWatches.map((watch, index) => (
              <motion.div
                key={watch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden relative"
                onHoverStart={() => setHoveredWatch(watch.id)}
                onHoverEnd={() => setHoveredWatch(null)}
              >
                {/* Loading Overlay */}
                <AnimatePresence>
                  {loadingWatch === watch.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-green-400"
                          >
                            <FaCheckCircle className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-lg font-semibold">Success!</p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative h-64">
                  <Image
                    src={watch.image}
                    alt={watch.name}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredWatch === watch.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4"
                  >
                    <button
                      onClick={() => handleAddToCart(watch)}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                      aria-label="Add to cart"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/products/watches/${watch.id}`}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                      aria-label="View details"
                    >
                      <FaEye className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{watch.name}</h3>
                    <span className="text-accent font-bold">₹{watch.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{watch.brand}</p>
                  <p className="text-sm text-gray-600 mb-4">{watch.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(watch)}
                      className="flex-1 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors"
                      aria-label={`Add ${watch.name} to cart`}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(watch)}
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                      aria-label={`Buy ${watch.name} now`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 