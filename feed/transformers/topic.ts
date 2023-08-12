import config from '@/config';

import { getRandomInt } from '@/helpers/utils';
import { filterKeyword } from '@/transformers/keyword';

const sentimentName: string[] = ['positive', 'negative', 'neutral']
const sentiment: any = config.sentiment

export function transformTopic(data: any) {
  if (data.sources) {
    data.social = config.mockTweets
    data.sources = data.sources.map((source: any) => {
      if (source.articles) {
        source.articles = source.articles.map((article: any) => {
          const rand = getRandomInt(0, 3)
          const name = sentimentName[rand]

          article.sentiment = sentimentName[sentiment]

          article.sentimentBg = sentiment[name].bg
          article.sentimentIcon = sentiment[name].icon
          article.sentimentName = name
          return article
        })
      }
      return source
    })
  }
  return {
    ...data,
    keywords: data.keywords?.data?.filter(filterKeyword),
  }
}

export function filterTopic(data: any) {
  if (data.title.includes('CBS News Mornings'))
    return false

  return true
}