import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { ITest } from '../core/Scraping'
import { Download } from 'react-bootstrap-icons'

interface TestControlProps {
  test: ITest
  onSave: (test: ITest) => void
  onChange: (name: string) => void
}

export function TestControl ({ test, onSave, onChange }: TestControlProps): JSX.Element {
  return (
    <InputGroup size='sm'>
      <FloatingLabel label={test.category}>
        <Form.Control
          type='text'
          value={test.id}
          placeholder={test.category}
          onChange={(e) => onChange(e.target.value)}
        />
      </FloatingLabel>
      <InputGroup.Text>{test.questions.length} questions</InputGroup.Text>
      <Button title='Save' onClick={() => onSave(test)}>
        <Download />
      </Button>
    </InputGroup>
  )
}
