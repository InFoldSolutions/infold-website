import TextareaAutosize from 'react-textarea-autosize';

// add chat bubbles above the text area
const chatMessages = [{
  user: 'me',
  message: 'Hello, I have a question about this topic'
}, {
  user: 'bot',
  message: 'Designing a chatbot involves several steps to ensure that it effectively meets its intended purpose and provides a positive user experience. Heres a step-by-step guide to help you design a chatbot Define Purpose and Goals: Determine the main purpose of the chatbot (e.g., customer support, information retrieval, entertainment). Set clear goals for the chatbot, such as reducing response times, improving user engagement, or increasing sales. Identify Target Audience:Understand the demographics and preferences of the users who will interact with the chatbot.Tailor the chatbots language and responses to match the target audiences expectations.Choose a Platform:Decide where your chatbot will be deployed: website, messaging apps, social media, etc.Select a platform that aligns with your target audiences preferred communication channels.'
}]

export default function ChatBot({ onFocus }: { onFocus: any }) {
  return (
    <div className="flex flex-col w-full items-center mt-2">
      {chatMessages.map((chat, index) => (
        <div className="flex items-center w-full p-4 mt-4 bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded-md" key={index}>
          <span className='mr-3 text-xl self-stretch p-1 w-8'>
            {chat.user === 'me' ? (
              <i className="fad fa-user-alt" />
            ) : (
              <i className="fad fa-robot -ml-0.5" />
            )}
          </span>
          <span className="text-sm">
            {chat.message}
          </span>
        </div>
      ))}

      <div className="flex flex-col w-full p-4 flex-grow relative bg-gray-200 dark:bg-gray-800 dark:bg-opacity-60 rounded-md mt-4">
        <TextareaAutosize minRows={1} placeholder="Ask a question about this topic" className="w-auto resize-none bg-transparent focus-visible:outline-none dark:bg-transparent" onFocus={onFocus} />
        <button className="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16" fill="none"
              className="h-4 w-4 m-1 md:m-0 text-gray-400">
              <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}