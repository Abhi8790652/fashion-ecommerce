// Utility functions for safely accessing client-side storage

/**
 * Check if the code is running in a browser environment
 */
const isBrowser = () => typeof window !== 'undefined';

/**
 * Safely get an item from localStorage
 * 
 * @param key The key to retrieve
 * @param defaultValue A default value to return if the key doesn't exist or localStorage isn't available
 * @returns The value from localStorage or the default value
 */
export const getLocalStorage = (key: string, defaultValue: any = null): any => {
  if (!isBrowser()) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely set an item in localStorage
 * 
 * @param key The key to set
 * @param value The value to store
 * @returns true if successful, false if failed
 */
export const setLocalStorage = (key: string, value: any): boolean => {
  if (!isBrowser()) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Safely remove an item from localStorage
 * 
 * @param key The key to remove
 * @returns true if successful, false if failed
 */
export const removeLocalStorage = (key: string): boolean => {
  if (!isBrowser()) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
}; 