"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface UserData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States"
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setLoading(false)
    setIsEditing(false)
    // Show success message or handle error
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Settings Header */}
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <UserCircleIcon className="h-8 w-8 text-indigo-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                    <p className="text-gray-500">Manage your account information and preferences</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Settings Form */}
            <form onSubmit={handleSubmit} className="px-6 py-8">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={userData.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={userData.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          value={userData.zip}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={userData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Password</h2>
                  <button
                    type="button"
                    onClick={() => router.push('/account/password')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    Change Password
                  </button>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 