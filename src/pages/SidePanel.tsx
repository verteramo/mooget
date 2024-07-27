import { Quiz } from '@/components'
import { render } from '@/pages/render'
import { IStore } from '@/redux/store'
import { shuffle } from '@/scripts/utilities'
import { useSelector } from 'react-redux'

function SidePanel (): JSX.Element {
  const { progress, quizzes } = useSelector((store: IStore) => store)
  const quiz = quizzes.find(({ id }) => id === progress.quiz)

  return (
    <>
      {quiz !== undefined && (
        <Quiz quiz={{ ...quiz, questions: shuffle(quiz.questions) }} />
      )}
    </>
  )
}

render(<SidePanel />)
