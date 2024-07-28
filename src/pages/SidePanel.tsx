import { Quiz } from '@/components/sidepanel/Quiz'
import { render } from '@/pages/render'
import { IStore } from '@/core/models/IStore'
import { shuffle } from '@/core/utils/shuffle'
import { useSelector } from 'react-redux'

function SidePanel (): JSX.Element {
  const progress = useSelector((store: IStore) => store.progress)
  const quizzes = useSelector((store: IStore) => store.quizzes)
  const quiz = quizzes.find(({ id }) => id === progress.quiz?.id)

  console.log('progress:', progress)
  console.log('quizzes:', quizzes)
  console.log('quiz:', quiz)

  return (
    <>
      {quiz !== undefined && (
        <Quiz quiz={{ ...quiz, questions: shuffle(quiz.questions) }} />
      )}
    </>
  )
}

render(<SidePanel />)
