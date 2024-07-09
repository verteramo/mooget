import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

interface IProps {
  content: string
}

export function Raw ({ content }: IProps): JSX.Element {
  const sanitizedContent = DOMPurify.sanitize(content)
  const parsedContent = parse(sanitizedContent)

  return (
    <>{parsedContent}</>
  )
}
