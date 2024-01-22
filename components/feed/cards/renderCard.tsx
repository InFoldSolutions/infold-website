
import RedditPreview from '@/components/feed/cards/redditpost'
import TopicPost from '@/components/feed/cards/topic'

export default function RenderCard({ item, type }: { item: any, type: string }) {
  switch (type) {
    case 'subreddit':
      return (
        <RedditPreview post={item} />
      )
    default:
      return (
        <TopicPost topic={item} />
      )
  }
}