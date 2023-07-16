
const API_URL = 'https://api.infold.ai';

export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: any
  added_at: number
  articles: number
}

export function getApiUrl(endpoint = 'rising', limit = 20, bucket: any = null) {
  let url = `${API_URL}/topics/${endpoint}`;
  let separator = '?';

  if (bucket) {
    url += `${separator}bucket=${bucket}`
    separator = '&';
  } if (limit)
    url += `${separator}limit=${limit}`

  return url;
}

export async function getFeed(endpoint = 'rising', limit = 20, bucket: any = null) {
  console.log('Fetching feed data...')

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

export async function getTopic(slug: string) {
  console.log('Fetching topic data...')

  try {
    const url = getApiUrl(slug, 0);
    console.time('fetch topic')
    const res = await fetch(url)
    console.timeEnd('fetch topic')

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