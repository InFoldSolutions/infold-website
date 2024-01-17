
import { APIResponse } from "@/types/response";
import { FeedMeta } from "@/types/feedmeta";

import { getSubredditJSON } from '@/apis/reddits'
import { getKeywordFeed, getFeaturedFeed } from '@/apis/infold'

export async function loadFeed(meta: FeedMeta, offset: number, lastId: string): Promise<APIResponse> {

  let data: APIResponse

  switch (meta.type) {
    case 'subreddit':
      data = await getSubredditJSON(meta.keyword, lastId)
      break;
    case 'keyword':
      data = await getKeywordFeed(meta.keyword, offset)
      break;
    case 'featured':
      data = await getFeaturedFeed(offset)
      break;
    default:
      data = await getKeywordFeed(meta.keyword, offset)
      break;
  }

  return data
}