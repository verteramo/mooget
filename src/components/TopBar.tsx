import { setLanguage, toggleMode, useConfigStore } from '@/stores/useConfigStore'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

export function Topbar (): JSX.Element {
  const { t, i18n: { languages } } = useTranslation()
  const { mode, language } = useConfigStore((state) => state)

  return (
    <div className='flex items-center justify-between p-2 bg-[#333]'>
      <div className='flex items-center space-x-2'>
        <img src='/icon/128.png' alt={document.title} className='h-6 w-6' />
        <h1 className='text-white font-bold text-xl'>{document.title}</h1>
      </div>
      <div className='flex items-center space-x-2'>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className='w-[100px] h-7 text-xs bg-background text-foreground border-input'>
            <SelectValue placeholder={t('language')} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {t(language)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size='icon'
          variant='outline'
          onClick={() => toggleMode()}
          className='h-7 w-7 rounded-lg p-0'
        >
          {mode === 'dark'
            ? (
              <Sun className='h-4 w-4' />
              )
            : (
              <Moon className='h-4 w-4' />
              )}
        </Button>
      </div>
    </div>
  )
}
