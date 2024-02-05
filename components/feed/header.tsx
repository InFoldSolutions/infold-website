import { useCallback, useRef, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

import Tooltip from '@/components/helpers/tooltip'

import { FeedMeta } from '@/types/feedmeta'
import { useDebounce } from '@/helpers/useDebounce'

export default function FeedHeader({ meta, removeFeed, setMeta }: { meta: FeedMeta, removeFeed: any, setMeta: any }) {

  const [keyword, setKeyword] = useState(meta.keyword || '')
  const [type, setType] = useState(meta.type)
  const [icon, setIcon] = useState(meta.icon)
  const [isEdit, setIsEdit] = useState(meta.edit)
  const [iconColor, setIconColor] = useState(meta.iconColor)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const removeCurrentFeed = useCallback(() => {
    removeFeed(meta.id)
  }, [meta])

  const updateMeta = useDebounce(() => {
    setMeta(meta.id, {
      ...meta,
      keyword,
      type,
      icon,
      iconColor,
      edit: isEdit
    })
  }, 500)

  const onInputHandler = useCallback((e: ChangeEvent) => {
    const text = inputRef?.current?.value || ''

    let ttype = 'topic', ticon = 'fad fa-landmark', ticonColor = 'text-gray-400'

    if (text.startsWith('r/')) {
      ttype = 'subreddit'
      ticon = 'fab fa-reddit-alien'
      ticonColor = 'text-orange-500'
    } else if (text.startsWith('@')) {
      ttype = 'handle'
      ticon = 'fab fa-twitter'
      ticonColor = 'text-blue-400'
    }

    if (text === '')
      ttype = 'new'

    setKeyword(text)
    setType(ttype)
    setIcon(ticon)
    setIconColor(ticonColor)

    updateMeta()
  }, [inputRef, meta])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')
      cancelEdit()
    else if (e.key === 'Enter')
      applyChanges()
  }, [meta])

  const applyChanges = useCallback(() => {
    if (!meta.keyword || meta.keyword === '')
      return

    setIsEdit(false)
    updateMeta()
  }, [meta])

  const editFeed = useCallback(() => {
    if (meta.type === 'featured')
      return

    setIsEdit(true)
  }, [meta])

  const cancelEdit = useCallback(() => {
    if (meta.id === 'newtopic' || meta.keyword === '')
      return removeCurrentFeed()

    setKeyword(meta.keyword)
    setType(meta.type)
    setIcon(meta.icon)
    setIconColor(meta.iconColor)

    setIsEdit(false)
    updateMeta()
  }, [meta])

  useEffect(() => {
    setKeyword(meta.keyword)
    setIcon(meta.icon)
    setIconColor(meta.iconColor)
    setType(meta.type)
    setIsEdit(meta.edit)
  }, [meta])

  return (
    <div className='relative flex py-3 px-4 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-60 border-b-2 border-gray-200 dark:border-gray-800 items-center z-40'>
      <div
        className='text-xl text-body-color flex flex-col w-full'>
        <div className='flex items-center w-full'>
          <i className={`${icon} ${iconColor} text-xl mr-4`}></i>

          <div className={`relative w-full`}>
            <div className='flex w-full text-xs text-gray-600'>
              {type === 'new' &&
                <span>topic | @handle | r/[sub]</span>
              }
              {type !== 'new' &&
                <span>{type}</span>
              }
            </div>

            {!isEdit &&
              <span className='border-b-2 border-transparent w-full' onDoubleClick={editFeed}>{keyword}</span>
            }
            {isEdit &&
              <input type='text'
                ref={inputRef}
                value={keyword}
                placeholder='Search..'
                autoFocus
                className='w-full text-xl text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none border-b-2 border-transparent focus:border-gray-200 focus:dark:border-gray-800'
                onChange={onInputHandler}
                onKeyDown={handleKeyDown} />
            }
          </div>
        </div>
      </div>

      <div className="flex ml-auto items-center">
        {meta.live &&
          <div className="mr-1 text-red-400 flex items-center">
            <span className="flex relative h-3 w-3 mr-2 rounded-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live
          </div>
        }

        <div className='text-center'>
          {!isEdit && type !== 'featured' &&
            <Tooltip message='Edit feed' top={10} right={2} padding={1} minWidth={85}>
              <i className='fad fa-sliders-h text-xl cursor-pointer opacity-40 hover:opacity-100' onClick={editFeed} />
            </Tooltip>
          }
          {isEdit &&
            <span className='flex flex-row items-center'>
              <Tooltip message='Remove feed' top={10} right={3} padding={1} minWidth={100}>
                <i className='fad fa-trash text-xl cursor-pointer text-blue-500 opacity-40 hover:opacity-100' onClick={removeCurrentFeed} />
              </Tooltip>
              <span className='px-2 text-gray-400 dark:text-white h-full flex opacity-50'>|</span>
              <Tooltip message='Cancel edit' top={10} right={3} padding={1} minWidth={100}>
                <i className='fad fa-window-close text-2xl cursor-pointer text-gray-500 dark:text-white opacity-40 hover:opacity-100' onClick={cancelEdit} />
              </Tooltip>
              <Tooltip message='Apply changes' top={10} right={3} padding={1} minWidth={110}>
                <i className='fad fa-check-square text-2xl cursor-pointer text-green-500 opacity-40 hover:opacity-100 ml-2' onClick={applyChanges} />
              </Tooltip>
            </span>
          }
        </div>
      </div>

      <i className='hidden w-0 h-0 overflow-hidden absolute top-0 right-0 text-white text-orange-500 text-yellow-600 text-blue-400 text-gray-400 text-green-400' />
    </div>
  )
}