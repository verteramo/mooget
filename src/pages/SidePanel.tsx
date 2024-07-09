import { Quiz } from '@/components/Quiz'
import { render } from '@/pages/render'
import { IStore } from '@/redux/store'
import { useSelector } from 'react-redux'

function SidePanel (): JSX.Element {
  const store = useSelector((store: IStore) => store)
  const test = store.tests.find((test) => test.id === store.config.currentTest)

  return (
    <>
      {test !== undefined && <Quiz test={test} />}
    </>
  )
}

render(<SidePanel />)
