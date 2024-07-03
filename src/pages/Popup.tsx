import { NewTestControl } from '@/components'
import { useTest } from '@/hooks'
import { ThemeModeProvider } from '@/providers'
import { IStore, store, persistor } from '@/redux/store'
import { createTest } from '@/redux/test.slice'
import { Box } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import '@/redux/listener'

function Popup (): JSX.Element {
  const [test, setName] = useTest()
  const tests = useSelector((store: IStore) => store.tests)
  const dispatch = useDispatch()

  const handleClick = (): void => {
    if (test !== undefined) {
      dispatch(createTest(test))
    }
  }

  return (
    <Box minWidth={600}>
      {test !== undefined
        ? <NewTestControl
            test={test}
            handleChange={setName}
            handleClick={handleClick}
          />
        : <p>No test found.</p>}
      {JSON.stringify(tests)}
    </Box>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeModeProvider>
        <Popup />
      </ThemeModeProvider>
    </PersistGate>
  </Provider>
)
