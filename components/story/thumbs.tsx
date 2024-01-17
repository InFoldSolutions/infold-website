import Image from 'next/image'

export default function Thumbs({ media }: { media: any }) {
  return (
    <div className='mb-2 hidden md:flex'>
      <ul className='flex relative w-full'>
        {media.slice(0, 1).map((item: any, index: number) => (
          <li className={`overflow-hidden w-full rounded`} key={index}>
            <Image unoptimized src={item.thumbnails?.medium?.url} alt={item.title} width={item.thumbnails?.medium?.width} height={item.thumbnails?.medium?.height} className='min-w-[180px]' />
          </li>
        ))}
      </ul>
    </div>
  )
}