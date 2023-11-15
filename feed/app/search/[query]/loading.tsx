import Spinner from '@/components/helpers/spinner'
import Modal from '@/components/layout/modal'

export default function ModalLoading() {
  return (
    <Modal showClose={false} loadingState={true}>
      <div className='flex relative top-[50vh] -mt-6 h-12 items-center justify-center font-mono w-auto px-6 bg-gray-300 dark:bg-black border-2 border-black border-dashed dark:border-gray-400 dark:text-gray-400'>
        <Spinner />
        Loading results ..
      </div>
    </Modal>
  )
}