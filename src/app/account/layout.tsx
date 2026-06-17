"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            <Link
              href="/account"
              className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              href="/account/orders"
              className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Order History
            </Link>
            <Link
              href="/account/addresses"
              className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Addresses
            </Link>
            <Link
              href="/account/settings"
              className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  )
} 