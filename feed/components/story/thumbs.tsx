import Image from 'next/image'

export default function Thumbs({ media }: { media: any }) {
  return (
    <div className='mr-4 hidden md:flex'>
      <ul className='flex relative max-h-[90px] max-w-[150px]'>
        {media.slice(0, 1).map((item: any, index: number) => (
          <li className={`overflow-hidden max-w-[150px] rounded`} key={index}>
            <Image unoptimized src={item.thumbnails?.medium?.url} alt={item.title} width={item.thumbnails?.medium?.width} height={item.thumbnails?.medium?.height} className='min-w-[150px]' />
          </li>
        ))}
      </ul>
    </div>
  )

  /*
  <span className='absolute bottom-0 left-1 text-2xl self-start'>
    <i className='fab fa-youtube text-red-600' />
  </span>
*/
}