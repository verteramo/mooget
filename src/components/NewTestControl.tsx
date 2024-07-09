import Download from '@mui/icons-material/Download'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { useTranslation } from 'react-i18next'

import { ITest } from '@/dom'

interface IProps {
  test: ITest
  handleChange: (name: string) => void
  handleClick: () => void
}

export function NewTestControl ({ test, handleChange, handleClick }: IProps): JSX.Element {
  const { t } = useTranslation()
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(event.target.value)
  }

  const handleOnClick = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    handleClick()
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '82%' }}>
        <CardContent>
          <TextField
            fullWidth
            size='small'
            label={t('test')}
            value={test.name}
            error={test.name.length === 0}
            onChange={handleOnChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>{test.category}</InputAdornment>
              )
            }}
          />
        </CardContent>
        <CardActions>
          <Button startIcon={<Download />} onClick={handleOnClick}>
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
