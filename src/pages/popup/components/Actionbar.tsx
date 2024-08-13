import { Quiz } from '@/core/models/Quiz'
import { InputFile } from '@/pages/common/InputFile'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { sliceConfigSetClipboardEnabled, sliceConfigSetRevealAnswers } from '@/redux/sliceConfig'
import { loadQuiz, openSidePanel } from '@/utils/quizzes'
import { ContentPasteOffRounded, ContentPasteRounded, UploadFileRounded, ViewSidebarRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { IconButton, Paper, Stack } from '@mui/material'
import { t } from 'i18next'

interface Props {
  onLoadQuiz: (quiz: Quiz) => void
}

export function Actionbar ({ onLoadQuiz }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const visibility = useAppSelector(store => store.config.revealAnswers)
  const clipboard = useAppSelector(store => store.config.clipboardEnabled)

  function handleFileChange ([file]: FileList): void {
    loadQuiz(file).then((quiz) => {
      if (quiz !== undefined) {
        onLoadQuiz(quiz)
      }
    }).catch(console.error)
  }

  function handleSidePanelClick (): void {
    openSidePanel().catch(console.error)
  }

  function handleVisibilityClick (): void {
    dispatch(sliceConfigSetRevealAnswers(!visibility))
  }

  function handleClipboardClick (): void {
    dispatch(sliceConfigSetClipboardEnabled(!clipboard))
  }

  return (
    <Paper
      component={Stack}
      direction='row'
      flexGrow={1}
      spacing={1}
      p={1}
    >
      <InputFile onChange={handleFileChange} accept='.json'>
        <IconButton color='inherit' title={t('upload')}>
          <UploadFileRounded />
        </IconButton>
      </InputFile>

      <IconButton
        color='inherit'
        onClick={handleSidePanelClick}
        title={t('sidepanel')}
      >
        <ViewSidebarRounded />
      </IconButton>

      <IconButton
        color='inherit'
        onClick={handleVisibilityClick}
        title={t('reveal-answers')}
      >
        {visibility ? <VisibilityRounded /> : <VisibilityOffRounded />}
      </IconButton>

      <IconButton
        disabled
        color='inherit'
        onClick={handleClipboardClick}
        title={t('enable-clipboard')}
      >
        {clipboard ? <ContentPasteRounded /> : <ContentPasteOffRounded />}
      </IconButton>
    </Paper>
  )
}
