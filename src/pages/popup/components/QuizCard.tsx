/*******************************************************************************
 * QuizCard.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { PlaylistRemoveRounded, SaveOutlined } from '@mui/icons-material'
import { common } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

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

/** Project dependencies */
import { Quiz } from '@/core/models/Quiz'

const DefaultIcon = '../assets/undefined.png'

interface Props {
  quiz: Quiz
  onNameChange: (name: string) => void
  onCategoryChange: (category: string) => void
  onSave: () => void
  onDismiss: () => void
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
  onSave,
  onDismiss
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
                value={category}
                error={category.length === 0}
                onChange={({ target: { value } }) => onCategoryChange(value)}
              />
              <TextField
                fullWidth
                label={t('quiz')}
                value={name}
                error={name.length === 0}
                onChange={({ target: { value } }) => onNameChange(value)}
                InputProps={{ endAdornment: <InputAdornment position='end'>{length}</InputAdornment> }}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ marginX: 1 }}>
            <Button startIcon={<SaveOutlined />} onClick={onSave}>{t('save')}</Button>
            <Button startIcon={<PlaylistRemoveRounded />} onClick={onDismiss}>{t('dismiss')}</Button>
          </CardActions>
        </Stack>
        <CardMedia
          component='img'
          alt={brand}
          title={brand}
          image={icon ?? DefaultIcon}
          sx={{ width: 128, objectFit: 'contain', backgroundColor: common.white }}
        />
      </Stack>
    </Card>
  )
}
