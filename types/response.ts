import { Topic } from "@/types/topic"
import { RedditPost } from "@/types/redditpost"

export type APIResponseMeta = {
  success: boolean
  total_results: number
}

export type APIResponse = {
  meta: APIResponseMeta,
  data: RedditPost[] | Topic[]
}

export type APIResponseError = {
  meta: APIResponseMeta,
  data: []

  error?: string
}

export const ErrorAPIResponse = {
  meta: {
    success: false,
    total_results: 0
  },
  data: []
}