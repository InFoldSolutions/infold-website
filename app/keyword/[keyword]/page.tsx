import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import { unSlugifyKeyword } from '@/helpers/utils';

export async function generateMetadata(
  { params }: { params: { keyword: string } }
): Promise<Metadata> {

  const keyword = unSlugifyKeyword(params.keyword)

  return {
    title: `${keyword} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${keyword} all in one place.`
  }
}

export default async function Keyword({ params }: { params: { keyword: string } }) {
  return (
    <Wrapper />
  )
}