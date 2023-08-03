
import config from '@/config';
import { filterKeyword } from '@/transformers/keyword';

export function transformTopic(data: any) {
  if (data.sources) {
    //data.sources = data.sources.concat(config.mockTweets)

    data.sources.sort((a: any, b: any) => {
      const bDate = b.articles ? b.articles[0].added_at : b.added_at
      const aDate = a.articles ? a.articles[0].added_at : a.added_at
      
      return new Date(bDate).getTime() - new Date(aDate).getTime()
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