import { Input, InputProps } from './ui/input'
import { Label } from './ui/label'

interface Props extends Omit<InputProps, 'onChange'> {
  label: string
  onChange: (value: string) => void
}

export function LabeledInput (props: Props): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value)
  }

  return (
    <div className='flex-1 relative'>
      <Label
        htmlFor={props.label}
        className='absolute -top-2 left-2 px-1 bg-background text-[10px] text-muted-foreground tracking-widest'
      >
        {props.label}
      </Label>
      <Input
        {...props}
        id={props.label}
        onChange={handleChange}
      />
    </div>
  )
}
