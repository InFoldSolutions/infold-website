
const API_URL = 'https://api.infold.ai';

export type Item = {
  slug: string
  title: string
  outline: string[]
  keywords: string[]
  added_at: number
  articles: number
}

export async function getFeed(endpoint = 'rising', bucket: any = null, limit = 20) {
  console.log('Fetching feed data...')

  try {
    let url = `${API_URL}/topics/${endpoint}`;

    if (bucket)
      url += `?bucket=${bucket}&limit=${limit}`
    else
      url += `?limit=${limit}`

    const res = await fetch(url)

    if (!res.ok)
      throw new Error('Failed to fetch data');

    console.log(res)
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Failed to fetch data', error)
    return error;
  } finally {
    console.log('Done fetching feed data')
  }
}