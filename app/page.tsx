
import { Metadata } from 'next'

import FeedWrapper from '@/components/feed/wrapper'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Top Rising Stories | InFold`,
    description: 'News is broken and driven by different agendas. We\'re here to help you get context, delve deeper, and learn more.'
  }
}

export default async function Home() {
  return (
    <FeedWrapper />
  )
}