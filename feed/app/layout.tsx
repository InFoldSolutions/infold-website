import './globals.css'
import './icons.min.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AuthContextProvider } from '@/context/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InFold - Get The Full Story',
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
      <body className={`${inter.className} bg-gray-300 dark:bg-black overflow-y-scroll overflow-x-hidden w-full`}>
        <AuthContextProvider>
          {modal}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
