
import { permanentRedirect } from 'next/navigation'
import { Metadata } from 'next'

import Wrapper from '@/components/layout/wrapper'

import { slugifyKeyword } from '@/helpers/utils'

export async function generateMetadata(
  { params }: { params: { section: string } }
): Promise<Metadata> {

  return {
    title: `Top Rising Stories | InFold`,
    description: 'News is broken and driven by different agendas. We\'re here to help you get context, delve deeper, and learn more.'
  }
}

export default async function Home({ searchParams }: { searchParams: any }) {

  if (searchParams.keywords)
    permanentRedirect(`/keyword/${slugifyKeyword(decodeURIComponent(searchParams.keywords))}`)

  return (
    <Wrapper />
  )
}