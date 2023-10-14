// lib/gtm.ts
type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[]
}

declare const window: WindowWithDataLayer

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_TRACKING_ID

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    })
  } else {
    console.log({
      event: "pageview",
      page: url,
    })
  }
}

export function trackEvent({ action, params }: { action: string, params: any }) {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: action,
      ...params
    })
  } else {
    console.log({
      event: action,
      ...params
    })
  }
}