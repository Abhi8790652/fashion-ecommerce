"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline'
import UserMenu from './UserMenu'
import { useCart } from '@/contexts/CartContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Men', href: '/men' },
  { name: 'Women', href: '/women' },
  { name: 'Sale', href: '/sale' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState(false)
  const { cartItems } = useCart()

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Handle date and time update
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      // Format time as HH:MM:SS
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }))
      
      // Format date as Day, Month Date, Year
      setCurrentDate(now.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      }))
      
      // Trigger animation on seconds change
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }
    
    // Update immediately
    updateDateTime()
    
    // Update every second
    const interval = setInterval(updateDateTime, 1000)
    
    // Clear interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition-transform duration-300 hover:scale-105">
            <span className="text-2xl font-bold">#FASHIONKIDUNIYA</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-accent"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-semibold leading-6 text-gray-900 transition-all duration-300 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6">
          {/* Date and Time Display - Desktop */}
          <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 text-gray-700 hover:shadow-md transition-all duration-300 transform hover:scale-105">
            <ClockIcon className="h-4 w-4 text-indigo-500 mr-2" />
            <div className="flex flex-col items-end">
              <span className={`text-xs font-semibold text-indigo-600 ${isAnimating ? 'animate-pulse' : ''}`}>
                {currentTime}
              </span>
              <span className="text-[10px] text-gray-500">
                {currentDate}
              </span>
            </div>
          </div>
          <UserMenu />
          <Link href="/cart" className="relative transition-transform duration-300 hover:scale-110 ml-4">
            <ShoppingBagIcon className="h-6 w-6 transition-colors duration-300 hover:text-accent" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
              {totalItems}
            </span>
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl font-bold">FASHIONKIDUNIYA</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            {/* Mobile Date and Time Display */}
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg shadow-sm border border-indigo-100 mb-4">
              <ClockIcon className="h-4 w-4 text-indigo-500 mr-2" />
              <div className="flex flex-col">
                <span className={`text-sm font-semibold text-indigo-600 ${isAnimating ? 'animate-pulse' : ''}`}>
                  {currentTime}
                </span>
                <span className="text-xs text-gray-500">
                  {currentDate}
                </span>
              </div>
            </div>
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-300 hover:bg-gray-50 hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-2">
                <Link
                  href="/login"
                  className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all duration-300 hover:bg-gray-50 hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="mr-2 h-5 w-5" />
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all duration-300 hover:bg-gray-50 hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="mr-2 h-5 w-5" />
                  Sign up
                </Link>
                <Link
                  href="/cart"
                  className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all duration-300 hover:bg-gray-50 hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBagIcon className="mr-2 h-5 w-5" />
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 