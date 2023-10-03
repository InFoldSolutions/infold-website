import { getRandomInt } from '@/helpers/utils';
import { filterKeyword } from '@/transformers/keyword';

export function transformTopic(data: any) {
  data.title = data.title.replace(/\"/g, '')
  data.social = (data.social?.length > 0) ? data.social.map((social: any) => {
    switch (social.source.name) {
      case 'reddit.com':
        social.logo = '/assets/images/reddit.svg'
        social.author = `u/${social.author}`
        break
    }

    if (social.sentiment === 'slightly_positive')
      social.sentiment = 'positive'

    if (social.sentiment === 'slightly_negative')
      social.sentimentt = 'negative'

    return social
  }).sort((a: any, b: any) => b.score - a.score) : []

  if (data.sources?.length > 0) {
    data.sentimentAgg = data.sources.reduce((aggregator: any, item: any) => {
      if (item.articles?.length > 0) {
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
          aggregator[articleSentiment]++
      }

      return aggregator
    }, {
      positive: 0,
      negative: 0,
      neutral: 0
    })
  }

  /*data.politicsAgg = {
    left: 23,
    right: 77,
    center: 42
  }*/

  let keywords: any = [], uniqueKeywords: any = []

  if (data.keywords?.data) {
    keywords = data.keywords?.data?.filter(filterKeyword)
    uniqueKeywords = [...new Map(keywords.map((item: any) => [item['keyword'], item])).values()]
    uniqueKeywords.sort((a: any) => {
      if (data.title.toLowerCase().includes(a.keyword.toLowerCase()) || data.outline.join('. ').toLowerCase().includes(a.keyword.toLowerCase()))
        return -1 
      else if (a.type === 'person')
        return 0
      else
        return 1
    })
  }

  /*if (data.media?.length > 0) {
    data.media = data.media.sort((a: any, b: any) => {
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    })
  }*/

  return {
    ...data,
    keywords: uniqueKeywords,
  }
}

export function filterTopic(data: any) {
  if (data.title.includes('CBS News Mornings'))
    return false

  return true
}

export function filterData(sources: any, social: any, sort: string = '') {
  switch (sort) {
    case 'latest':
      sources = sources.filter((source: any) => !source.social || source.social.length === 0)
      break;
    case 'popular':
      sources = sources.filter((source: any) => source.social?.length > 0)
      break;
    default:
      break;
  }

  return {
    sources: sources.sort((a: any, b: any) => {
      return new Date(b.articles[0].added_at).getTime() - new Date(a.articles[0].added_at).getTime()
    }),
    social: social.sort((a: any, b: any) => {
      return b.score - a.score
    }),
    combined: sources.concat(social).sort((a: any, b: any) => {
      const aTime = a.added_at || a.articles[0].added_at
      const bTime = b.added_at || b.articles[0].added_at

      return new Date(bTime).getTime() - new Date(aTime).getTime()
    })
  }
}