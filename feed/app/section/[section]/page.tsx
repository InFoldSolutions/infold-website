import { Metadata } from 'next';

import Wrapper from '@/components/layout/wrapper'

import { unSlugifyKeyword } from '@/helpers/utils';

export async function generateMetadata(
  { params }: { params: { section: string } }
): Promise<Metadata> {

  const section = unSlugifyKeyword(params.section)

  return {
    title: `${section} Latest News, Stories, Videos | InFold`,
    description: `Get latest news, stories, and articles about ${section} all in one place.`
  }
}

export default async function Section({ params }: { params: { section: string } }) {
  return (
    <Wrapper />
  )
}