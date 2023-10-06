import config from '@/config';
import { transformStory, filterStory } from '@/transformers/story';

// Topic, story item
export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: any
  added_at: number
  updated_at: number
  articles: number,
  short_description: string
  short_title: string
  social: any,
  sentimentAgg: any
  meta: any
}

export function getApiUrl(endpoint = 'top', limit: number = 0, bucket: any = null, page: number = 1) {
  let url = `${config.api.url}/topics/${endpoint}`;
  let separator = '?';

  if (bucket) {
    url += `${separator}bucket=${bucket}`
    separator = '&';
  }
  if (limit) {
    url += `${separator}limit=${limit}`
    separator = '&';
  }
  if (page > 1) {
    url += `${separator}page=${page}`
  }

  return url;
}

export async function getFeed(endpoint = 'top', limit: number = 0, bucket: any = null, page: number = 1) {
  try {
    const url = getApiUrl(endpoint, limit, bucket, page);
    const res = await fetch(url, { next: { revalidate: 1 } })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch feed data', error)
    return [];
  }
}

export async function getSearchFeed(keywords: string[], page: number = 1) {
  try {
    const url = getApiUrl('search', config.api.defaultLimit, null, page);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keywords }),
      next: { revalidate: 1 }
    })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch search feed data', error)
    return [];
  }
}

export async function getInterestsFeed(interests: string[], page: number = 1) {
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
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return {
      meta: data.meta,
      data: data.topics.filter(filterStory).map(transformStory)
    }
  } catch (error) {
    console.error('Failed to fetch search feed data', error)
    return [];
  }
}

export async function getTopic(slug: string) {
  try {
    const url = `${config.api.url}/topics/${slug}?group_limit=1&keyword_limit=30`
    const res = await fetch(url, { next: { revalidate: 60 } })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topic)
      throw new Error('Topic not found');

    return transformStory(data.topic)
  } catch (error) {
    console.error('Failed to fetch topic data', error)
    return {};
  }
}

export async function refreshTopicMeta(slug: string) {
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
        'requeue_social': true,
        'requeue_media': true
      }),
    })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topic)
      throw new Error('Topic not found');

    return transformStory(data.topic)
  } catch (error) {
    console.error('Failed to fetch topic data', error)
    return {};
  }
}

export async function getTopKeywords(bucket: string = 'day') {
  try {
    const url = `${config.api.url}/keywords/top?bucket=${bucket}&limit=30`;
    const res = await fetch(url, { next: { revalidate: 60 } })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.keywords || !data.meta.success)
      throw new Error('Keywords not found');

    return data.keywords
  } catch (error) {
    console.error('Failed to fetch top keywords', error)
    return [];
  }
}