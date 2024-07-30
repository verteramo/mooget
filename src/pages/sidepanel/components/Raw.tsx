import DOMPurify from 'dompurify'
import parse from 'html-react-handlers'

export function Raw ({ content }: { content: string }): JSX.Element {
  return <>{parse(DOMPurify.sanitize(content))}</>
}
