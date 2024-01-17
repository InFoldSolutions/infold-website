import { MouseEventHandler, MouseEvent, useCallback } from 'react'

import { useRouter } from 'next/navigation'

export default function Category({ data }: { data: any }) {
  const router = useRouter()

  const openSection: MouseEventHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation()

    // @ts-ignore   
    const section = e.target.textContent

    router.push(`/section/${section}`)
  }, [router])

  return (
    <span className='text-base group flex items-center mb-1'>
      <i className={`fad ${data.categoryIcon} mr-3 ${data.categoryIcon !== 'fa-user-chart' ? 'text-[17px]' : ''}`} />
      <span>{data.category}</span>
    </span>
  )
}