import { Label } from './ui/label'
import { Textarea, TextareaProps } from './ui/textarea'

interface Props extends Omit<TextareaProps, 'onChange'> {
  label: string
  onChange: (value: string) => void
}

export function LabeledTextarea (props: Props): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    props.onChange(event.target.value)
  }

  return (
    <div className='flex-1 relative'>
      <Label
        htmlFor={props.id}
        className='absolute -top-2 left-2 px-1 bg-background text-[10px] text-muted-foreground tracking-widest'
      >
        {props.label}
      </Label>
      <Textarea
        {...props}
        onChange={handleChange}
      />
    </div>
  )
}
