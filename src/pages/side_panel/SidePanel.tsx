import store from '@/redux/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

interface SidePanelProps {

}

const SidePanel: React.FC<SidePanelProps> = () => {
  return (
    <div>
      <h1>SidePanel</h1>
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <SidePanel />
  </Provider>
)
