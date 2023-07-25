
const API_URL = 'https://api.infold.ai';

export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: any
  added_at: number
  articles: number
}

export function getApiUrl(endpoint = 'rising', limit: number = 0, bucket: any = null, page: number = 1) {
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

export async function getFeed(endpoint = 'rising', limit: number = 0, bucket: any = null, page: number = 1) {
  try {
    const url = getApiUrl(endpoint, limit, bucket, page);
    const res = await fetch(url, { next: { revalidate: 5 } })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return data.topics
  } catch (error) {
    console.error('Failed to fetch feed data', error)
    return { topics: [] };
  }
}

export async function getSearchFeed(keywords: string[], page: number = 1) {
  try {
    const url = getApiUrl('search', 20, null, page);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keywords }),
    })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topics)
      throw new Error('Topics not found');

    return data.topics
  } catch (error) {
    console.error('Failed to fetch search feed data', error)
    return { topics: [] };
  }
}

export async function getTopic(slug: string) {
  try {
    const url = getApiUrl(slug, 0);
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()

    if (!data.topic)
      throw new Error('Topic not found');

    return data.topic
  } catch (error) {
    console.error('Failed to fetch topic data', error)
    return { topics: [] };
  }
}