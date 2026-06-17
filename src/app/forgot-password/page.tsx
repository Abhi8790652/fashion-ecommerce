"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setEmail('')
      } else {
        // Handle specific error cases
        switch (response.status) {
          case 404:
            setError('No account found with this email address')
            break
          case 500:
            if (data.error === 'Email service is not configured') {
              setError('Password reset service is currently unavailable. Please try again later.')
            } else {
              setError(data.error || 'Failed to send password reset email. Please try again later.')
            }
            break
          default:
            setError(data.error || 'An unexpected error occurred. Please try again.')
        }
      }
    } catch (err) {
      console.error('Password reset error:', err)
      setError('Network error. Please check your internet connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            
            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">
                  Password reset email sent! Please check your inbox.
                </div>
              </div>
            )}
            
            <div>
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
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-accent focus:outline-none focus:ring-accent sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:bg-gray-400"
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </button>
            </div>

            <div className="text-sm text-center">
              <Link href="/login" className="font-medium text-accent hover:text-accent/80">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 