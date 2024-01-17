import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Top Rising Stories | InFold`,
    description: `Get latest news, stories, and articles all in one place.`
  }
}

export default async function Rising() {
  permanentRedirect(`/`)
}