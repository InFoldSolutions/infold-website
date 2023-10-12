
export function trackEvent({ action, params }: { action: string, params: any }) {
  // @ts-ignore
  if (!window.gtag) return

  // @ts-ignore
  window.gtag('event', action, params)
}