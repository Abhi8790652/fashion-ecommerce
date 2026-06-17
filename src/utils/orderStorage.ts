export type PaymentMethod = 'card' | 'upi' | 'cod'

export interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  customer: {
    name: string
    email: string
    address: string
    paymentMethod: PaymentMethod
    upiId?: string
    last4CardDigits?: string
  }
}

const STORAGE_KEY = 'fashion_store_orders'

export const orderStorage = {
  getOrders: (): Order[] => {
    if (typeof window === 'undefined') return []
    try {
      const orders = localStorage.getItem(STORAGE_KEY)
      return orders ? JSON.parse(orders) : []
    } catch (error) {
      console.error('Error getting orders from storage:', error)
      return []
    }
  },

  addOrder: (order: Order): void => {
    if (typeof window === 'undefined') return
    try {
      const orders = orderStorage.getOrders()
      orders.push(order)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
    } catch (error) {
      console.error('Error adding order to storage:', error)
    }
  },

  clearOrders: (): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing orders from storage:', error)
    }
  }
} 