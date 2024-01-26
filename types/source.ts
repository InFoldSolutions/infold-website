import { Article } from "@/types/article"

export type SourceSocial = {
  name: string
  handle: string
}

export type Source = {
  meta: {
    best_match: string
    newest_article: string
  }
  source: {
    name: string
    domains: string[]
    logo: string
    social: SourceSocial[]
  }
  articles: Article[]
  popularArticles: Article[]
}