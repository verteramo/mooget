import { InputField, QuizCard, QuizGrid, useBadge, useContentQuiz } from '@/components'
import { IQuiz } from '@/dom'
import { render } from '@/pages/render'
import { createQuiz } from '@/redux/slice.quizzes'
import { IStore } from '@/redux/store'
import { filterQuiz, loadQuiz } from '@/scripts/utilities'
import { UploadFile } from '@mui/icons-material'
import { Box, Button, Stack } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Md5 } from 'ts-md5'

function Popup (): JSX.Element {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const quizzes = useSelector((store: IStore) => store.quizzes)

  const setBadge = useBadge()
  const contentQuiz = useContentQuiz()
  const [quiz, setQuiz] = useState<IQuiz>()
  const [filteredQuiz, setFilteredQuiz] = useState<IQuiz>()

  const showQuizCard =
    filteredQuiz !== undefined &&
    filteredQuiz.questions.length > 0

  const showQuizGrid =
    quizzes.length > 0

  const inputFileRef = useRef<HTMLInputElement>(null)

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
      dispatch(createQuiz(filteredQuiz))
    }
  }

  function handleQuizUpload (e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.item(0) ?? undefined

    if (file !== undefined) {
      loadQuiz(file).then((loadedQuiz) => {
        setQuiz(loadedQuiz)
      }).catch((error) => {
        console.log('handleQuizUpload', error)
      })

      e.target.value = ''
    }
  }

  useEffect(() => {
    if (contentQuiz !== undefined) {
      setQuiz(contentQuiz)
      setFilteredQuiz(filterQuiz(quizzes, contentQuiz))
    }
  }, [contentQuiz])

  useEffect(() => {
    if (quiz !== undefined && contentQuiz !== undefined) {
      const filteredQuiz = filterQuiz(quizzes, quiz)

      setFilteredQuiz(filteredQuiz)
      setBadge(filteredQuiz.questions.length)
    }
  }, [quiz, quizzes])

  return (
    <Stack minWidth={700} minHeight={150} spacing={1}>
      <Stack direction='row' spacing={2} justifyContent='end'>
        <InputField
          ref={inputFileRef}
          hidden
          type='file'
          accept='.json'
          onChange={handleQuizUpload}
        />
        <Button
          size='small'
          variant='contained'
          startIcon={<UploadFile />}
          onClick={() => inputFileRef.current?.click()}
        >
          {t('upload')}
        </Button>
      </Stack>
      {showQuizCard && (
        <QuizCard
          quiz={filteredQuiz}
          onNameChange={setQuizName}
          onCategoryChange={setQuizCategory}
          onSaveClick={handleQuizSave}
        />
      )}
      {showQuizGrid
        ? <QuizGrid quizzes={quizzes} />
        : (
          <Box sx={{
            p: 5,
            color: 'grey',
            border: '6px dashed lightgrey',
            borderRadius: '10px',
            textAlign: 'center'
          }}
          >
            {t('empty')}
          </Box>
          )}
    </Stack>
  )
}

render(<Popup />)
