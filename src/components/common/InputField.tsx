import { forwardRef, InputHTMLAttributes } from 'react'

export const InputField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <input ref={ref} {...props} />
})
