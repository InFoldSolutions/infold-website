
import RedditPreview from '@/components/feed/cards/redditpost'
import TopicPost from '@/components/feed/cards/topic'

import { FeedMeta } from '@/types/feedmeta'

export default function RenderCard({ item, meta }: { item: any, meta: FeedMeta }) {
  switch (meta.type) {
    case 'subreddit':
      return (
        <RedditPreview post={item} meta={meta} />
      )
    default:
      return (
        <TopicPost topic={item} meta={meta} />
      )
  }
}