/*******************************************************************************
 * Actionbar.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies

import { IconButton, Paper, Stack } from '@mui/material'

import {
  ContentPasteOffRounded,
  ContentPasteRounded,
  UploadFileRounded,
  ViewSidebarRounded,
  VisibilityOffRounded,
  VisibilityRounded
} from '@mui/icons-material'

// Project dependencies
import { InputFile } from '@/components/common/InputFile'
import { Quiz } from '@/models'
import { useConfigStore } from '@/stores'
import { openSidePanel } from '@/utils/native'
import { readQuiz } from '@/utils/quizzes'
import { useTranslation } from 'react-i18next'

interface Props {
  onReadQuiz: (quiz: Quiz) => void
}

export function Actionbar ({ onReadQuiz }: Props): JSX.Element {
  const { t } = useTranslation()

  const [visibility, clipboard, toggleVisibility, toggleClipboard] = useConfigStore((state) => [
    state.visibility,
    state.clipboard,
    state.toggleVisibility,
    state.toggleClipboard
  ])

  function handleFileChange ([file]: FileList): void {
    readQuiz(file).then((quiz) => {
      if (quiz !== undefined) {
        onReadQuiz(quiz)
      }
    }).catch(console.error)
  }

  function handleSidePanelClick (): void {
    openSidePanel().catch(console.error)
  }

  return (
    <Paper component={Stack} direction='row' spacing={1} p={1}>
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
