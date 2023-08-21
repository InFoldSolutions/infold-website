export default function Outline({ outlines, expanded, toggleExpanded }: { outlines: string[], expanded: boolean, toggleExpanded: any }) {
  return (
    <div className='text-left'>
      <ul className='list-inside list-disc'>
        {outlines.slice(0, 2).map((outline: string, index: number) => (
          <li className='mb-4 last:mb-0' key={index}>
            {outline}
            {(index == 1 && !expanded) &&
              <span className={`text-blue-500 underline ml-2 cursor-pointer`} onClick={toggleExpanded}>more..</span>
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
                <span className={`text-blue-500 underline ml-2 cursor-pointer`} onClick={toggleExpanded}>less..</span>
              }
            </li>
          ))}
        </ul>
      }
    </div>
  )
}