import { TestsTable } from '@/components'
import { ThemeModeProvider } from '@/providers'
import { IStore, store, persistor } from '@/redux/store'
import { createRoot } from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import '@/redux/listener'

function SidePanel (): JSX.Element {
  const tests = useSelector((store: IStore) => store.tests)

  return (
    <>
      <h1>Side Panel</h1>
      <TestsTable tests={tests} />
    </>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeModeProvider>
        <SidePanel />
      </ThemeModeProvider>
    </PersistGate>
  </Provider>
)
