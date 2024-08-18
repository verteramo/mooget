import { Quiz } from '@/core/models'
import { useConfigStore } from '@/core/stores'
import { loadQuiz, openSidePanel } from '@/core/utilities/quizzes'
import { InputFile } from '@/pages/common/InputFile'
import { ContentPasteOffRounded, ContentPasteRounded, UploadFileRounded, ViewSidebarRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { IconButton, Paper, Stack } from '@mui/material'
import { t } from 'i18next'

interface Props {
  onLoadQuiz: (quiz: Quiz) => void
}

export function Actionbar ({ onLoadQuiz }: Props): JSX.Element {
  const visibility = useConfigStore((state) => state.visibility)
  const clipboard = useConfigStore((state) => state.clipboard)
  const toggleVisibility = useConfigStore((state) => state.toggleVisibility)
  const toggleClipboard = useConfigStore((state) => state.toggleClipboard)

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
        onClick={toggleVisibility}
        title={t('reveal-answers')}
      >
        {visibility ? <VisibilityRounded /> : <VisibilityOffRounded />}
      </IconButton>

      <IconButton
        color='inherit'
        onClick={toggleClipboard}
        title={t('enable-clipboard')}
      >
        {clipboard ? <ContentPasteRounded /> : <ContentPasteOffRounded />}
      </IconButton>
    </Paper>
  )
}
