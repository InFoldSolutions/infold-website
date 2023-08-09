import config from '@/config';

import { getRandomInt } from '@/helpers/utils';
import { filterKeyword } from '@/transformers/keyword';

const sentimentName: string[] = ['positive', 'negative', 'neutral']
const sentimentColor: string[] = ['bg-green-500', 'bg-red-500', 'bg-slate-400']

export function transformTopic(data: any) {
  if (data.sources) {
    data.social = config.mockTweets
    data.sources = data.sources.map((source: any) => {
      if (source.articles) {
        source.articles = source.articles.map((article: any) => {
          const sentiment = getRandomInt(0, 3)

          article.sentiment = sentimentName[sentiment]
          article.sentimentClass = sentimentColor[sentiment]
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