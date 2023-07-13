
'use client'

import { useEffect, useState, use } from "react";

import events from "@/app/services/events";
import { getFeed, Item } from "@/helpers/api"

export default function Feed({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    console.log('useEffect')

    events.on('filter', (endpoint: string, bucket: string) => {
      console.log('on filter', endpoint, bucket)
      let data;

      try {
        switch (endpoint) {
          case 'rising':
            data = use(getFeed(endpoint))
            break;
          case 'top':
            data = use(getFeed(endpoint, bucket))
            break;
          default:
            data = use(getFeed())
            break;
        }

        console.log('data', data)
        setData(data);
      } catch (error) {
        console.log('error', error)
        throw error;
      }
    });
  }, []);

  return (
    <ul>
      {data.topics.map((item: Item) => (
        <li className='mb-8' key={item.slug}>
          <h3 className='mb-8 text-3xl font-bold leading-snug text-left'>
            {item.title}<br />
            <small className='mb-4 text-sm'>Summarized from {item.articles} articles.</small>
          </h3>
          <div className='text-left'>
            <ul className="list-inside list-disc">
              {item.outline.slice(0, 2).map((outline: string, index: number) => (
                <li className='mb-4' key={index}>
                  {outline}
                  {index === 1 && <span>&nbsp;<span className="text-blue-500 underline">more..</span></span>}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}