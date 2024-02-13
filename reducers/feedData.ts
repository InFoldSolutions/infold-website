import { getSubredditJSON } from '@/apis/reddit'
import { getFeaturedFeed, getSearchFeed } from '@/apis/infold'

import { RedditPost } from '@/types/redditpost'
import { Topic } from '@/types/topic'
import { APIResponse, ErrorAPIResponse } from '@/types/response';
import { FeedMeta } from '@/types/feedmeta';

export type FeedDataReducerAction = {
  type: 'load' | 'more' | 'clear'
  data: RedditPost[] | Topic[]
}

export function feedDataReducer(feedData: any[], action: FeedDataReducerAction): Topic[] | RedditPost[] {
  switch (action.type) {
    case 'load': {
      return action.data
    }
    case 'more': {
      return feedData.concat(action.data)
    }
    case 'clear': {
      return []
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export async function loadFeedData(meta: FeedMeta, offset: number, lastId: string): Promise<APIResponse> {
  let data: APIResponse

  if (meta.keyword.length < 3)
    return ErrorAPIResponse

  switch (meta.type) {
    case 'subreddit':
      data = await getSubredditJSON(meta.keyword, lastId)
      break;
    case 'keyword':
      data = await getSearchFeed(meta.keyword, offset)
      break;
    case 'featured':
      data = await getFeaturedFeed(offset)
      break;
    default:
      data = await getSearchFeed(meta.keyword, offset)
      break;
  }

  return data
}