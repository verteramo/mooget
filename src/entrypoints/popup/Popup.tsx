import { TopBar } from '@/components/TopBar'
import configStore from '@/stores/configStore'
import quizStore, { addQuiz, filterQuiz } from '@/stores/quizStore'
import { render } from '@/utils/render'
import { useSnapshot } from 'valtio'
import { QuizCard } from './components/QuizCard'
import { QuizTable } from './components/QuizTable'
import { useContentQuiz } from './hooks/useContentQuiz'

function Popup (): JSX.Element {
  const { mode } = useSnapshot(configStore)
  const { list } = useSnapshot(quizStore)
  const contentQuiz = useContentQuiz()

  const quiz = useMemo(() => {
    if (contentQuiz !== undefined) {
      return filterQuiz(contentQuiz)
    }
  }, [contentQuiz])

  const showQuizCard = (
    quiz !== undefined &&
    filterQuiz(quiz).questions.length > 0
  )

  const showQuizTable = (
    list.length > 0
  )

  return (
    <div className='w-[600px] h-[400px]'>
      <TopBar />
      <div className={`${mode} bg-background text-foreground h-full p-2`}>
        {showQuizCard && <QuizCard quiz={quiz} onSave={addQuiz} />}
        {showQuizTable && <QuizTable />}
      </div>
    </div>
  )
}

render(<Popup />)
