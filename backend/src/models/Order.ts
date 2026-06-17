import mongoose from 'mongoose'

interface CartItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: number
  quantity: number
  image: string
}

interface IOrder extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  items: CartItem[]
  totalPrice: number
  shippingPrice: number
  tax: number
  finalPrice: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'card' | 'cod' | 'upi'
  paymentStatus: 'pending' | 'completed' | 'failed'
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    postalCode: string
  }
  orderNumber: string
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cod', 'upi'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      address: String,
      city: String,
      postalCode: String,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
)

// Generate order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await Order.countDocuments()
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`
  }
  next()
})

const Order = mongoose.model<IOrder>('Order', orderSchema)
export default Order
