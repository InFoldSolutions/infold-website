import Wrapper from '@/components/layout/wrapper'
import { permanentRedirect } from 'next/navigation'

import { slugifyKeyword } from '@/helpers/utils'

export default async function Home({ searchParams }: { searchParams: any }) {

  if (searchParams.keywords)
    permanentRedirect(`/keyword/${slugifyKeyword(decodeURIComponent(searchParams.keywords))}`)

  const topKeywords: any = []
  const totalResults: number = 0

  return (
    <Wrapper initialFeedData={null} topKeywords={topKeywords} totalResults={totalResults} />
  )
}