"use client"

import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHome, FaArrowUp } from 'react-icons/fa'

const navigation = {
  shop: [
    { name: 'Men', href: '/men' },
    { name: 'Women', href: '/women' },
    { name: 'Sale', href: '/sale' },
    { name: 'New Arrivals', href: '/new-arrivals' },
  ],
  support: [
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'FAQs', href: '/faqs' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Store Locations', href: '/stores' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/abhinitkumar.kumar.92/', icon: FaFacebook, color: 'bg-blue-600' },
    { name: 'Twitter', href: 'https://x.com/ak0978096', icon: FaTwitter, color: 'bg-black' },
    { name: 'Instagram', href: 'https://www.instagram.com/abhi_7nit/', icon: FaInstagram, color: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/abhinit-kumar-406917220/', icon: FaLinkedin, color: 'bg-blue-700' },
  ],
  contact: {
    email: 'ak0978096@gmail.com',
    phone: '6202058658',
    address: 'BLOCK B13 KALYANI, NADIA, WB, INDIA 741235'
  }
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden" aria-labelledby="footer-heading">
      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="fixed bottom-8 left-8 z-50 group"
        aria-label="Back to home"
      >
        <div className="flex flex-col items-center">
          <div className="bg-primary p-4 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-amber-500 hover:rotate-12 group-hover:shadow-amber-300/50">
            <FaHome className="text-white text-xl" />
          </div>
          <span className="mt-2 px-2 py-1 bg-white/90 rounded text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">Home</span>
        </div>
      </Link>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="Back to top"
      >
        <div className="flex flex-col items-center">
          <div className="bg-primary p-4 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-amber-500 group-hover:shadow-amber-300/50">
            <FaArrowUp className="text-white text-xl" />
          </div>
          <span className="mt-2 px-2 py-1 bg-white/90 rounded text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">Top</span>
        </div>
      </button>
      
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-12 md:py-16 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="text-2xl font-bold text-white hover:text-amber-300 transition-colors duration-300">
              FASHIONKIDUNIYA
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Modern FASHIONKIDUNIYA for every occasion. Find your style with us.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={`${item.color} p-2 rounded-full text-white transform transition-all duration-300 hover:scale-110 hover:shadow-lg`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="block text-xs text-center mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.name}</span>
                </a>
              ))}
            </div>
            
            {/* Contact Information */}
            <div className="text-gray-300 space-y-3">
              <p className="flex items-center">
                <span className="mr-2 text-amber-300">
                  <FaEnvelope className="h-5 w-5" />
                </span>
                <span>{navigation.contact.email}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2 text-amber-300">
                  <FaPhone className="h-5 w-5" />
                </span>
                <span>{navigation.contact.phone}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2 text-amber-300">
                  <FaMapMarkerAlt className="h-5 w-5" />
                </span>
                <span>{navigation.contact.address}</span>
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Shop</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 inline-block">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 inline-block">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 inline-block">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 inline-block">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mt-2 text-sm leading-5 text-gray-400">
                &copy; {new Date().getFullYear()} FASHIONKIDUNIYA. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                <a href="#" className="text-sm leading-6 text-gray-400 hover:text-amber-300 transition-colors duration-300">
                  Payment Methods
                </a>
                <a href="#" className="text-sm leading-6 text-gray-400 hover:text-amber-300 transition-colors duration-300">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 