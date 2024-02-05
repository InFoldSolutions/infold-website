import { setLocalStorage, getLocalStorage } from '@/apis/localstorage'

import { FeedMeta } from '@/types/feedmeta'

import config from '@/config'
import { slugifyKeyword } from '@/helpers/utils'

export type FeedsReducerAction = {
  type: 'added' | 'changed' | 'removed' | 'load',
  data?: FeedMeta,
  id?: string
  init?: boolean
}

export function feedsReducer(feeds: FeedMeta[], action: FeedsReducerAction): FeedMeta[] {
  switch (action.type) {
    case 'added': {
      if (!action.data) throw Error('No data provided')

      if (!action.data.id && action.data.keyword)
        action.data.id = slugifyKeyword(action.data.keyword)

      if (!action.data.id) throw Error('No id provided')

      let newFeeds: FeedMeta[] = []

      const exists = feeds.find((item: any) => item.id === action.data?.id)

      if (exists)
        newFeeds = feeds.filter((item: any) => item.id !== action.data?.id)

      newFeeds = [action.data].concat(feeds)

      updateLocalStorage(newFeeds)

      return newFeeds
    }
    case 'removed': {
      const newFeeds = feeds.filter((item: any) => item.id !== action.id)

      updateLocalStorage(newFeeds)

      return newFeeds
    }
    case 'changed': {
      const newFeeds = feeds.map((item: any) => {
        if (item.id === action.id) {
          return action.data
        } else {
          return item
        }
      })

      updateLocalStorage(newFeeds)

      return newFeeds
    }
    case 'load': {
      if (feeds.length > 0) return feeds

      const localFeeds = getLocalStorage('feeds')

      if (localFeeds && localFeeds.length > 0) {
        return localFeeds.map((item: FeedMeta) => {
          return {
            ...item,
            id: slugifyKeyword(item.keyword)
          }
        })
      }

      return config.defaultFeeds.map((item: FeedMeta) => {
        return {
          ...item,
          id: slugifyKeyword(item.keyword)
        }
      })
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

function updateLocalStorage(feeds: FeedMeta[]) {
  setLocalStorage('feeds', feeds.filter((item: any) => item.id !== 'newtopic'))
}