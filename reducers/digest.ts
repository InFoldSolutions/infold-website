import { setLocalStorage, getLocalStorage } from '@/apis/localstorage'

import { DigestData, DigestAction } from '@/types/digest'

export const initialDigest: DigestData = {
  email: '',
  interests: []
}

export function digestReducer(data: DigestData, action: DigestAction): DigestData {
  switch (action.type) {
    case 'load':
      const localDigest: DigestData = getLocalStorage('digest')

      return localDigest || initialDigest
    case 'add':
      setLocalStorage('digest', action.data)

      return action.data || initialDigest
    default:
      throw Error('Unknown action: ' + action.type)
  }
}