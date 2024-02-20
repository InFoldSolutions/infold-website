export type DigestData = {
  email: string,
  interests: string[]
}

export type DigestAction = {
  type: 'add' | 'load',
  data?: DigestData | null,
  id?: string
  init?: boolean
}