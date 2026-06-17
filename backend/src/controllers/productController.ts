import { Request, Response } from 'express'
import Product from '../models/Product'

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, featured, search } = req.query
    const filter: any = {}

    if (category) {
      filter.category = category
    }

    if (featured === 'true') {
      filter.featured = true
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const products = await Product.find(filter)

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc    Get single product
// @route   GET /api/products/:id
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc    Create product (admin only)
// @route   POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      product,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc    Update product (admin only)
// @route   PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
