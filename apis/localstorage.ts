
//
// Local storage management
//

import { isBrowser } from '@/helpers/utils'

export function getLocalStorage(key: string): any {
  if (!isBrowser) return

  const cachedValue = getCache(key)
  if (cachedValue) return cachedValue

  const storedValue = localStorage.getItem(key)
  if (storedValue) setCache(key, JSON.parse(storedValue))

  return getCache(key);
}

export function setLocalStorage(key: string, value: any) {
  if (!isBrowser) return

  localStorage.setItem(key, JSON.stringify(value))
  setCache(key, value)
}

const cacheMap: Map<string, any> = new Map();

export function getCache(key: string): any {
  return cacheMap.get(key)
}

export function setCache(key: string, value: any) {
  cacheMap.set(key, value)
}

export function removeCache(key: string) {
  cacheMap.delete(key)
}

export function clearCache() {
  cacheMap.clear()
}

