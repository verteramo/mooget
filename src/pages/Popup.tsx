import { InputField, NewTestCard, TestsGrid, useQuiz } from '@/components'
import { render } from '@/pages/render'
import { createQuiz } from '@/redux/slice.quizzes'
import { IStore } from '@/redux/store'
import { filterQuestions } from '@/scripts/utilities'
import { UploadFile } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

function Popup (): JSX.Element {
  const [quiz, setCategory, setName] = useQuiz()
  const tests = useSelector((store: IStore) => store.quizzes)
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

  function handleUploadChange (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    console.log(event.target.files)
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
      {quiz !== undefined && filterQuestions(quiz, tests).length > 0 && (
        <NewTestCard
          test={quiz}
          handleCategoryChange={setCategory}
          handleNameChange={setName}
          handleDownloadClick={handleDownloadClick}
        />
      )}
      <TestsGrid tests={tests} />
    </Stack>
  )
}

render(<Popup />)
