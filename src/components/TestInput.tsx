import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { Test } from '../core/Analyzer'
import { Download } from 'react-bootstrap-icons'

interface TestInputProps {
  test: Test
  onSave: (test: Test) => void
  onChange: (test: Test) => void
}

export function TestInput ({ test, onSave, onChange }: TestInputProps): JSX.Element {
  return (
    <InputGroup size='sm'>
      <FormControl
        type='text'
        value={test.name}
        onChange={e => onChange({
          ...test,
          name: e.target.value
        })}
      />
      <InputGroup.Text>
        {test.questions.length} questions
      </InputGroup.Text>
      <Button title='Save' onClick={() => onSave(test)}>
        <Download />
      </Button>
    </InputGroup>
  )
}
