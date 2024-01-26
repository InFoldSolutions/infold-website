import { SourceSocial } from "@/types/source"
import { Sentiment } from "@/types/sentiment"

export type ArticleSocialSource = {
  name: string
  domains: string[]
  logo: string | null
  social: SourceSocial
}

export type ArticleSocial = {
  body: string
  author: string
  score: number
  url: string
  sentiment: Sentiment | null
  added_at: string
  source: ArticleSocialSource
}

export type Article = {
  title: string
  summary: string
  url: string
  keywords: string[]
  sentiment: Sentiment | null
  added_at: string
  social: ArticleSocial[]
  related: string
}