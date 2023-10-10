import Wrapper from '@/components/layout/wrapper'

export default async function Home() {

  // TO-DO
  // Server side personal feed

  const topKeywords: any = []
  const totalResults: number = 0

  return (
    <Wrapper initialFeedData={null} topKeywords={topKeywords} totalResults={totalResults} />
  )
}