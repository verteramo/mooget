import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Quiz } from '@/models'
import { uploadQuiz } from '@/stores/useQuizStore'
import { Upload } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  onUploadQuiz: (quiz: Quiz) => void
}

export default function Toolbar ({ onUploadQuiz }: Props): JSX.Element {
  const { t } = useTranslation()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if ((file != null) && file.type === 'application/json') {
      uploadQuiz(file).then(onUploadQuiz).catch(console.error)
    } else {
      alert('Por favor, seleccione un archivo JSON válido.')
    }
  }

  const handleUploadClick = (): void => {
    document.getElementById('file-upload')?.click()
  }

  return (
    <Card className='w-full bg-gray-100 dark:bg-gray-800 p-2 mb-2'>
      <div className='flex justify-start items-center space-x-2'>
        <Button
          onClick={handleUploadClick}
          variant='outline'
          className='bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200'
          title='Cargar archivo JSON'
        >
          <Upload className='h-4 w-4 mr-2 text-gray-600 dark:text-gray-300' />
          {t('upload')}
        </Button>
        <input
          id='file-upload'
          type='file'
          accept='.json'
          onChange={handleFileChange}
          className='hidden'
        />
      </div>
    </Card>
  )
}
