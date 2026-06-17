import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' as any }
  )
}
// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: 'User already exists with that email' })
    }

    // Create user
    user = await User.create({ name, email, password })

    // Generate token
    const token = generateToken(user._id.toString())

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' })
    }

    // Find user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user._id.toString())

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' })
  }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id)

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, city, state, zip, country } = req.body

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, phone, address, city, state, zip, country },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
