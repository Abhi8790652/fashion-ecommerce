"use client"

import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { products } from '@/models/Product'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const productId = parseInt(params.id)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.src || '',
      category: product.category
    });
    router.push('/checkout');
  };

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="container py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((image) => (
                  <div key={image.src} className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 lg:mt-0 lg:px-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

              <div className="mt-4">
                <div className="flex items-center">
                  {product.onSale ? (
                    <>
                      <p className="text-3xl tracking-tight text-gray-900">${product.salePrice}</p>
                      <p className="ml-2 text-xl text-gray-500 line-through">${product.price}</p>
                    </>
                  ) : (
                    <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
                  )}
                </div>

                {/* Reviews */}
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating && product.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-500">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-base text-gray-700">{product.description}</p>
              </div>

              <div className="mt-8">
                {/* Colors */}
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2">
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <div
                          key={color.name}
                          className="relative flex cursor-pointer items-center justify-center rounded-full p-0.5"
                        >
                          <span
                            className="h-8 w-8 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="sr-only">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <Link href="#" className="text-sm font-medium text-accent hover:text-accent/80">
                      Size guide
                    </Link>
                  </div>

                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <div
                        key={size.name}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm hover:bg-gray-50'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'flex items-center justify-center rounded-md border py-3 text-sm font-medium'
                        )}
                      >
                        {size.name}
                        {!size.inStock && <span className="ml-2">(Out of stock)</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedSize) {
                        alert('Please select a size');
                        return;
                      }
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.images[0]?.src || '',
                        category: product.category
                      });
                    }}
                    className="flex-1 items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <ShoppingBagIcon className="mr-2 h-5 w-5 inline" aria-hidden="true" />
                    Add to bag
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 items-center justify-center rounded-md bg-accent px-8 py-3 text-base font-medium text-white hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">Free 30 day returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
} 