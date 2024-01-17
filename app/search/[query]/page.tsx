import { Metadata } from 'next';

import { unSlugifyKeyword } from '@/helpers/utils';
import { permanentRedirect } from 'next/navigation';

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
  permanentRedirect(`/`)
}