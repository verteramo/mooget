/** External dependencies */
import { useDispatch, useSelector } from 'react-redux'

/** Package dependencies */
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
