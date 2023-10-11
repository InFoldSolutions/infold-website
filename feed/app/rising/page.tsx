import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation'

export async function generateMetadata(
  { params }: { params: { keyword: string } }
): Promise<Metadata> {

  const keyword = decodeURIComponent(params.keyword)

  return {
    title: `Top Rising Stories | InFold`,
    description: `Get latest news, stories, and articles all in one place.`
  }
}

export default async function Rising() {
  permanentRedirect(`/feed`)
}