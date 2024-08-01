/*******************************************************************************
 * QuizCard.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { Save } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  TextField
} from '@mui/material'

/** Project dependencies */
import { Quiz } from '@/core/models/Quiz'

const DefaultIcon = '../assets/no-icon.png'

interface IProps {
  quiz: Quiz
  onNameChange: (name: string) => void
  onCategoryChange: (category: string) => void
  onSaveClick: () => void
}

export function QuizCard ({
  quiz: {
    name,
    category,
    questions: { length },
    icon,
    owner: brand
  },
  onNameChange,
  onCategoryChange,
  onSaveClick
}: IProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card variant='outlined'>
      <Stack direction='row'>
        <Stack direction='column' flexGrow={1}>
          <CardContent>
            <Stack spacing={1} direction='row'>
              <TextField
                fullWidth
                size='small'
                label={t('category')}
                value={category}
                error={category.length === 0}
                onChange={({ target: { value } }) => onCategoryChange(value)}
              />
              <Badge color='primary' badgeContent={length}>
                <TextField
                  fullWidth
                  size='small'
                  label={t('quiz')}
                  value={name}
                  error={name.length === 0}
                  onChange={({ target: { value } }) => onNameChange(value)}
                />
              </Badge>
            </Stack>
          </CardContent>
          <CardActions sx={{ marginX: 1 }}>
            <Stack spacing={1} direction='row'>
              <Button
                size='small'
                variant='contained'
                startIcon={<Save />}
                onClick={onSaveClick}
              >
                {t('save')}
              </Button>
            </Stack>
          </CardActions>
        </Stack>
        <CardMedia
          component='img'
          alt={brand}
          title={brand}
          image={icon ?? DefaultIcon}
          sx={{ width: 128, objectFit: 'contain', backgroundColor: 'white' }}
        />
      </Stack>
    </Card>
  )
}
