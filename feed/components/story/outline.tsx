import { trackEvent } from '@/helpers/gtm'
import { useCallback, useState } from 'react'

export default function Outline({ outlines }: { outlines: string[] }) {
  const [expanded, setExpanded] = useState<boolean>(false)

  const moreClick = useCallback(() => {
    trackEvent({
      action: "outline",
      params: {
        name: 'more'
      }
    })

    setExpanded(true)
  }, [setExpanded])
  
  const lessClick = useCallback(() => {
    trackEvent({
      action: "outline",
      params: {
        name: 'less'
      }
    })

    setExpanded(false)
  }, [setExpanded])

  return (
    <div className='text-left ml-2'>
      <ul className='list-inside list-disc'>
        {outlines.slice(0, 2).map((outline: string, index: number) => (
          <li className='mb-4 last:mb-0' key={index}>
            {outline}
            {(index == 1 && !expanded) &&
              <span className={`text-blue-500 hover:underline ml-2 cursor-pointer`} onClick={() => moreClick()}>more..</span>
            }
          </li>
        ))}
      </ul>

      {expanded &&
        <ul className='list-inside list-disc mt-4'>
          {outlines.slice(2).map((outline: string, index: number) => (
            <li className='mb-4 last:mb-0' key={index}>
              {outline}
              {(index + 3 == outlines.length && expanded) &&
                <span className={`text-blue-500 hover:underline ml-2 cursor-pointer`} onClick={() => lessClick()}>less..</span>
              }
            </li>
          ))}
        </ul>
      }
    </div>
  )
}