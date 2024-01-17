
//
// Reddit POST in JSON format
// for full schema see https://www.reddit.com/r/all.json
//

type RedditVideo = {
  bitrate_kbps: number
  fallback_url: string
  has_audio: boolean
  height: number
  width: number
  scrubber_media_url: string
  dash_url: string
  duration: number
  hls_url: string
  is_gif: boolean
  transcoding_status: string
}

export type RedditPost = {
  selftext: string
  author_fullname: string
  title: string
  subreddit_name_prefixed: string
  thumbnail_height: number
  name: string
  upvote_ratio: number
  ups: number
  thumbnail_width: number
  score: null
  thumbnail: string
  post_hint: string
  created: number
  url_overridden_by_dest: string
  id: string
  author: string
  num_comments: number
  permalink: string // /r/meirl/comments/198otup/meirl/
  url: string
  created_utc: number
  is_video: boolean
  media: {
    reddit_video: RedditVideo
  }
}

