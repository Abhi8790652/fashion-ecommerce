// API configuration and base setup
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      method,
      headers,
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API Error: ${response.status}`)
    }

    return response.json()
  }

  // Auth endpoints
  async register(name: string, email: string, password: string) {
    const response = await this.request<{
      token: string
      user: { id: string; name: string; email: string }
    }>('/auth/register', 'POST', { name, email, password })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async login(email: string, password: string) {
    const response = await this.request<{
      token: string
      user: { id: string; name: string; email: string }
    }>('/auth/login', 'POST', { email, password })
    if (response.token) {
      this.setToken(response.token)
    }
    return response
  }

  async getMe() {
    return this.request('/auth/me', 'GET')
  }

  async updateProfile(userData: any) {
    return this.request('/auth/profile', 'PUT', userData)
  }

  // Product endpoints
  async getProducts(filters?: { category?: string; featured?: boolean; search?: string }) {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.featured) params.append('featured', String(filters.featured))
    if (filters?.search) params.append('search', filters.search)

    const query = params.toString()
    return this.request(`/products${query ? '?' + query : ''}`, 'GET')
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`, 'GET')
  }

  // Order endpoints
  async createOrder(orderData: any) {
    return this.request('/orders', 'POST', orderData)
  }

  async getOrders() {
    return this.request('/orders', 'GET')
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`, 'GET')
  }
}

export const apiClient = new ApiClient()
