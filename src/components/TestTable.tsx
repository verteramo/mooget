import { FloatingLabel, FormControl, Table } from 'react-bootstrap'
import { ITest } from '../core/Scraping'
import { FileEarmarkCodeFill, FileEarmarkPdfFill, PenFill, TrashFill } from 'react-bootstrap-icons'
import { MessageModal } from './MessageModal'
import { useState } from 'react'

interface TestTableProps {
  list: ITest[]
  onUpdate: (index: number, test: ITest) => void
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
    id: string
  }>()

  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)

  const onDeleting = (index: number): void => {
    setSelected({ index, id: list[index].id })
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
            <th className='col-6'>Test</th>
            <th className='col-1'>Questions</th>
            <th className='col-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((test, index) => (
            <tr key={index}>
              <td className='align-middle'>
                {edit
                  ? (
                    <FloatingLabel label={test.category}>
                      <FormControl
                        type='text'
                        value={test.id}
                        onChange={(e) =>
                          onUpdate(index, { ...test, id: e.target.value })}
                      />
                    </FloatingLabel>
                    )
                  : (
                    <a href={test.link} target='_blank' rel='noreferrer'>
                      {test.id}
                    </a>
                    )}
              </td>
              <td align='center' className='align-middle'>
                {test.questions.length}
              </td>
              <td align='center' className='align-middle'>
                <PenFill
                  role='button'
                  className='me-2'
                  title='Edit'
                  onClick={() => setEdit(!edit)}
                />
                <TrashFill
                  role='button'
                  className='me-2'
                  title='Delete'
                  onClick={() => onDeleting(index)}
                />
                <FileEarmarkCodeFill
                  role='button'
                  className='me-2'
                  title='Download as JSON'
                  onClick={() => onDownload(index)}
                />
                <FileEarmarkPdfFill
                  role='button'
                  title='Download as PDF'
                  onClick={() => onDownload(index)}
                />
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
