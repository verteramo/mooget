import { common } from '@mui/material/colors'

export const selectStyles = {
  '& .MuiSelect-select': {
    color: common.white
  },
  '& .MuiSelect-icon': {
    color: common.white
  },
  '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(255, 255, 255, 0.10)'
  },
  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(255, 255, 255, 0.30)'
  },
  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(255, 255, 255, 0.50)'
  }
}
