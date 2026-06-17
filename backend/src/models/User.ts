import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
  next()
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
  return await bcryptjs.compare(password, this.password)
}

const User = mongoose.model<IUser>('User', userSchema)
export default User
