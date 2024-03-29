
//
// InFold API docs
// https://api.infold.ai/docs
//

import { permanentRedirect } from 'next/navigation'

import { transformStory, filterStory } from '@/apis/transformers/story';
import { filterKeyword } from '@/apis/transformers/keyword';

import { searchParamsToQueryParams } from '@/helpers/utils';

import { APIResponse, ErrorAPIResponse } from '@/types/response';
import { Topic } from '@/types/topic';

import config from '@/config';


export async function getTopFeed(bucket: string = config.api.defaultBucket, page: number = 1): Promise<APIResponse> {
  try {
    const url = `${config.api.url}/topics/top?bucket=${bucket}&page=${page}`
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch keyword feed data', error)
    return ErrorAPIResponse
  }
}

export async function getSectionFeed(bucket: string = config.api.defaultBucket, category: string, page: number = 1): Promise<APIResponse> {
  try {
    const url = `${config.api.url}/topics/top?bucket=${bucket}&category=${category}&page=${page}`
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch keyword feed data', error)
    return ErrorAPIResponse
  }
}

export async function getKeywordFeed(keyword: string, page: number = 1): Promise<APIResponse> {
  try {
    const url = `${config.api.url}/topics/search/${keyword}?page=${page}`
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch keyword feed data', error)
    return ErrorAPIResponse
  }
}

export async function getFeaturedFeed(page: number = 1): Promise<APIResponse> {
  try {
    const url = `${config.api.url}/topics/featured?page=${page}`
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch featured feed data', error)
    return ErrorAPIResponse
  }
}

export async function getSearchFeed(query: string, page: number = 1): Promise<APIResponse> {
  try {
    const url = `${config.api.url}/topics/search?page=${page}`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
      next: { revalidate: 1 }
    })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch search feed data', error)
    return ErrorAPIResponse
  }
}

export async function getInterestsFeed(interests: string[], page: number = 1): Promise<APIResponse> {
  try {
    const url = `${config.api.url}/feed/personal?page=${page}`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keywords: {
          positive: interests,
        },
        bias: 300,
      }),
      next: { revalidate: 1 }
    })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch search feed data', error)
    return ErrorAPIResponse
  }
}

export async function getTopic(slug: string): Promise<Topic | null> {
  try {
    const url = `${config.api.url}/topics/${slug}?group_limit=1&keyword_limit=30`
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topic)
      throw new Error('Topic not found')

    return transformStory(data.topic)
  } catch (error) {
    console.error('Failed to fetch topic data', error)
    return null
  }
}

export function getTopicThumbUrl(slug: string): string {
  return `${config.api.url}/topics/${slug}/${config.story.thumb.name}`
}

export async function getTopicAffiliate(slug: string) {
  try {
    const url = `${config.api.url}/topics/${slug}/affiliate`
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (data.products?.length === 0)
      throw new Error('Affiliate not found')

    return data.products.reverse()
  } catch (error) {
    console.warn('Failed to fetch affiliate data', error)
    return {}
  }
}

export async function getTopicRelated(slug: string): Promise<Topic[]> {
  try {
    const url = `${config.api.url}/topics/${slug}/related`
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (data.topics?.length === 0)
      throw new Error('Related not found')

    return data.topics.filter(filterStory).map(transformStory)
  } catch (error) {
    console.warn('Failed to fetch related data', error)
    return []
  }
}

export async function refreshTopicMeta(slug: string): Promise<boolean> {
  try {
    const url = `${config.api.url}/topics/${slug}`
    const res = await fetch(url, {
      next: { revalidate: 1 },
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.api_key || '',
      },
      body: JSON.stringify({
        'topic': null,
        //'requeue_social': true,
        'requeue_media': true,
        "requeue_llm": true,
        "requeue_meta": true,
      }),
    })

    if (!res.ok)
      throw new Error('Response not ok')

    return true
  } catch (error) {
    console.error('Failed to fetch topic data', error)
    return false
  }
}

export async function getTopKeywords(bucket: string = config.api.defaultBucket) {
  try {
    const url = `${config.api.url}/keywords/top?bucket=${bucket}&limit=50`;
    const res = await fetch(url, { next: { revalidate: 600 } })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.keywords || !data.meta.success)
      throw new Error('Keywords not found')

    return data.keywords.filter(filterKeyword)
  } catch (error) {
    console.error('Failed to fetch top keywords', error)
    return []
  }
}

export async function submitEmail(email: string, interests: string[]): Promise<boolean> {
  try {
    const url = `${config.api.url}/signup/beta`
    const res = await fetch(url, {
      next: { revalidate: 1 },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        interests
      }),
    })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.meta.success)
      throw new Error('No success')

    return true
  } catch (error) {
    console.warn('Failed to submit email', error)
    return false
  }
}

export function handleRedirect(slug: string, searchParams: any) {
  let url = `/story/${slug}`

  if (Object.keys(searchParams).length > 0) url += `?${searchParamsToQueryParams(searchParams)}`

  return permanentRedirect(url)
}

export function getApiUrl(endpoint = 'top', limit: number = 0, bucket: any = null, page: number = 1): string {
  let url = `${config.api.url}/topics/${endpoint}`
  let separator = '?'

  if (bucket) {
    url += `${separator}bucket=${bucket}`
    separator = '&'
  }
  if (limit) {
    url += `${separator}limit=${limit}`
    separator = '&'
  }
  if (page > 1) {
    url += `${separator}page=${page}`
  }

  return url
}

export async function getFeed(endpoint = 'top', limit: number = 0, bucket: any = null, page: number = 1): Promise<APIResponse> {
  try {
    const url = getApiUrl(endpoint, limit, bucket, page)
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok)
      throw new Error('Response not ok')

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found')

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch feed data', error)
    return ErrorAPIResponse
  }
}

export async function loadMoreDataForPathname(pathname: string, offset: number = 0): Promise<APIResponse> {
  let res: APIResponse

  const pathnameParts = pathname.split('/')
  const endpoint = pathnameParts[1]
  const param = pathnameParts[2]

  if (endpoint === 'keyword')
    res = await getKeywordFeed(param, offset)
  else if (endpoint === 'search')
    res = await getSearchFeed(param, offset)
  else if (endpoint === 'section')
    res = await getSectionFeed(config.api.defaultBucket, param, offset)
  else
    res = await getTopFeed(config.api.defaultBucket, offset)

  return res
}

export async function loadDataForPathname(pathname: string): Promise<APIResponse> {
  let res: APIResponse

  const pathnameParts = pathname.split('/')
  const endpoint = pathnameParts[1]
  const param = pathnameParts[2]

  if (endpoint === 'keyword')
    res = await getKeywordFeed(param)
  else if (endpoint === 'search')
    res = await getSearchFeed(param)
  else if (endpoint === 'section')
    res = await getSectionFeed(config.api.defaultBucket, param)
  else
    res = await getTopFeed()

  return res
}