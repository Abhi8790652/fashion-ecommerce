import mongoose from 'mongoose'

interface IProduct extends mongoose.Document {
  name: string
  description: string
  price: number
  salePrice?: number
  category: 'men' | 'women' | 'accessories'
  subcategory?: string
  image: string
  images: string[]
  stock: number
  featured: boolean
  bestSeller: boolean
  newArrival: boolean
  onSale: boolean
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    salePrice: Number,
    category: {
      type: String,
      enum: ['men', 'women', 'accessories'],
      required: true,
    },
    subcategory: String,
    image: String,
    images: [String],
    stock: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model<IProduct>('Product', productSchema)
export default Product
