import { Metadata } from 'next';

import { unSlugifyKeyword, unSlugifySection } from '@/helpers/utils';
import { permanentRedirect } from 'next/navigation';

export async function generateMetadata(
  { params }: { params: { section: string } }
): Promise<Metadata> {

  const section = unSlugifySection(params.section)

  return {
    title: `${section} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${section} all in one place.`
  }
}

export default async function Section({ params }: { params: { section: string } }) {
  permanentRedirect(`/`)
}