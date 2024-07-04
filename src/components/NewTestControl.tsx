import { Test } from '@/models'
import { Download } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, InputAdornment, TextField } from '@mui/material'

interface IProps {
  test: Test
  handleChange: (name: string) => void
  handleClick: () => void
}

export function NewTestControl ({ test, handleChange, handleClick }: IProps): JSX.Element {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(event.target.value)
  }

  const handleOnClick = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    handleClick()
  }

  return (
    <Card>
      <CardContent>
        <TextField
          fullWidth
          size='small'
          label='Test'
          value={test.name}
          error={test.name.length === 0}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: <InputAdornment position='end'>{test.category}</InputAdornment>
          }}
        />
        {test.icon.length > 0 &&
          <Box
            component='img'
            src={test.icon}
            alt={test.name}
            sx={{ width: 100, height: 100 }}
          />}
      </CardContent>
      <CardActions>
        <Button startIcon={<Download />} onClick={handleOnClick}>
          Download
        </Button>
      </CardActions>
    </Card>
  )
}
