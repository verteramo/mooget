import { Quiz } from '@/components'
import { render } from '@/pages/render'
import { IStore } from '@/redux/store'
import { shuffle } from '@/scripts/utilities'
import { useSelector } from 'react-redux'

function SidePanel (): JSX.Element {
  const store = useSelector((store: IStore) => store)
  const currentTestId = store.config.currentTest
  const test = store.quizzes.find((test) => test.id === currentTestId)

  return (
    <>
      {test !== undefined && <Quiz test={{ ...test, questions: shuffle(test.questions) }} />}
    </>
  )
}

render(<SidePanel />)
