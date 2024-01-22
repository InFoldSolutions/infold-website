
//
// Fetch top posts from a subreddit
// reddit.com/r/[subreddit].json?count=[number]&after=[id]
//

import { RedditPost } from '@/types/redditpost'
import { APIResponse, ErrorAPIResponse } from '@/types/response'

export async function getSubredditJSON(subreddit: string, lastId?: string): Promise<APIResponse> {
  if (subreddit.includes('r/'))
    subreddit = subreddit.split('r/')[1]

  let posts: RedditPost[] = []
  let pageSize: number = 25
  let url = `https://www.reddit.com/r/${subreddit}.json?count=${pageSize}`

  if (lastId)
    url += `&after=${lastId}`

  try {
    posts = await fetch(url)
      .then(res => res.json())
      .then(json => json.data.children.map((c: any) => c.data)) // example response: https://www.reddit.com/r/all.json
  } catch (error) {
    return ErrorAPIResponse
  }

  return {
    meta: {
      success: true,
      total_results: posts.length
    },
    data: posts
  }
}