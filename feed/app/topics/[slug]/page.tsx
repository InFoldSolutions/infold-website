import { getTopic } from '@/helpers/api'
import Timeline from '@/components/timeline';

export default async function Topic({ params }: { params: { slug: string } }) {
  const data = await getTopic(params.slug);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between lg:p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <div className='mx-auto max-w-[780px] px-4'>
          <h3 className='mb-4 text-3xl font-bold leading-snug text-left'>
            {data.title}<br />
            <small className='text-sm'>Summarized from {data.sources.length} sources.</small>
          </h3>
          <div className='text-left'>
            <ul className='list-inside list-disc'>
              {data.outline.slice(0, 2).map((outline: string, index: number) => (
                <li className='mb-4' key={index}>
                  {outline}
                </li>
              ))}
            </ul>
          </div>

          <Timeline data={data} />
        </div>
      </div>
    </main>
  )
}