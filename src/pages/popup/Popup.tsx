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

import { QuizCard } from './components/QuizCard'
import { QuizGrid } from './components/QuizGrid'
import { useBadge } from './hooks/useBadge'
import { useContentQuiz } from './hooks/useContentQuiz'

/** Project dependencies */
import { Quiz } from '@/core/models/Quiz'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sliceQuizzesCreateQuiz } from '@/redux/sliceQuizzes'
import { filterQuiz } from '@/utils/quizzes'
import { EmptyBox } from '../common/EmptyBox'
import { Actionbar } from './components/Actionbar'

function Popup (): JSX.Element {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const quizzes = useAppSelector(store => store.quizzes)

  const setBadge = useBadge()
  const contentQuiz = useContentQuiz()
  const [quiz, setQuiz] = useState<Quiz>()
  const [filteredQuiz, setFilteredQuiz] = useState<Quiz>()

  const showQuizCard =
    filteredQuiz !== undefined && filteredQuiz.questions.length > 0

  const showQuizGrid = quizzes.length > 0

  /**
   * Set the quiz name
   * @param name Quiz name
   */
  function setQuizName (name: string): void {
    if (filteredQuiz !== undefined) {
      setFilteredQuiz({
        ...filteredQuiz,
        name,
        id: Md5.hashStr(name + filteredQuiz.category)
      })
    }
  }

  /**
   * Set the quiz category
   * @param category Quiz category
   */
  function setQuizCategory (category: string): void {
    if (filteredQuiz !== undefined) {
      setFilteredQuiz({
        ...filteredQuiz,
        category,
        id: Md5.hashStr(filteredQuiz.name + category)
      })
    }
  }

  function handleQuizSave (): void {
    if (filteredQuiz !== undefined) {
      dispatch(sliceQuizzesCreateQuiz(filteredQuiz))
    }
  }

  function handleQuizDismiss (): void {
    setFilteredQuiz(undefined)
  }

  useEffect(() => {
    if (contentQuiz !== undefined) {
      setQuiz(contentQuiz)
      setFilteredQuiz(filterQuiz(quizzes, contentQuiz))
    }
  }, [contentQuiz])

  useEffect(() => {
    if (quiz !== undefined) {
      console.log('setting quiz')
      const filteredQuiz = filterQuiz(quizzes, quiz)

      setFilteredQuiz(filteredQuiz)
      setBadge(filteredQuiz.questions.length)
    }
  }, [quiz, quizzes])

  return (
    <Stack minWidth={700} minHeight={150} spacing={1}>
      <Actionbar onLoadQuiz={setQuiz} />
      {showQuizCard && (
        <QuizCard
          quiz={filteredQuiz}
          onNameChange={setQuizName}
          onCategoryChange={setQuizCategory}
          onSave={handleQuizSave}
          onDismiss={handleQuizDismiss}
        />
      )}
      {showQuizGrid
        ? <QuizGrid quizzes={quizzes} />
        : <EmptyBox>{t('empty-quizzes')}</EmptyBox>}
    </Stack>
  )
}

render(<Popup />)
