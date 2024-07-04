import { NewTestControl, TestsGrid } from '@/components'
import { useTest } from '@/hooks'
import { Test } from '@/models'
import '@/redux/storage.listener'
import { IStore } from '@/redux/store'
import { createTest } from '@/redux/test.slice'
import { Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { render } from './render'

function Popup (): JSX.Element {
  const [test, setName] = useTest()
  const dispatch = useDispatch()
  const tests = useSelector((store: IStore) => store.tests)

  function handleClick (): void {
    if (test !== undefined) {
      dispatch(createTest(test))
    }
  }

  function isNewTest (test: Test): boolean {
    return !tests.some(({ id }) => id === test.id)
  }

  return (
    <Stack minWidth={700} spacing={1}>
      {test !== undefined && isNewTest(test) &&
        <NewTestControl
          test={test}
          handleChange={setName}
          handleClick={handleClick}
        />}
      <TestsGrid tests={tests} />
    </Stack>
  )
}

render(<Popup />)
