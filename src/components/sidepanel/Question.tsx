import { IQuestion } from '@/dom'

interface IProps {
  question: IQuestion
}

export function Question ({ question }: IProps): JSX.Element {
  // const { type, content } = question

  // switch (type) {
  //   case QuestionType.Description:
  //     return <Raw content={content} />

  //   case QuestionType.Multichoice:
  //     return <Multichoice question={question} />

  //   case QuestionType.Multianswer:
  //     return <Multianswer question={question} />
  // }

  return <></>
}
