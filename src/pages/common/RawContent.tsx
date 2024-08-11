import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

interface Props {
  content: string
}

export function RawContent ({ content }: Props): JSX.Element {
  return <>{parse(DOMPurify.sanitize(content))}</>
}
