"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { FaPhone, FaGoogle, FaFacebook, FaGift, FaTruck, FaPercent, FaShieldAlt, FaStar, FaEye, FaEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Validate environment variables
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '862491648968-8g6ildrhaqsc1qjhu3oekdrli6fjol9k.apps.googleusercontent.com'
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'your_facebook_app_id_here'

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle, loginWithFacebook } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isGoogleReady, setIsGoogleReady] = useState(false)
  const [isFacebookReady, setIsFacebookReady] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Log environment variables
    console.log('Environment variables:', {
      GOOGLE_CLIENT_ID,
      FACEBOOK_APP_ID,
      NODE_ENV: process.env.NODE_ENV
    })
    
    setMounted(true)
    
    // Load Google API
    const loadGoogleAPI = () => {
      return new Promise<void>((resolve) => {
        // Check if Google API is already loaded
        if (window.google) {
          setIsGoogleReady(true)
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = () => {
          setIsGoogleReady(true)
          resolve()
        }
        script.onerror = (error) => {
          console.error('Failed to load Google API:', error)
          resolve()
        }
        document.body.appendChild(script)
      })
    }

    // Load Facebook SDK
    const loadFacebookSDK = () => {
      return new Promise<void>((resolve) => {
        // Check if Facebook SDK is already loaded
        if (window.FB) {
          setIsFacebookReady(true)
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.async = true
        script.defer = true
        script.onload = () => {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          })
          setIsFacebookReady(true)
          resolve()
        }
        script.onerror = (error) => {
          console.error('Failed to load Facebook SDK:', error)
          resolve()
        }
        document.body.appendChild(script)
      })
    }

    // Load both SDKs
    Promise.all([loadGoogleAPI(), loadFacebookSDK()])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login form submitted')
    setIsLoading(true)
    setError('')
    
    try {
      // Use the login function from auth context
      const success = await login(email, password)
      
      if (success) {
        console.log('Login successful')
        router.push('/')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.error('Login process error:', err)
      setError('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!isGoogleReady) {
      setError('Google login is not ready yet. Please try again in a moment.')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      
      // Use the new Google Identity Services
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response) => {
          if (response.error) {
            console.error('Google login error:', response.error)
            setError('Google login failed. Please try again.')
            return
          }
          
          if (!response.access_token) {
            setError('Failed to get access token from Google')
            return
          }
          
          const success = await loginWithGoogle(response.access_token)
          if (success) {
            router.push('/')
          } else {
            setError('Google login failed. Please try again.')
          }
        }
      })

      client.requestAccessToken()
    } catch (err) {
      console.error('Google login error:', err)
      setError('Google login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    if (!isFacebookReady) {
      setError('Facebook login is not ready yet. Please try again in a moment.')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      const success = await loginWithFacebook()
      if (success) {
        router.push('/')
      } else {
        setError('Facebook login failed. Please try again.')
      }
    } catch (err) {
      console.error('Facebook login error:', err)
      setError('Facebook login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Trending Products Section - Compact Version */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-xl p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-4"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-1">Trending</h3>
                <p className="text-sm text-gray-600">Popular items</p>
              </motion.div>

              <div className="space-y-4">
                {/* Featured Product 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <div className="relative h-28 w-full">
                      <Image
                        src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
                        alt="Premium Watch"
                        fill
                        className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-900">Premium Watch</h4>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Luxury Collection</p>
                      <div className="flex items-center">
                        <FaStar className="h-3 w-3 text-yellow-400" />
                        <span className="ml-1 text-xs text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Featured Product 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="group"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <div className="relative h-28 w-full">
                      <Image
                        src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
                        alt="Designer Bag"
                        fill
                        className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-900">Designer Bag</h4>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">New Arrival</p>
                      <div className="flex items-center">
                        <FaStar className="h-3 w-3 text-yellow-400" />
                        <span className="ml-1 text-xs text-gray-600">4.9</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Categories */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="grid grid-cols-2 gap-3"
                >
                  <Link href="/category/men" className="group">
                    <div className="relative h-14 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Men's Fashion"
                        fill
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Men</span>
                      </div>
                    </div>
                  </Link>
                  <Link href="/category/women" className="group">
                    <div className="relative h-14 rounded-lg overflow-hidden">
                      <Image
                        src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Women's Fashion"
                        fill
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Women</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Login Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="text-center mb-6">
              <motion.h2 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80"
              >
                Welcome back
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-2 text-sm text-gray-600"
              >
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-accent hover:text-accent/80 transition-colors duration-200">
                  Sign up
                </Link>
              </motion.p>
            </div>

            <div className="bg-white py-8 px-8 shadow-xl sm:rounded-lg sm:px-10 transform transition-all duration-300 hover:shadow-2xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-md bg-red-50 p-4"
                  >
                    <div className="text-sm text-red-700">{error}</div>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-accent focus:outline-none focus:ring-accent sm:text-sm transition-all duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-accent focus:outline-none focus:ring-accent sm:text-sm transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Show" : "Hide"}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent transition-colors duration-200"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-accent hover:text-accent/80 transition-colors duration-200">
                      Forgot your password?
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-400 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </motion.div>
              </form>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
                    title="Sign in with Google"
                  >
                    <FaGoogle className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleFacebookLogin}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
                    title="Sign in with Facebook"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
                    title="Sign in with Phone"
                  >
                    <FaPhone className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Offers Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Exclusive Offers</h3>
                <p className="text-gray-600">Sign in to unlock these amazing benefits</p>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <FaGift className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Welcome Bonus</h4>
                    <p className="text-gray-600">Get 20% off on your first purchase</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <FaTruck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Free Shipping</h4>
                    <p className="text-gray-600">On orders above rupees 5000</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <FaPercent className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Member Discounts</h4>
                    <p className="text-gray-600">Exclusive deals for members</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-start space-x-4 p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <FaShieldAlt className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Secure Shopping</h4>
                    <p className="text-gray-600">100% secure payment & data protection</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-center pt-4"
              >
                <Link 
                  href="/signup" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors duration-200"
                >
                  Create Account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 