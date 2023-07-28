import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InFold - Get The Full Story',
  description: '🔍 Get context, delve deeper, learn more. We read and compare thousands of sources, so you don\'t have to. 📚 Analyze articles, discover new sources.',
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
      <body className={inter.className}>
        {modal}
        {children}
      </body>
    </html>
  )
}
