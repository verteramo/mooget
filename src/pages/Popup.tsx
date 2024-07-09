import { NewTestControl, TestsGrid } from '@/components'
import { ITest } from '@/dom'
import { useTest } from '@/hooks'
import { render } from '@/pages/render'
import { createTest } from '@/redux/slice.tests'
import { IStore } from '@/redux/store'
import { Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

function Popup (): JSX.Element {
  const [test, setName] = useTest()
  const dispatch = useDispatch()
  const tests = useSelector((store: IStore) => store.tests)

  function handleClick (): void {
    if (test !== undefined) {
      dispatch(createTest(test))
    }
  }

  function isNewTest (test: ITest): boolean {
    return !tests.some(({ id }) => id === test.id)
  }

  return (
    <Stack minWidth={700} minHeight={300} spacing={1}>
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
