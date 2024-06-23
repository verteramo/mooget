import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import { setEnvironment } from '@/redux/slices'
import store from '@/redux/store'

interface PopupProps {

}

const Popup: React.FC<PopupProps> = () => {
  const dispatch = useDispatch()

  const dispatchAction = (): void => {
    dispatch(setEnvironment({ theme: 'dark' }))
  }

  return (
    <div>
      <h1>Popup</h1>
      <button onClick={dispatchAction}>Dispatch</button>
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Popup />
  </Provider>
)
