/*******************************************************************************
 * useContentQuiz.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies

// Project dependencies
import { Quiz } from '@/models'
import { sendMessage } from '@/utils/messaging'

const getQuiz = async (): Promise<Quiz | undefined> => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  const quiz = await sendMessage('getQuiz', undefined, tab.id)

  return quiz
}

/**
 * Request quiz from the content script
 */
export const useContentQuiz = (): Quiz | undefined => {
  const [quiz, setQuiz] = useState<Quiz>()

  useEffect(() => {
    getQuiz().then(setQuiz).catch(console.error)
  }, [])

  return quiz
}
