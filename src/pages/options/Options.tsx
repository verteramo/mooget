import store from '@/redux/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

interface OptionsProps {

}

const Options: React.FC<OptionsProps> = () => {
  return (
    <div>
      <h1>Options</h1>
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Options />
  </Provider>
)
