import Wrapper from '@/components/wrapper';
import { getFeed, getSearchFeed } from '@/helpers/api'

export default async function Home({ params, searchParams }: { params: any, searchParams: any }) {
  const keywords = searchParams ? searchParams.keywords : '';
  const endpoint = searchParams.sort || 'rising';
  const bucket = searchParams.time || null;

  let data = null;

  if (keywords) 
    data = await getSearchFeed(keywords.split(','));
  else
    data = await getFeed(endpoint, 20, bucket);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Wrapper initialData={data} />
    </main>
  )
}