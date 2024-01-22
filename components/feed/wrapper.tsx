
'use client'

import { Suspense, useEffect, useCallback, useReducer, ReactNode } from 'react'

import ActionsBar from '@/components/layout/actionsbar'
import Feed from '@/components/feed/feed'
import Loading from '@/components/helpers/loading'

import { feedsReducer } from '@/reducers/feeds'

import { FeedMeta } from '@/types/feedmeta'
import { slugifyKeyword } from '@/helpers/utils'

export default function FeedWrapper(): ReactNode {

  const [feeds, dispatchFeeds] = useReducer(feedsReducer, [])

  const addNewFeed = useCallback(() => {
    dispatchFeeds({
      type: 'added',
      data: {
        type: 'new',
        id: 'newtopic',
        keyword: '',
        live: false,
        icon: 'fad fa-search',
        iconColor: 'text-green-500'
      }
    })
  }, [])

  const removeFeed = useCallback((id: string) => {
    dispatchFeeds({
      type: 'removed',
      id: id
    })
  }, [])

  const setMeta = useCallback((id: string, data: FeedMeta) => {
    dispatchFeeds({
      type: 'changed',
      id: id,
      data: {
        ...data,
        id: slugifyKeyword(data.keyword)
      }
    })
  }, [])

  useEffect(() => {
    dispatchFeeds({
      type: 'load'
    })
  }, [])

  return (
    <div className='flex items-start flex-row font-mono overflow-y-hidden overflow-x-hidden md:overflow-x-scroll h-[100vh] w-full'>
      <ActionsBar addNewFeed={addNewFeed} />

      <div className='flex relative z-0 w-full h-full'>
        <Suspense fallback={<Loading />}>
          {feeds.map((feed: FeedMeta, index: number) =>
            <Feed meta={feed} removeFeed={removeFeed} setMeta={setMeta} key={index} />
          )}
          {feeds.length === 0 &&
            <div className='w-full h-full justify-center my-auto flex items-center'>
              <Loading />
            </div>
          }
        </Suspense>
      </div>
    </div>
  )
}