import { Button, Form, Table } from 'react-bootstrap'
import { Test } from '../core/Analyzer'
import { Floppy, XLg } from 'react-bootstrap-icons'
import { MessageModal } from './MessageModal'
import { useState } from 'react'

interface TestTableProps {
  list: Test[]
  onUpdate: (index: number, test: Test) => void
  onDelete: (index: number) => void
  onDownload: (index: number) => void
}

export function TestTable ({
  list,
  onUpdate,
  onDelete,
  onDownload
}: TestTableProps): JSX.Element {
  const [selected, setSelected] = useState<{
    index: number
    name: string
  }>()

  const [show, setShow] = useState(false)

  const onDeleting = (index: number): void => {
    setSelected({ index, name: list[index].name })
    setShow(true)
  }

  const onConfirm = (index: number): void => {
    onDelete(index)
    setShow(false)
  }

  return (
    <>
      <Table className='mt-2' striped bordered hover>
        <thead>
          <tr>
            <th className='col-9'>Test</th>
            <th className='col-1'>Questions</th>
            <th className='col-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((test, index) => (
            <tr key={index}>
              <td align='center' className='align-middle'>
                <Form.Control
                  size='sm'
                  type='text'
                  value={test.name}
                  onChange={e => onUpdate(index, { ...test, name: e.target.value })}
                />
              </td>
              <td align='center' className='align-middle'>
                {test.questions.length}
              </td>
              <td align='center' className='align-middle'>
                <Button
                  size='sm'
                  variant='info'
                  className='rounded-circle me-2'
                  title='Download'
                  onClick={() => onDownload(index)}
                >
                  <Floppy />
                </Button>
                <Button
                  size='sm'
                  variant='danger'
                  className='rounded-circle'
                  title='Delete'
                  onClick={() => onDeleting(index)}
                >
                  <XLg />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <MessageModal
        title='Confirm deletion'
        show={show}
        onCancel={() => setShow(false)}
        onAccept={() => onConfirm(selected?.index as number)}
      >
        Delete test '{selected?.name}'?
      </MessageModal>
    </>
  )
}
