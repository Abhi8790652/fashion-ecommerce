import express from 'express'
import { createOrder, getOrders, getOrder } from '../controllers/orderController'
import { protect } from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(protect)

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrder)

export default router
