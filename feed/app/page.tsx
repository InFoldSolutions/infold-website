import Wrapper from '@/components/wrapper';
import { getFeed } from '@/helpers/api'

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('Home params', params);
  console.log('Home searchParams', searchParams);
  const data = await getFeed();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Wrapper initialData={data} />
    </main>
  )
}