
//
// Fetch top posts from a subreddit
// reddit.com/r/[subreddit].json?count=[number]&after=[id]
//

import { RedditPost } from '@/types/redditpost'
import { APIResponse } from '@/types/response'

export async function getSubredditJSON(subreddit: string, offsetId: string): Promise<APIResponse> {
  if (subreddit.includes('r/'))
    subreddit = subreddit.split('r/')[1]

  let posts: RedditPost[] = []
  let pageSize: number = 25

  try {
    posts = await fetch(`https://www.reddit.com/r/${subreddit}.json?count=${pageSize}&after=${offsetId}`)
      .then(res => res.json())
      .then(json => json.data.children.map((c: any) => c.data)) // example response: https://www.reddit.com/r/all.json
  } catch (error) {
    console.error('Failed to fetch subreddit data', error)
    return {
      meta: {
        success: false,
        total_results: 0
      },
      data: []
    }
  }

  return {
    meta: {
      success: true,
      total_results: posts.length
    },
    data: posts
  }
}