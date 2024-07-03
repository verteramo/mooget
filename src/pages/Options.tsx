import { ThemeModeProvider } from '@/providers'
import { createRoot } from 'react-dom/client'

function Options (): JSX.Element {
  return <div>Options</div>
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeModeProvider>
    <Options />
  </ThemeModeProvider>
)
