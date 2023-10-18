'use client'

import Interests from '@/components/layout/interests'

import { saveInterests } from '@/helpers/localstorage'

import config from '@/config'

export default function About() {

  // selected interests changed
  /*useEffect(() => {
    if ((pathname && pathname !== '/'))
      return

    if (selectedInterests.length === 0 || feedData?.length > 0)
      return

    setIsLoading(true)

    const fetchInterestFeedData = async () => {
      let res: any = await getInterestsFeed(selectedInterests)

      if (res.data && res.meta?.total_results > 0) {
        setFeedData(res.data);
        setIsLoading(false);
      }
    }

    fetchInterestFeedData()
      .catch(console.error)
  }, [selectedInterests])*/

  return (
    <article className='pb-2 max-w-[80%] flex m-auto h-full'>
      <Interests interests={config.interests} saveInterests={saveInterests} />
    </article>
  )
}