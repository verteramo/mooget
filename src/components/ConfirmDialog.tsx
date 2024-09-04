import { AlertTriangle, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'

interface Props {
  open: boolean
  onCancel: () => void
  onAccept: () => void
  title?: string
  description: string
  acceptText?: string
  cancelText?: string
  variant?: 'info' | 'warning' | 'alert'
}

export function ConfirmDialog ({
  open,
  onCancel,
  onAccept,
  title,
  description,
  acceptText,
  cancelText,
  variant = 'info'
}: Props): JSX.Element {
  const { t } = useTranslation()

  const Icon = (
    variant === 'info'
      ? Info
      : AlertTriangle
  )

  const color = (
    variant === 'info'
      ? 'text-blue-500'
      : variant === 'warning'
        ? 'text-yellow-500'
        : 'text-red-500'
  )

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className='sm:max-w-[425px] rounded-lg'>
        <div className='flex items-start space-x-4'>
          <div className={`flex-shrink-0 ${color}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className='flex-grow'>
            <DialogHeader className='text-left'>
              <DialogTitle className='text-left'>{title ?? t('confirm')}</DialogTitle>
              <DialogDescription className='text-justify'>
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>
        <DialogFooter className='mt-4'>
          <div className='w-full flex justify-end space-x-2'>
            <Button
              variant='outline'
              onClick={onCancel}
              className='px-3 py-1 h-8 text-sm'
            >
              {cancelText ?? t('cancel')}
            </Button>
            <Button
              variant={variant}
              onClick={onAccept}
              className='px-3 py-1 h-8 text-sm'
            >
              {acceptText ?? t('accept')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
