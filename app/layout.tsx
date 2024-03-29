import { Suspense } from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AuthContextProvider } from '@/context/auth'

import Analytics from '@/components/helpers/ganalytics'

import './globals.css'
import './icons.min.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InFold - Discover The Full Story',
  description: 'News is broken and driven by different agendas. We\'re here to help you get context, delve deeper, and learn more.',
}

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GTM_TRACKING_ID &&
        <Suspense>
          <Analytics />
        </Suspense>
      }

      <body className={`${inter.className} bg-white dark:bg-black w-full`}>
        <AuthContextProvider>
          {modal}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
