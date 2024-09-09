import EmptyBox from '@/components/EmptyBox'
import { Topbar } from '@/components/Topbar'
import { useConfigStore } from '@/stores/useConfigStore'
import { addQuiz, filterQuiz, useQuizStore } from '@/stores/useQuizStore'
import { render } from '@/utils/render'
import { DatabaseIcon } from 'lucide-react'
import { QuizCard } from './components/QuizCard'
import { QuizTable } from './components/QuizTable'
import { useContentQuiz } from './hooks/useContentQuiz'

function Popup (): JSX.Element {
  const mode = useConfigStore((state) => state.mode)
  const list = useQuizStore((state) => state.list)
  const contentQuiz = useContentQuiz()

  const quiz = useMemo(() => {
    if (contentQuiz !== undefined) {
      const filteredQuiz = filterQuiz(contentQuiz)

      if (filteredQuiz.questions.length > 0) {
        return filteredQuiz
      }
    }
  }, [list, contentQuiz])

  const showQuizCard = (
    quiz !== undefined
  )

  const showQuizTable = (
    list.length > 0
  )

  useEffect(() => {
    sendMessage('setBadgeValue', quiz?.questions.length ?? 0).catch(console.error)
  }, [quiz])

  return (
    <div className='w-[600px] h-[400px]'>
      <Topbar />
      <div className={`${mode} bg-background text-foreground h-full p-2`}>
        {showQuizCard && <QuizCard quiz={quiz} onSave={addQuiz} />}
        {showQuizTable
          ? (
            <QuizTable />
            )
          : (
            <EmptyBox
              icon={<DatabaseIcon className='w-12 h-12 text-gray-400 mb-4' />}
              title='Base de datos vacía'
              content='No se encontraron cuestionarios en la base de datos.'
            />
            )}
      </div>
    </div>
  )
}

render(<Popup />)
