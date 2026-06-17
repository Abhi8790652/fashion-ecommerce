export interface ProductSize {
  name: string;
  inStock: boolean;
}

export interface ProductColor {
  name: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'accessories';
  subcategory?: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  images: ProductImage[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  salePrice?: number;
  rating?: number;
  reviewCount?: number;
}

// Mock data for frontend development
export const products: Product[] = [
  {
    id: 1,
    name: 'Summer Dress',
    description: 'A beautiful summer dress perfect for sunny days. Made with lightweight, breathable fabric that keeps you cool and comfortable all day long.',
    price: 7499,
    category: 'women',
    subcategory: 'dresses',
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: false }
    ],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Blue', value: '#1E40AF' },
      { name: 'Pink', value: '#FFC0CB' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80', alt: 'Summer Dress - Front' },
      { src: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80', alt: 'Summer Dress - Back' }
    ],
    featured: true,
    bestSeller: true,
    newArrival: true,
    rating: 4.8,
    reviewCount: 28
  },
  {
    id: 2,
    name: 'Classic Suit',
    description: 'A timeless classic suit for men. Tailored to perfection with premium fabric that ensures comfort and durability.',
    price: 24999,
    category: 'men',
    subcategory: 'suits',
    sizes: [
      { name: 'S', inStock: false },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: 'XXL', inStock: true }
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#000080' },
      { name: 'Gray', value: '#808080' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80', alt: 'Classic Suit - Front' },
      { src: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80', alt: 'Classic Suit - Back' }
    ],
    featured: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 3,
    name: 'Casual Shirt',
    description: 'A comfortable casual shirt for everyday wear. Made with soft cotton that feels great against your skin.',
    price: 4199,
    category: 'men',
    subcategory: 'shirts',
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Blue', value: '#1E40AF' },
      { name: 'Black', value: '#000000' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', alt: 'Casual Shirt - Front' },
      { src: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80', alt: 'Casual Shirt - Back' }
    ],
    featured: true,
    newArrival: true,
    rating: 4.5,
    reviewCount: 15
  },
  {
    id: 4,
    name: 'Designer Bag',
    description: 'A stylish designer bag to complement any outfit. Spacious enough to carry all your essentials.',
    price: 13299,
    category: 'women',
    subcategory: 'accessories',
    sizes: [
      { name: 'One Size', inStock: true }
    ],
    colors: [
      { name: 'Brown', value: '#964B00' },
      { name: 'Black', value: '#000000' },
      { name: 'Red', value: '#FF0000' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', alt: 'Designer Bag - Front' },
      { src: 'https://images.unsplash.com/photo-1560891958-68bb1fe7fb78?auto=format&fit=crop&w=800&q=80', alt: 'Designer Bag - Side' }
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.7,
    reviewCount: 36
  },
  {
    id: 5,
    name: 'Floral Skirt',
    description: 'A beautiful floral skirt that\'s perfect for spring and summer. Light and flowy for maximum comfort.',
    price: 4999,
    category: 'women',
    subcategory: 'skirts',
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
      { name: 'XL', inStock: true }
    ],
    colors: [
      { name: 'Multicolor', value: '#FFFFFF' },
      { name: 'Blue', value: '#1E40AF' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&w=800&q=80', alt: 'Floral Skirt - Front' },
      { src: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80', alt: 'Floral Skirt - Side' }
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    rating: 4.3,
    reviewCount: 12
  },
  {
    id: 6,
    name: 'Leather Jacket',
    description: 'A classic leather jacket that never goes out of style. Perfect for adding an edge to any outfit.',
    price: 16599,
    category: 'men',
    subcategory: 'jackets',
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: 'XXL', inStock: false }
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Brown', value: '#964B00' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', alt: 'Leather Jacket - Front' },
      { src: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80', alt: 'Leather Jacket - Back' }
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 28
  },
  {
    id: 7,
    name: 'Denim Jeans',
    description: 'Classic denim jeans that pair well with any top. Durable and comfortable for everyday wear.',
    price: 6599,
    category: 'men',
    subcategory: 'jeans',
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    colors: [
      { name: 'Blue', value: '#1E40AF' },
      { name: 'Black', value: '#000000' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80', alt: 'Denim Jeans - Front' },
      { src: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80', alt: 'Denim Jeans - Back' }
    ],
    featured: false,
    bestSeller: true,
    newArrival: false,
    rating: 4.5,
    reviewCount: 42
  },
  {
    id: 8,
    name: 'Elegant Blouse',
    description: 'An elegant blouse that transitions seamlessly from office to evening wear. Made with luxurious fabric.',
    price: 5799,
    category: 'women',
    subcategory: 'tops',
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true }
    ],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Red', value: '#FF0000' }
    ],
    images: [
      { src: 'https://images.unsplash.com/photo-1604575861853-43f3ed778353?auto=format&fit=crop&w=800&q=80', alt: 'Elegant Blouse - Front' },
      { src: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80', alt: 'Elegant Blouse - Back' }
    ],
    featured: true,
    bestSeller: false,
    newArrival: true,
    rating: 4.6,
    reviewCount: 18
  }
]; 