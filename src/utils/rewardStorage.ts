// Simple reward points storage using localStorage

const STORAGE_KEY = 'fashion_store_rewards'

type RewardsMap = Record<string, number>

const isBrowser = () => typeof window !== 'undefined'

export const rewardStorage = {
  getAll: (): RewardsMap => {
    if (!isBrowser()) return {}
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch (err) {
      console.error('Error reading rewards:', err)
      return {}
    }
  },

  getReward: (email: string): number => {
    if (!isBrowser()) return 0
    try {
      const map = rewardStorage.getAll()
      return map[email] || 0
    } catch (err) {
      console.error('Error getting reward for', email, err)
      return 0
    }
  },

  setReward: (email: string, points: number): void => {
    if (!isBrowser()) return
    try {
      const map = rewardStorage.getAll()
      map[email] = points
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
    } catch (err) {
      console.error('Error setting reward for', email, err)
    }
  },

  addReward: (email: string, points: number): void => {
    if (!isBrowser()) return
    try {
      const current = rewardStorage.getReward(email)
      rewardStorage.setReward(email, current + Math.max(0, Math.floor(points)))
    } catch (err) {
      console.error('Error adding reward for', email, err)
    }
  },

  useReward: (email: string, points: number): boolean => {
    if (!isBrowser()) return false
    try {
      const current = rewardStorage.getReward(email)
      const use = Math.max(0, Math.floor(points))
      if (use > current) return false
      rewardStorage.setReward(email, current - use)
      return true
    } catch (err) {
      console.error('Error using reward for', email, err)
      return false
    }
  },

  clearAll: (): void => {
    if (!isBrowser()) return
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error('Error clearing rewards', err)
    }
  }
}

export default rewardStorage
