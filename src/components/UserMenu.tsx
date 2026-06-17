"use client"

import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

export default function UserMenu() {
  const router = useRouter()
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/login" 
          className="text-sm font-semibold text-gray-900 hover:text-accent transition-colors duration-300"
        >
          Login
        </Link>
        <Link 
          href="/signup" 
          className="text-sm font-semibold bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
          <span className="mr-2">{user?.name || user?.email}</span>
          <UserIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account"
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                My Account
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/orders"
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                Orders
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 