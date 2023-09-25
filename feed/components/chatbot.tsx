'use client'

import { useEffect, useMemo, useRef, useState, useCallback, KeyboardEventHandler, MouseEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { getWebsocket, closeWebsocket } from '@/websocket';

import { usePathname } from 'next/navigation'

import Tooltip from '@/components/tooltip';

import config from '@/config';
import TypeWriter from './typewriter';

export default function ChatBot() {
  const textareaRef = useRef(null)

  const pathname = usePathname()
  const topicName = pathname.split('/').pop()

  const isBrowser = typeof window !== "undefined";
  const socketURL = `${config.ws.chat}/${config.ws.path}/${topicName}`;

  const webSocket = useMemo(() => {
    if (!isBrowser) return null

    return getWebsocket(socketURL)
  }, []);

  const [chatMessages, setChatMessages] = useState<any>([])
  const [activeBtn, setActiveBtn] = useState(false)

  const onKeyDown: KeyboardEventHandler = useCallback((e) => {
    // @ts-ignore
    const textLength = textareaRef?.current?.value.length

    if (textLength > 0) 
      setActiveBtn(true)
    else
      setActiveBtn(false)

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (textLength > 0) {
        // @ts-ignore
        onBtnSubmit()
      }
    }
  }, [])

  const onBtnSubmit = useCallback(() => {
    if (!webSocket) return

    // @ts-ignore
    const text = textareaRef?.current?.value
    const textLength = text.length

    if (textLength > 0) {
      setChatMessages((messages: any) => [...messages, {
        user: 'me',
        message: text
      }, {
        user: 'bot',
        message: ''
      }])

      webSocket.send(text)

      // @ts-ignore
      textareaRef.current.value = ''
      setActiveBtn(false)
    }
  }, [webSocket, textareaRef, setChatMessages])

  useEffect((): any => {
    if (!webSocket) return

    webSocket.onmessage = (event: any) => {
      setChatMessages((messages: any) => {
        messages[messages.length - 1].message = event.data
        return [...messages]
      })
    };
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
            {chat.user === 'me' && chat.message !== '' &&
              <pre className="whitespace-pre-wrap">{chat.message.trim()}</pre>
            }
            {chat.user === 'bot' && chat.message !== '' &&
              <TypeWriter text={chat.message} className="whitespace-pre-wrap" />
            }
          </span>
        </div>
      ))}

      <div className='flex items-stretch w-full items-center mt-4'>
        <div className="flex flex-grow p-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded-md items-center">
          <TextareaAutosize
            ref={textareaRef}
            onKeyDown={onKeyDown}
            minRows={1}
            rows={1}
            placeholder="Ask a question about this topic"
            className="w-full resize-none bg-transparent focus-visible:outline-none dark:bg-transparent" />
          <button className="p-1 rounded-md disabled:text-gray-400 disabled:opacity-40 ml-2 -mr-1">
            <span onClick={onBtnSubmit} className={`${activeBtn ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-800'}`}>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16" fill="none"
                className="h-4 w-4 m-1 md:m-0">
                <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path>
              </svg>
            </span>
          </button>
        </div>
        <Tooltip message={"Foldy is powered by Llama 2 and customized for each topic to provide you with the most relevant information possible"} top={20} right={6} minWidth={220} padding={2}>
          <div className='ml-2 rounded-md border-2 border-gray-200 dark:border-gray-800 dark:border-opacity-60 p-4 hidden md:flex items-center cursor-pointer select-none' onClick={onBtnSubmit}>
            <i className='fad fa-robot mr-3 -mt-1 text-xl' /> Ask Foldy
          </div>
        </Tooltip>
      </div>
    </div>
  )
}