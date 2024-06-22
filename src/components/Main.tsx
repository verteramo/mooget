/**
 * Popup component
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { Card, Form } from 'react-bootstrap'
import { Github } from 'react-bootstrap-icons'
import { Test } from '@/models'
import { useStorageList, useTest, useTheme } from '@/hooks'
import { TestControl, TestTable } from '@/components'

/**
 * Main card of the popup
 * @returns Card component
 */
export function Main (): JSX.Element {
  const manifest = chrome.runtime.getManifest()
  const [theme, toggleTheme] = useTheme()
  const [test, setTestId] = useTest()
  const [testList, insertTest, updateTest, deleteTest] = useStorageList<Test>({
    variable: 'tests',
    area: chrome.storage.local
  })

  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        <Card.Title>{manifest.name}</Card.Title>
        <Form.Check
          type='switch'
          label='Dark'
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
      </Card.Header>
      <Card.Body>
        {test !== undefined && testList?.find((currentTest) => currentTest.id === test?.id) === undefined && (
          <TestControl
            test={test}
            onSave={test => insertTest(test, current => current.name === test.name, () => test)}
            onChange={setTestId}
          />
        )}
        {testList?.length > 0 && (
          <TestTable
            list={testList}
            onUpdate={updateTest}
            onDelete={deleteTest}
            onDownload={index => console.log(index)}
          />
        )}
      </Card.Body>
      <Card.Footer className='d-flex justify-content-between text-reset'>
        <div>Version: <span>{manifest.version}</span></div>
        <a
          title={manifest.name}
          href={manifest.homepage_url}
          target='_blank'
          rel='noreferrer'
          className='text-muted'
        >
          <Github />
        </a>
      </Card.Footer>
    </Card>
  )
}
