import { Source } from "@/types/source"
import { Keyword } from "@/types/keyword"
import { Sentiment } from "@/types/sentiment"

export type TopicMeta = {
  articles: number
  keywords: number
  social: number
  sources: number
  sentiment: Sentiment
}

export type Topic = {
  id: string
  slug: string
  meta: TopicMeta

  short_description: string
  short_title: string
  title: string
  outline: string[]

  sentimentAgg: any
  media: any

  category: string
  categoryIcon: string

  added_at: number
  updated_at: number

  keywords: Keyword[]
  sources: Source[]
}