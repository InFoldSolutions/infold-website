
import { useEffect, useState } from 'react'

import useInterval from '@/helpers/useInterval'

export default function TypeWriter({ text, className }: { text: string, className?: string }) {
  
  const [words] = useState<string[]>(text.trim().split(' '))
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentText, setCurrentText] = useState<string[]>([])
  const [delay, setDelay] = useState<number | null>(80)

  useEffect(() => {
    if (currentIndex === words.length) {
      setDelay(null)
      return
    }

    const nextWord = words[currentIndex]

    if (nextWord)
      setCurrentText([...currentText, nextWord])
    else
      setDelay(null)
  }, [currentIndex])

  useInterval(() => {
    setCurrentIndex((currentIndex) => currentIndex + 1)
  }, delay)

  return (
    <pre className={className}>
      {currentText.join(' ')}
    </pre>
  )
}