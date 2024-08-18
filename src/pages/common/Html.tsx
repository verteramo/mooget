/*******************************************************************************
 * Html.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

interface Props {
  content: string
}

export function Html ({ content }: Props): JSX.Element {
  return <>{parse(DOMPurify.sanitize(content))}</>
}
