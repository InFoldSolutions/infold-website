import { getRandomInt } from '@/helpers/utils';
import { filterKeyword } from '@/apis/transformers/keyword';

import config from '@/config';

import { Topic } from '@/types/topic';

export function transformStory(data: any): Topic {
  data.title = data.title.replace(/\"/g, '')

  if (data.sources?.length > 0) {

    data.sentimentAgg = {
      positive: 0,
      negative: 0,
      neutral: 0
    }

    data.sources.forEach((item: any) => {
      if (item.articles?.length > 0) {

        // This is mock data
        if (!item.articles[0].sentiment)
          item.articles[0].sentiment = ['negative', 'positive', 'neutral'][getRandomInt(0, 3)]

        let articleSentiment = item.articles[0].sentiment

        if (articleSentiment === 'slightly_positive') {
          item.articles[0].sentiment = 'positive'
          articleSentiment = 'positive'
        }

        if (articleSentiment === 'slightly_negative') {
          item.articles[0].sentiment = 'negative'
          articleSentiment = 'negative'
        }

        if (articleSentiment)
          data.sentimentAgg[articleSentiment]++

        // Sort articles by date
        item.articles.sort((a: any, b: any) => {
          return new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
        })

        // Filter out articles with social
        item.popularArticles = item.articles.filter((article: any) => article.social && article.social.length > 0)
      }
    })
  }

  let keywords: any = [], uniqueKeywords: any = []

  if (data.keywords?.data) {
    // exclude some obvious false positives
    keywords = data.keywords?.data?.filter(filterKeyword)

    // make sure keywords are unique
    uniqueKeywords = [...new Map(keywords.map((item: any) => [item['keyword'], item])).values()]

    // sort keywords by appearance in title and outline
    uniqueKeywords.sort((a: any) => {
      if (data.title.toLowerCase().includes(a.keyword.toLowerCase()) || data.outline.join('. ').toLowerCase().includes(a.keyword.toLowerCase()))
        return -1
      else if (a.type === 'person')
        return 0
      else
        return 1
    })
  }

  if (data.media?.length > 0) {
    data.media = data.media
      .filter((media: any) => {
        return media.channel && !config.media.blacklistChannels.includes(media.channel.name.toLowerCase())
      })
      .sort((a: any, b: any) => {
        return b.statistics.viewCount - a.statistics.viewCount
        //return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      })
      .filter((media: any, index: number, self: any) => {
        return self.findIndex((v: any) => v.title === media.title) === index;
      })
  }

  if (data.questions) {
    data.suggested = data.questions.filter((item: any) => !config.questionsBlacklist.includes(item.trim()))
    data.suggested = data.suggested.map((item: any) => item.replace(/\"/g, '').replace(/\?/g, '').replace(/\*/g, ''))
  }

  if (data.outline?.length > 0) {
    data.outline = data.outline.filter((item: any) => item !== '').map((item: any) => item.replace(/\"/g, '').replace(/\*/g, ''))
  }

  if (data.category)
    data.categoryIcon = config.categoryOptions.find(item => item.label === data.category)?.icon

  return {
    ...data,
    keywords: uniqueKeywords,
  }
}

export function filterStory(data: any): boolean {
  if (data.title.includes('CBS News Mornings'))
    return false

  return true
}

export function filterSources(sources: any, sort: string = '') {
  switch (sort) {
    case 'latest':
      sources = sources.filter((source: any) => !source.popularArticles || source.popularArticles.length === 0)
      break;
    case 'popular':
      sources = sources.filter((source: any) => source.popularArticles?.length > 0)
      break;
    default:
      break;
  }

  return sources.sort((a: any, b: any) => {
    return new Date(b.articles[0].added_at).getTime() - new Date(a.articles[0].added_at).getTime()
  })
}