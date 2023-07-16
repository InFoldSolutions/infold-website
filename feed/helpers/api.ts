
const API_URL = 'https://api.infold.ai';

export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: any
  added_at: number
  articles: number
}

export function getApiUrl(endpoint = 'rising', bucket: any = null, limit = 20) {
  let url = `${API_URL}/topics/${endpoint}`;

  if (bucket)
    url += `?bucket=${bucket}&limit=${limit}`
  else
    url += `?limit=${limit}`

  return url;
}

export async function getFeed(endpoint = 'rising', bucket: any = null, limit = 20) {
  console.log('Fetching feed data...')

  try {
    const url = getApiUrl(endpoint, bucket, limit);
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Failed to fetch data');

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data', error)
    return { topics: [] };
  }
}