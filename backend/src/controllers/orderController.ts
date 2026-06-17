import { Request, Response } from 'express'
import Order from '../models/Order'

// @desc    Create order
// @route   POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body

    // Calculate totals
    const totalPrice = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )
    const shippingPrice = totalPrice > 4000 ? 0 : 400
    const tax = totalPrice * 0.05
    const finalPrice = totalPrice + shippingPrice + tax

    const order = await Order.create({
      userId: req.user?.id,
      items,
      totalPrice,
      shippingPrice,
      tax,
      finalPrice,
      paymentMethod,
      shippingAddress,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
    })

    res.status(201).json({
      success: true,
      order,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc    Get user orders
// @route   GET /api/orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user?.id }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc    Get single order
// @route   GET /api/orders/:id
export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    // Check if user owns the order
    if (order.userId.toString() !== req.user?.id) {
      return res.status(403).json({ error: 'Not authorized to view this order' })
    }

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}
