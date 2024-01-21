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

export function feedsReducer(feeds: FeedMeta[], action: FeedsReducerAction) {
  switch (action.type) {
    case 'added': {
      if (!action.data) throw Error('No data provided')

      if (!action.data.id && action.data.keyword)
        action.data.id = slugifyKeyword(action.data.keyword)

      const newFeeds = [action.data].concat(feeds) // attach to the front

      setLocalStorage('feeds', newFeeds)

      return newFeeds
    }
    case 'removed': {
      const newFeeds = feeds.filter((item: any) => item.id !== action.id)

      setLocalStorage('feeds', newFeeds)

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

      setLocalStorage('feeds', newFeeds)

      return newFeeds
    }
    case 'load': {
      if (feeds.length > 0) return feeds

      const localFeeds = getLocalStorage('feeds')

      if (localFeeds && localFeeds.length > 0)
        return localFeeds

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