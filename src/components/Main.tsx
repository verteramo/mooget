/**
 * Popup component
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Card, Form } from 'react-bootstrap'
import { Github } from 'react-bootstrap-icons'
import { usePageContext } from '../hooks/usePageContext'
import { TestInput } from './TestInput'
import useDarkMode from '../hooks/useDarkMode'

/**
 * Main card of the popup
 * @returns Card component
 */
export function Main (): JSX.Element {
  const manifest = chrome.runtime.getManifest()
  const [dark, toggleDark] = useDarkMode()
  const [context] = usePageContext()

  return (
    <Card>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <Card.Title>{manifest.name}</Card.Title>
          <Form.Check
            type='switch'
            title='Dark'
            label='Dark'
            placeholder='Dark'
            checked={dark}
            onChange={toggleDark}
          />
        </div>
      </Card.Header>
      <Card.Body>
        {context?.test != null && (
          <TestInput
            test={context.test}
            onSave={console.log}
            onChange={console.log}
          />
        )}
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <a title={manifest.name} href={manifest.homepage_url} target='_blank' rel='noreferrer'>
          <Github />
        </a>
      </Card.Footer>
    </Card>
  )
}
