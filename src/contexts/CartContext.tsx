"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

// Define the cart item type
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

// Define the cart context type
interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// Create a hook to use the cart context
export const useCart = () => useContext(CartContext);

// Create the cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = getLocalStorage('cart');
    
    if (storedCart) {
      setCartItems(storedCart);
      setCartCount(calculateCartCount(storedCart));
    }
  }, []);

  // Calculate total number of items in cart
  const calculateCartCount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Update localStorage whenever cart changes
  useEffect(() => {
    setLocalStorage('cart', cartItems);
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        setCartCount(calculateCartCount(updatedItems));
        return updatedItems;
      } else {
        // New item, add to cart with quantity 1
        const updatedItems = [...prevItems, { ...newItem, quantity: 1 }];
        setCartCount(calculateCartCount(updatedItems));
        return updatedItems;
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      setCartCount(calculateCartCount(updatedItems));
      return updatedItems;
    });
  };

  // Update the quantity of an item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      setCartCount(calculateCartCount(updatedItems));
      return updatedItems;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}; 