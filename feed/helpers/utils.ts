export function findParentByCls(node: HTMLElement, cls: string, maxTries: number = 0): HTMLElement {
  let tries = 0

  while (!node.classList || !node.classList.contains(cls)) {
    // @ts-ignore
    node = node.parentElement

    if (!node || (maxTries > 0 && tries === maxTries)) {
      // @ts-ignore
      return null;
    }

    tries++
  }

  return node
}

export function findParentByDataset(node: HTMLElement, attr: string): HTMLElement {
  while (!node.dataset[attr]) {
    // @ts-ignore
    node = node.parentElement

    if (!node) {
      // @ts-ignore
      return null
    }
  }

  return node
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min) + min)
}

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function kFormatter(num: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(num)
}

export function slugifyKeyword(keyword: string) {
  return keyword.replace(/\s+/g, '-')
}

export function unSlugifyKeyword(keyword: string) {
  return keyword.replace(/-/g, ' ')
}

export const isBrowser = typeof window !== "undefined"