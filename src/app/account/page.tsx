"use client"

import { useAuth } from '@/contexts/AuthContext'

export default function AccountPage() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">My Profile</h1>
      
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg">{user?.name || 'Not provided'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 