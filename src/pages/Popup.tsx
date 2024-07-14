import { InputField, NewQuizCard, TestsGrid, useQuiz } from '@/components'
import { IQuiz } from '@/dom'
import { render } from '@/pages/render'
import { createQuiz } from '@/redux/slice.quizzes'
import { IStore } from '@/redux/store'
import { filterQuestions } from '@/scripts/utilities'
import { UploadFile } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

function Popup (): JSX.Element {
  const quizzes = useSelector((store: IStore) => store.quizzes)
  const [quiz, setCategory, setName] = useQuiz(quizzes)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const inputFileRef = useRef<HTMLInputElement>(null)

  function handleDownloadClick (): void {
    if (quiz !== undefined) {
      dispatch(createQuiz(quiz))
    }
  }

  function handleUploadClick (): void {
    inputFileRef.current?.click()
  }

  async function loadJSONFile (file: File): Promise<IQuiz> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          resolve(JSON.parse(e.target?.result as string))
        } catch (error) {
          reject(error)
        }
      }
      reader.readAsText(file)
    })
  }

  async function handleUploadedFiles (files: FileList): Promise<void> {
    console.log('handleUploadedFiles init', files)
    for (const file of files) {
      try {
        const quiz = await loadJSONFile(file)
        console.log('handleUploadedFiles reading', quiz)

        if (typeof quiz.questions !== 'undefined') {
          dispatch(createQuiz(quiz))
        }
      } catch (error) {
        console.error('Error handleUploadedFiles', error)
      }
    }
  }

  function handleUploadChange (e: ChangeEvent<HTMLInputElement>): void {
    handleUploadedFiles(e.target.files as FileList).catch((error) => {
      console.error('Error handleUploadChange', error)
    })

    e.target.value = '' 
  }

  return (
    <Stack minWidth={700} minHeight={300} spacing={1}>
      <Stack direction='row' spacing={2} justifyContent='end'>
        <InputField
          ref={inputFileRef}
          hidden
          multiple
          type='file'
          accept='.json'
          onChange={handleUploadChange}
        />
        <Button startIcon={<UploadFile />} onClick={handleUploadClick}>
          {t('upload')}
        </Button>
      </Stack>
      {quiz !== undefined && filterQuestions(quiz, quizzes).length > 0 && (
        <NewQuizCard
          quiz={quiz}
          handleCategoryChange={setCategory}
          handleNameChange={setName}
          handleDownloadClick={handleDownloadClick}
        />
      )}
      <TestsGrid tests={quizzes} />
    </Stack>
  )
}

render(<Popup />)
