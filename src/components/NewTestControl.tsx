import { Test } from '@/models'
import { Download } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material'

interface IProps {
  test: Test
  handleChange: (name: string) => void
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function NewTestControl ({ test, handleChange, handleClick }: IProps): JSX.Element {
  return (
    <Card>
      <CardContent>
        <TextField
          required
          fullWidth
          value={test.name}
          helperText={test.category}
          error={test.name.length === 0}
          onChange={(e) => handleChange(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button startIcon={<Download />} onClick={handleClick}>
          Download
        </Button>
      </CardActions>
    </Card>
  )
}
