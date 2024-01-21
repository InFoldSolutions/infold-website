
import RedditPreview from '@/components/feed/redditpost'
import TopicPost from '@/components/feed/topic'

export default function RenderPost({ item, type }: { item: any, type: string }) {
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