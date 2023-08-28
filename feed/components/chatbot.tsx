import { useRef, useState, useCallback, KeyboardEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function ChatBot({ onSubmit, chatMessages }: { onSubmit: any, chatMessages: any }) {
  const textareaRef = useRef(null)
  const [activeBtn, setActiveBtn] = useState(false)

  const onKeyDown: KeyboardEventHandler = useCallback((e) => {
    // @ts-ignore
    const textLength = textareaRef?.current?.value.length

    if (textLength > 0) {
      setActiveBtn(true)
    } else {
      setActiveBtn(false)
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (textLength > 0) {
        // @ts-ignore
        onBtnSubmit()
      }
    }
  }, [])

  const onBtnSubmit = useCallback(() => {
    // @ts-ignore
    const textLength = textareaRef?.current?.value.length

    if (textLength > 0) {
      // @ts-ignore
      onSubmit(textareaRef?.current?.value)
      // @ts-ignore
      textareaRef.current.value = ''
      setActiveBtn(false)
    }
  }, [])

  return (
    <div className="flex flex-col w-full items-center mt-2">
      {chatMessages.map((chat: any, index: number) => (
        <div className={`flex items-start p-4 mt-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded-md items-start justify-between w-auto ${chat.user === 'me' ? 'ml-auto' : 'mr-auto'}`} key={index}>
          <span className={`${chat.user === 'me' ? `order-last ml-4` : `mr-4`} text-xl flex items-center text-gray-800 dark:text-gray-200`}>
            <i className={`fad ${chat.user === 'me' ? `fa-user-alt` : 'fa-robot'}`} />
          </span>
          <span className={`${chat.user === 'me' ? `ml-auto` : ''} text-sm flex justify-center items-center`}>
            {chat.message === '' &&
              <span className='flex space-x-2 justify-center items-center mt-2 pt-0.5'>
                <span className="bg-black dark:bg-gray-200 p-1 w-2 h-2 rounded-full animate-bounce animation-delay-1"></span>
                <span className="bg-black dark:bg-gray-200 p-1 w-2 h-2 rounded-full animate-bounce animation-delay-2"></span>
                <span className="bg-black dark:bg-gray-200 p-1 w-2 h-2 rounded-full animate-bounce animation-delay-3"></span>
              </span>
            }
            {chat.message !== '' &&
              <pre className="whitespace-pre-wrap">
                {chat.message}
              </pre>
            }
          </span>
        </div>
      ))}

      <div className="flex flex-col w-full p-4 flex-grow relative bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded-md mt-4">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={onKeyDown}
          minRows={1}
          rows={1}
          placeholder="Ask a question about this topic"
          className="w-auto resize-none bg-transparent focus-visible:outline-none dark:bg-transparent" />
        <button className="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40">
          <span onClick={onBtnSubmit} className={`${activeBtn ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-800'}`}>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16" fill="none"
              className="h-4 w-4 m-1 md:m-0">
              <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}