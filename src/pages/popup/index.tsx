/*******************************************************************************
 * Popup.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Md5 } from 'ts-md5'

/** Package dependencies */
import { render } from '../layout/render'

import { DashedBox } from '../common/DashedBox'
import { Actionbar } from './components/Actionbar'
import { QuizCard } from './components/QuizCard'
import { QuizGrid } from './components/QuizGrid'
import { useContentQuiz } from './hooks/useContentQuiz'

/** Project dependencies */
import { Quiz } from '@/core/models'
import { useQuizCollectionStore } from '@/core/stores'
import { filterQuiz } from '@/core/utilities/quizzes'

function Popup (): JSX.Element {
  const { t } = useTranslation()

  const items = useQuizCollectionStore((state) => state.items)
  const addQuiz = useQuizCollectionStore((state) => state.addQuiz)

  const contentQuiz = useContentQuiz()
  const [quiz, setQuiz] = useState<Quiz>()

  const showQuizCard =
    quiz !== undefined &&
    filterQuiz(items, quiz).questions.length > 0

  const showQuizGrid = items.length > 0

  /**
   * Set the quiz name
   * @param name Quiz name
   */
  function setQuizName (name: string): void {
    if (quiz !== undefined) {
      setQuiz({
        ...quiz,
        name,
        id: Md5.hashStr(name + quiz.category)
      })
    }
  }

  /**
   * Set the quiz category
   * @param category Quiz category
   */
  function setQuizCategory (category: string): void {
    if (quiz !== undefined) {
      setQuiz({
        ...quiz,
        category,
        id: Md5.hashStr(quiz.name + category)
      })
    }
  }

  function handleQuizSave (): void {
    if (quiz !== undefined) {
      addQuiz(quiz)
    }
  }

  useEffect(() => {
    if (contentQuiz !== undefined) {
      setQuiz(filterQuiz(items, contentQuiz))
    }
  }, [contentQuiz, items])

  return (
    <Stack minWidth={700} minHeight={150} spacing={1}>
      <Actionbar onLoadQuiz={setQuiz} />
      {showQuizCard && (
        <QuizCard
          quiz={quiz}
          onNameChange={setQuizName}
          onCategoryChange={setQuizCategory}
          onSave={handleQuizSave}
        />
      )}
      {showQuizGrid ? <QuizGrid /> : <DashedBox>{t('empty-quizzes')}</DashedBox>}
    </Stack>
  )
}

render(<Popup />)
