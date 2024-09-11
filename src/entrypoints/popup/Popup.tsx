import { EmptyBox } from '@/components/EmptyBox'
import { Topbar } from '@/components/Topbar'
import { Quiz } from '@/models'
import { useConfigStore } from '@/stores/useConfigStore'
import { addQuiz, filterQuiz, useQuizStore } from '@/stores/useQuizStore'
import { render } from '@/utils/render'
import { Database } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { QuizCard } from './components/QuizCard'
import { QuizTable } from './components/QuizTable'
import Toolbar from './components/Toolbar'
import { useContentQuiz } from './hooks/useContentQuiz'

function Popup (): JSX.Element {
  const { t } = useTranslation()
  const mode = useConfigStore((state) => state.mode)
  const list = useQuizStore((state) => state.list)
  const contentQuiz = useContentQuiz()
  const [uploadedQuiz, setUploadedQuiz] = useState<Quiz>()

  const [quiz, setQuiz] = useState<Quiz>()

  const showQuizCard = (
    quiz !== undefined
  )

  const showQuizTable = (
    list.length > 0
  )

  useEffect(() => {
    if (contentQuiz !== undefined) {
      const filteredQuiz = filterQuiz(contentQuiz)

      if (filteredQuiz.questions.length > 0) {
        setQuiz(filteredQuiz)
      } else {
        setQuiz(undefined)
      }
    } else if (uploadedQuiz !== undefined) {
      const filteredQuiz = filterQuiz(uploadedQuiz)

      if (filteredQuiz.questions.length > 0) {
        setQuiz(filteredQuiz)
      } else {
        setQuiz(undefined)
      }
    } else {
      setQuiz(undefined)
    }
  }, [list, contentQuiz, uploadedQuiz])

  useEffect(() => {
    sendMessage('setBadgeValue', quiz?.questions.length ?? 0).catch(console.error)
  }, [quiz])

  return (
    <div className='w-[600px] h-[400px]'>
      <Topbar />
      <div className={`${mode} bg-background text-foreground h-full p-2`}>
        <Toolbar
          onUploadQuiz={setUploadedQuiz}
        />
        {showQuizCard && <QuizCard quiz={quiz} onSave={addQuiz} />}
        {showQuizTable
          ? <QuizTable />
          : <EmptyBox
            icon={<Database className='w-12 h-12 text-gray-400 mb-4' />}
            title={t('empty-database')}
            content={t('empty-quizzes-description')}
            />}
      </div>
    </div>
  )
}

render(<Popup />)
