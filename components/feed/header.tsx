import { useCallback, useRef, ChangeEvent } from 'react'

import Tooltip from '@/components/helpers/tooltip'

import { FeedMeta } from '@/types/feedmeta'

export default function FeedHeader({ meta, removeFeed, setMeta }: { meta: FeedMeta, removeFeed: any, setMeta: any }) {

  const inputRef = useRef<HTMLInputElement | null>(null)
  const removeCurrentFeed = useCallback(() => {
    removeFeed(meta.id)
  }, [meta])

  const onInputHandler = useCallback((e: ChangeEvent) => {
    const text = inputRef?.current?.value || ''

    if (text === '')
      return setMeta(meta.id, {
        ...meta,
        type: 'new',
        keyword: ''
      })

    let type = 'topic', icon = 'fad fa-landmark', iconColor = 'text-gray-400'

    if (text.startsWith('r/')) {
      type = 'subreddit'
      icon = 'fab fa-reddit-alien'
      iconColor = 'text-orange-500'
    } else if (text.startsWith('@')) {
      type = 'handle'
      icon = 'fab fa-twitter'
      iconColor = 'text-blue-400'
    }

    setMeta(meta.id, {
      ...meta,
      type: type,
      keyword: text,
      icon: icon,
      iconColor: iconColor
    })
  }, [inputRef, meta])

  const applyChanges = useCallback(() => {
    if (!meta.keyword || meta.keyword === '')
      return

    setMeta(meta.id, {
      ...meta,
      edit: false
    })
  }, [meta])

  const editFeed = useCallback(() => {
    setMeta(meta.id, {
      ...meta,
      edit: true
    })
  }, [meta])

  const cancelEdit = useCallback(() => {
    if (meta.id === 'newtopic')
      return removeFeed(meta.id)

    setMeta(meta.id, {
      ...meta,
      edit: false
    })
  }, [meta])

  return (
    <div className='relative flex py-3 px-4 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 border-b-2 border-gray-200 dark:border-gray-800 items-center z-40'>
      <div
        className='text-xl text-body-color flex flex-col w-full'>
        <div className='flex items-center w-full'>
          <i className={`${meta.icon} ${meta.iconColor} text-xl mr-4`}></i>

          <div className={`relative w-full`}>
            <div className='flex w-full text-xs text-gray-600'>
              {meta.type === 'new' &&
                <span>topic | @handle | r/[sub]</span>
              }
              {meta.type !== 'new' &&
                <span>{meta.type}</span>
              }
            </div>

            {!meta.edit && meta.keyword}
            {meta.edit &&
              <input type='text'
                ref={inputRef}
                value={meta.keyword}
                placeholder='Search..'
                autoFocus
                className='w-full text-xl text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none'
                onChange={onInputHandler} />
            }
          </div>
        </div>
      </div>

      <div className="flex ml-auto items-center">
        {meta.live &&
          <div className="mr-4 text-red-400 flex items-center">
            <span className="flex relative h-3 w-3 mr-2 rounded-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live
          </div>
        }

        <div>
          {!meta.edit &&
            <Tooltip message='Edit feed' top={10} right={2} padding={1} minWidth={77}>
              <i className='fad fa-sliders-h text-xl cursor-pointer opacity-40 hover:opacity-100' onClick={editFeed} />
            </Tooltip>
          }
          {meta.edit &&
            <span className='flex flex-row items-center'>
              <Tooltip message='Apply changes' top={10} right={3} padding={1} minWidth={103}>
                <i className='fad fa-check-square text-2xl cursor-pointer text-green-500 opacity-40 hover:opacity-100 mr-2' onClick={applyChanges} />
              </Tooltip>
              <Tooltip message='Cancel edit' top={10} right={3} padding={1} minWidth={90}>
                <i className='fad fa-window-close text-2xl cursor-pointer text-gray-500 dark:text-white opacity-40 hover:opacity-100' onClick={cancelEdit} />
              </Tooltip>
              <span className='px-2 text-gray-400 dark:text-white h-full flex opacity-50'>|</span>
              <Tooltip message='Remove feed' top={10} right={3} padding={1} minWidth={90}>
                <i className='fad fa-trash text-xl cursor-pointer text-blue-500 opacity-40 hover:opacity-100' onClick={removeCurrentFeed} />
              </Tooltip>
            </span>
          }
        </div>
      </div>

      <i className='hidden w-0 h-0 overflow-hidden absolute top-0 right-0 text-white text-orange-500 text-yellow-600 text-blue-400 text-gray-400 text-green-400' />
    </div>
  )
}