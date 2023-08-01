
import { filterKeyword } from '@/transformers/keyword';

export function transformTopic(data: any) {
  return {
    ...data,
    keywords: data.keywords.filter(filterKeyword),
  }
}

export function filterTopic(data: any) {
  if (data.title.includes('CBS News Mornings'))
    return false

  return true
}