import { Metadata } from 'next';
import Wrapper from '@/components/layout/wrapper'

import { unSlugifyKeyword } from '@/helpers/utils';

export async function generateMetadata(
  { params }: { params: { query: string } }
): Promise<Metadata> {

  const query = unSlugifyKeyword(params.query)

  return {
    title: `${query} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${query} all in one place.`
  }
}

export default async function Search() {
  return (
    <Wrapper />
  )
}