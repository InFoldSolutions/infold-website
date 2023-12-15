import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation'

export async function generateMetadata(
  { params }: { params: { bucket: string } }
): Promise<Metadata> {

  const bucket = decodeURIComponent(params.bucket)

  let topListName = ''

  switch (bucket) {
    case 'hour':
      topListName = 'Hourly'
      break
    case 'day':
      topListName = 'Daily'
      break
    case 'week':
      topListName = 'Weekly'
      break
    case 'month':
      topListName = 'Monthly'
      break
    case 'year':
      topListName = 'Yearly'
      break
    default:
      topListName = 'Weekly'
      break
  }

  return {
    title: `Top ${topListName} Stories | InFold`,
    description: `Get latest news, stories, and articles all in one place.`
  }
}

export default async function Top() {
  permanentRedirect(`/feed`)
}