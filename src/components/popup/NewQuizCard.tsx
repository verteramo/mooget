/**
 * NewQuizControl
 * Control to create a new quiz
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 */

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  TextField
} from '@mui/material'

import {
  Download
} from '@mui/icons-material'

import { useTranslation } from 'react-i18next'

import { IQuiz } from '@/dom'

interface IProps {
  quiz: IQuiz
  handleCategoryChange: (category: string) => void
  handleNameChange: (name: string) => void
  handleDownloadClick: () => void
}

const NO_ICON = '../assets/no-icon.png'

export function NewQuizCard ({
  quiz,
  handleCategoryChange,
  handleNameChange,
  handleDownloadClick
}: IProps): JSX.Element {
  const { t } = useTranslation()

  function handleOnCategoryChange (event: React.ChangeEvent<HTMLInputElement>): void {
    handleCategoryChange(event.target.value)
  }

  function handleOnNameChange (event: React.ChangeEvent<HTMLInputElement>): void {
    handleNameChange(event.target.value)
  }

  function handleOnDownloadClick (_event: React.MouseEvent<HTMLButtonElement>): void {
    handleDownloadClick()
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '82%' }}>
        <CardContent>
          <Stack spacing={1} direction='row'>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label={t('category')}
              value={quiz.category}
              error={quiz.category?.length === 0}
              onChange={handleOnCategoryChange}
            />
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label={t('quiz')}
              value={quiz.name}
              error={quiz.name.length === 0}
              onChange={handleOnNameChange}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button startIcon={<Download />} onClick={handleOnDownloadClick}>
            {t('download')}
          </Button>
        </CardActions>
      </Box>
      <CardMedia
        component='img'
        sx={{ width: 128, objectFit: 'contain', backgroundColor: 'white' }}
        image={quiz.icon ?? NO_ICON}
      />
    </Card>
  )
}
