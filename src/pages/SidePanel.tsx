import { Quiz } from '@/components/Quiz'
import { TestType } from '@/models'
import '@/redux/storage.listener'
import { IStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { render } from './render'

function SidePanel (): JSX.Element {
  const test = useSelector((store: IStore) => store.current)

  return (
    <>{test.type !== TestType.Unknown && <Quiz test={test} />}</>
  )
}

render(<SidePanel />)
