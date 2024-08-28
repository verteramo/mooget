/*******************************************************************************
 * QuizCard.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { SaveOutlined } from '@mui/icons-material'
import { common } from '@mui/material/colors'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material'

// Package dependencies
import { Quiz } from '@/models'
import { useTranslation } from 'react-i18next'

const DefaultIcon = 'img/undefined.png'

interface Props {
  quiz: Quiz
  onNameChange: (name: string) => void
  onCategoryChange: (category: string) => void
  onSave: (quiz: Quiz) => void
}

export function QuizCard ({
  quiz,
  onNameChange,
  onCategoryChange,
  onSave
}: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card>
      <Stack direction='row'>
        <Stack direction='column' flexGrow={1}>
          <CardContent>
            <Stack spacing={1} direction='row' alignItems='center'>
              <TextField
                fullWidth
                label={t('category')}
                value={quiz.category}
                error={quiz.category.length === 0}
                onChange={({ target: { value } }) => onCategoryChange(value)}
              />
              <TextField
                fullWidth
                label={t('quiz')}
                value={quiz.name}
                error={quiz.name.length === 0}
                onChange={({ target: { value } }) => onNameChange(value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {length}
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ marginX: 1 }}>
            <Button
              startIcon={<SaveOutlined />}
              onClick={() => onSave(quiz)}
            >
              {t('save')}
            </Button>
          </CardActions>
        </Stack>
        <CardMedia
          component='img'
          alt={quiz.owner}
          title={quiz.owner}
          image={quiz.icon ?? DefaultIcon}
          sx={{ width: 128, objectFit: 'contain', backgroundColor: common.white }}
        />
      </Stack>
    </Card>
  )
}
