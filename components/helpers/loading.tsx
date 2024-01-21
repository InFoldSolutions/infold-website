
import Spinner from '@/components/helpers/spinner'

export default function Loading() {
  return (
    <div className='w-full justify-center my-auto flex items-center'>
      <Spinner />Loading ...
    </div>
  )
}