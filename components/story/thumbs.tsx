import Image from 'next/image'

export default function Thumbs({ media }: { media: any }) {
  return (
    <div className='mr-4 hidden md:flex'>
      <ul className='flex relative max-h-[120px] max-w-[180px]'>
        {media.slice(0, 1).map((item: any, index: number) => (
          <li className={`overflow-hidden max-w-[180px] rounded`} key={index}>
            <Image unoptimized src={item.thumbnails?.medium?.url} alt={item.title} width={item.thumbnails?.medium?.width} height={item.thumbnails?.medium?.height} className='min-w-[180px]' />
          </li>
        ))}
      </ul>
    </div>
  )
}