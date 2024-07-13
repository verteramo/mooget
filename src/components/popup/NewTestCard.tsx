/**
 * NewTestControl
 * Control to create a new test
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
  CardHeader,
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
  test: IQuiz
  handleCategoryChange: (category: string) => void
  handleNameChange: (name: string) => void
  handleDownloadClick: () => void
}

export function NewTestCard ({
  test,
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
          <Stack spacing={2} direction='row'>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label={t('category')}
              value={test.category}
              error={test.category?.length === 0}
              onChange={handleOnCategoryChange}
            />
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label={t('test')}
              value={test.name}
              error={test.name.length === 0}
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
        image={test.icon ?? '../assets/no-icon.png'}
      />
    </Card>
  )
}
