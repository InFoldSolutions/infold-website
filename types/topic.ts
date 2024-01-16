// Topic, story item
export type Topic = {
  slug: string
  articles: number
  meta: any

  short_description: string
  short_title: string
  title: string
  outline: string[]
  keywords: any
  
  social: any
  sentimentAgg: any
  media: any

  category: string
  categoryIcon: string

  added_at: number
  updated_at: number
}