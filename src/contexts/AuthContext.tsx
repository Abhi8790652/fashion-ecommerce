"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/storage'

// Define the user type
export interface User {
  name?: string
  email: string
  // Add optional properties for address details and card number if they are stored with the user
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  cardNumber?: string
}

// Define the auth context type
interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loginWithGoogle: (accessToken: string) => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  loginWithGoogle: async () => false,
  loginWithFacebook: async () => false,
  resetPassword: async () => false,
})

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext)

// Create the auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = getLocalStorage('user')
    const storedLoggedIn = getLocalStorage('isLoggedIn')
    
    if (storedUser && storedLoggedIn) {
      setUser(storedUser)
      setIsLoggedIn(true)
    }
    
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would authenticate with a backend
      // For now, we'll check localStorage
      const storedUser = getLocalStorage('user')
      
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Store the authenticated user (without password)
        const authenticatedUser: User = {
          name: storedUser.name,
          email: storedUser.email,
          address: storedUser.address,
          city: storedUser.city,
          state: storedUser.state,
          zip: storedUser.zip,
          country: storedUser.country,
          cardNumber: storedUser.cardNumber
        }
        
        setUser(authenticatedUser)
        setIsLoggedIn(true)
        setLocalStorage('isLoggedIn', true)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, you would register with a backend
      // For now, we'll store in localStorage
      
      // Store the full user data (including password for demo)
      const success = setLocalStorage('user', { name, email, password })
      
      if (success) {
        // Store the user (without password) in state
        const newUser: User = { name, email }
        setUser(newUser)
        setIsLoggedIn(true)
        setLocalStorage('isLoggedIn', true)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    removeLocalStorage('isLoggedIn')
    // In a real app, you might want to keep the user data for "remember me" functionality
    // but for simplicity, we'll remove it here
    // removeLocalStorage('user') 
  }

  // Social login functions
  const loginWithGoogle = async (accessToken: string): Promise<boolean> => {
    try {
      // Get user info from Google
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get user info from Google')
      }

      const userData = await response.json() as { name: string; email: string; address?: string; city?: string; state?: string; zip?: string; country?: string; cardNumber?: string; } // Explicitly cast to include all properties
      
      // Create user object from Google profile
      const user: User = {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        country: userData.country,
        cardNumber: userData.cardNumber
      }
      
      setUser(user)
      setIsLoggedIn(true)
      setLocalStorage('isLoggedIn', true)
      setLocalStorage('user', user)
      return true
    } catch (error) {
      console.error('Google login error:', error)
      return false
    }
  }

  const loginWithFacebook = async (): Promise<boolean> => {
    try {
      // Initialize Facebook OAuth
      const response = await new Promise((resolve, reject) => {
        window.FB.login((response: any) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email,public_profile' });
      });

      // Get user profile from Facebook
      const userData = await new Promise((resolve, reject) => {
        window.FB.api('/me', { fields: 'name,email' }, (response: any) => {
          if (response && !response.error) {
            resolve(response);
          } else {
            reject(response.error);
          }
        });
      }) as { name: string; email: string; address?: string; city?: string; state?: string; zip?: string; country?: string; cardNumber?: string; }; // Explicitly cast to include all properties

      const user: User = {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        country: userData.country,
        cardNumber: userData.cardNumber
      };

      setUser(user);
      setIsLoggedIn(true);
      setLocalStorage('isLoggedIn', true);
      setLocalStorage('user', user);
      return true;
    } catch (error) {
      console.error('Facebook login error:', error);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to send reset email')
      }

      return true
    } catch (error) {
      console.error('Password reset error:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      login, 
      signup, 
      logout,
      loginWithGoogle,
      loginWithFacebook,
      resetPassword
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 