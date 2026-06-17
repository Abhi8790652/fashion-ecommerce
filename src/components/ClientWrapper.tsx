'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'

export default function ClientWrapper() {
  const [showPopup, setShowPopup] = useState(true)

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 relative border-4 border-accent">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-4 -right-4 bg-accent text-white p-2 rounded-full hover:bg-accent/90"
              aria-label="Close sale popup"
            >
              <FaTimes size={24} />
            </button>
            
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-accent">
                Special Sale Alert! 🎉
              </h3>
              <p className="text-gray-600 mb-6 text-xl">
                Get up to 45% off on selected items. Limited time offer!
              </p>
              <Link
                href="/sale"
                className="inline-block bg-accent text-white px-8 py-3 rounded-md text-xl font-medium hover:bg-accent/90"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 