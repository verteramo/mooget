/*******************************************************************************
 * Popup.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { Md5 } from 'ts-md5'

// Package dependencies
import { Actionbar } from './components/Actionbar'
import { QuizCard } from './components/QuizCard'
import { QuizGrid } from './components/QuizGrid'
import { useContentQuiz } from './hooks/useContentQuiz'

// Project dependencies
import { render } from '@/components/layout/render'
import { useQuizCollectionStore } from '@/stores'
import { filterQuiz } from '@/utils/quizzes'
import { useQuiz } from './hooks/useQuiz'

export function Popup (): JSX.Element {
  const items = useQuizCollectionStore((state) => state.items)
  const addQuiz = useQuizCollectionStore((state) => state.addQuiz)

  const contentQuiz = useContentQuiz()
  const [quiz, setQuiz, setQuizName, setQuizCategory] = useQuiz(
    (str: string) => Md5.hashStr(str)
  )

  const showQuizCard =
    quiz !== undefined &&
    filterQuiz(items, quiz).questions.length > 0

  useEffect(() => {
    if (contentQuiz !== undefined) {
      setQuiz(filterQuiz(items, contentQuiz))
    }
  }, [contentQuiz, items])

  return (
    <Stack minWidth={750} minHeight={400} spacing={1}>
      <Actionbar onReadQuiz={setQuiz} />
      {showQuizCard && (
        <QuizCard
          quiz={quiz}
          onNameChange={setQuizName}
          onCategoryChange={setQuizCategory}
          onSave={addQuiz}
        />
      )}
      <QuizGrid />
    </Stack>
  )
}

render(<Popup />)
