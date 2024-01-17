import { Metadata } from 'next';

import { unSlugifyKeyword } from '@/helpers/utils';
import { permanentRedirect } from 'next/navigation';

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
  permanentRedirect(`/`)
}