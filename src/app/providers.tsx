"use client"

import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { FeaturedProductsProvider } from '@/contexts/FeaturedProductsContext'
import ClientSalePopup from '@/components/ClientSalePopup'

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-center" />
      <ClientSalePopup />
      <AuthProvider>
        <CartProvider>
          <FeaturedProductsProvider>
            {children}
          </FeaturedProductsProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
} 