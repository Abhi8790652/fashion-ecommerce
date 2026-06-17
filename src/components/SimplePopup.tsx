'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'

export default function SimplePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        maxWidth: '28rem',
        width: '100%',
        margin: '1rem',
        position: 'relative',
        border: '4px solid #ff4d4d'
      }}>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close popup"
          title="Close popup"
          style={{
            position: 'absolute',
            top: '-1rem',
            right: '-1rem',
            backgroundColor: '#ff4d4d',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FaTimes size={24} />
        </button>
        
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#ff4d4d'
          }}>
            Special Sale Alert! 🎉
          </h3>
          <p style={{ 
            color: '#4B5563',
            marginBottom: '1.5rem',
            fontSize: '1.25rem'
          }}>
            Get up to 45% off on selected items. Limited time offer!
          </p>
          <Link
            href="/sale"
            style={{
              display: 'inline-block',
              backgroundColor: '#ff4d4d',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.375rem',
              fontSize: '1.25rem',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
} 