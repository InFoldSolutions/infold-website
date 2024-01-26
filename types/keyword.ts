export type KeywordAnalyzed = {
  url?: string
  title?: string
  source: string
}

export type Keyword = {
  keyword: string
  type: string
  analyzed: KeywordAnalyzed[]
  added_at: string
}