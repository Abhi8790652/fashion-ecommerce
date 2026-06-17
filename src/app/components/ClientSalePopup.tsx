"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const ClientSalePopup = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Special Offer!</h3>
              <p>Get 20% off on your first purchase</p>
            </div>
            <button
              onClick={handleClose}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 