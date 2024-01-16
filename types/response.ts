import { Topic } from "@/types/topic"

export type APIResponseMeta = {
  success: boolean
  total_results: number
}

export type APIResponse = {
  meta: APIResponseMeta,
  data: Topic[]
}