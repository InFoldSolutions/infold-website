
const API_URL = 'https://api.infold.ai';

export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: any
  added_at: number
  articles: number
}

export function getApiUrl(endpoint = 'rising', limit: number = 0, bucket: any = null) {
  let url = `${API_URL}/topics/${endpoint}`;
  let separator = '?';

  if (bucket) {
    url += `${separator}bucket=${bucket}`
    separator = '&';
  } 
  if (limit)
    url += `${separator}limit=${limit}`

  return url;
}

export async function getFeed(endpoint = 'rising', limit: number = 0, bucket: any = null) {
  try {
    const url = getApiUrl(endpoint, limit, bucket);
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Failed to fetch feed data', error)
    return { topics: [] };
  }
}

export async function getSearchFeed(keywords: string[]) {
  try {
    const url = getApiUrl('search');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keywords, strict: true }),
    })

    if (!res.ok)
      throw new Error('Response not ok');

    const data = await res.json()
    return data
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