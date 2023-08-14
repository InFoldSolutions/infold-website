
const API_URL = 'https://api.infold.ai';

import config from '@/config';
import { transformTopic, filterTopic } from '@/transformers/topic';

export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: any
  added_at: number
  articles: number
}

export function getApiUrl(endpoint = 'top', limit: number = 0, bucket: any = null, page: number = 1) {
  let url = `${API_URL}/topics/${endpoint}`;
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
    const res = await fetch(url, { next: { revalidate: 10 } })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return data.topics.filter(filterTopic).map(transformTopic)
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
      next: { revalidate: 10 }
    })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return data.topics.filter(filterTopic).map(transformTopic)
  } catch (error) {
    console.error('Failed to fetch search feed data', error)
    return [];
  }
}

export async function getTopic(slug: string) {
  try {
    const url = getApiUrl(slug, 0);
    const res = await fetch(url, { next: { revalidate: 60 } })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topic)
      throw new Error('Topic not found');

    return transformTopic(data.topic)
  } catch (error) {
    console.error('Failed to fetch topic data', error)
    return { };
  }
}

export async function getTopKeywords(bucket: string = 'day') {
  try {
    const url = `${API_URL}/keywords/top?bucket=${bucket}&limit=7`;
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