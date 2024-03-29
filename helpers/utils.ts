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
  return decodeURIComponent(keyword.replace(/-/g, ' '))
}

export function unSlugifySection(section: string) {
  section = decodeURIComponent(section)
  return section.replace(/\+/g, ' ').replace(/-/g, ' ').replace(/%26/g, '&')
}

export function searchParamsToQueryParams(searchParams: any) {
  return Object.keys(searchParams).map((key) => {
    return `${key}=${searchParams[key]}`
  }).join('&')
}

export const isBrowser = typeof window !== "undefined"