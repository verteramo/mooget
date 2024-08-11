/*******************************************************************************
 * QuizGrid.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import {
  Box,
  Checkbox
} from '@mui/material'

import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams
} from '@mui/x-data-grid'

import {
  Cancel,
  Delete,
  Download,
  Edit,
  Favorite,
  PlayCircle,
  Save
} from '@mui/icons-material'

/** Package dependencies */
import {
  cellItemHoverColor,
  dataGridStyles,
  initialState,
  localeText
} from './QuizGridProps'

/** Project dependencies */
import { Question } from '@/core/models/Question'
import { Quiz } from '@/core/models/Quiz'
import { Store } from '@/core/models/Store'
import { createProgress, openSidePanel, promptQuizDownload } from '@/core/utils/quizzes'
import { sliceProgressSetProgress } from '@/redux/sliceProgress'
import { sliceQuizzesRemoveQuiz, sliceQuizzesUpdateQuiz } from '@/redux/sliceQuizzes'

interface IProps {
  quizzes: Quiz[]
}

export function QuizGrid ({ quizzes }: IProps): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const currentQuizId = useSelector((store: Store) => store.progress.quiz)

  const processRowUpdate = (quiz: GridRowModel<Quiz>): Quiz => {
    return dispatch(sliceQuizzesUpdateQuiz(quiz)).payload
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const toggleFavorite = (id: string) => () => {
    const quiz = quizzes.find(({ id: currentId }) => currentId === id)

    if (quiz !== undefined) {
      dispatch(
        sliceQuizzesUpdateQuiz({ ...quiz, favorite: !(quiz.favorite ?? false) })
      )
    }
  }

  const handleQuizEdit = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit }
    })
  }

  const handleQuizEditSave = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    })
  }

  const handleQuizEditCancel = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })
  }

  const handleQuizDelete =
    ({ id, name, questions: { length } }: Quiz) =>
      () => {
        confirm({
          title: <>{t('remove-title')}</>,
          content: <p>{t('remove-content', { name, length })}</p>
        })
          .then(() => dispatch(sliceQuizzesRemoveQuiz(id)))
          .catch(console.error)
      }

  const handleQuizDownload = (quiz: Quiz) => () => {
    promptQuizDownload(quiz)
  }

  const handleQuizPlay = (quiz: Quiz) => () => {
    if (currentQuizId !== quiz.id) {
      dispatch(sliceProgressSetProgress(createProgress(quiz)))
    }

    openSidePanel().catch((error: Error) => {
      console.log('QuizGrid.tsx > handleQuizPlay > openSidePanel', error)
    })
  }

  const columns: GridColDef[] = [
    {
      // Favorite column
      field: 'favorite',
      headerName: '',
      resizable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 52,
      align: 'left',
      cellClassName: 'favorite-cell',
      renderCell: ({ value, row: { id } }: GridCellParams<Quiz, boolean>) => (
        <Checkbox
          size='small'
          icon={<Favorite />}
          checkedIcon={<Favorite color='error' />}
          checked={value ?? false}
          onChange={toggleFavorite(id)}
        />
      )
    },

    {
      // Category column
      field: 'category',
      headerName: t('category'),
      width: 180,
      editable: true
    },

    {
      // Name column
      field: 'name',
      headerName: t('quiz'),
      width: 180,
      editable: true
    },

    {
      // Questions column
      field: 'questions',
      headerName: t('questions'),
      align: 'center',
      type: 'number',
      renderCell: ({ value }: GridCellParams<any, Question[]>) =>
        value?.length,
      sortComparator: (v1: Question[], v2: Question[]) =>
        v1.length - v2.length
    },

    {
      // Actions column
      field: 'actions',
      type: 'actions',
      resizable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 160,
      align: 'center',
      getActions: ({ id, row: quiz }: GridRowParams<Quiz>) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              sx={cellItemHoverColor('forestgreen')}
              key='save'
              label={t('save')}
              title={t('save')}
              icon={<Save />}
              onClick={handleQuizEditSave(id)}
            />,
            <GridActionsCellItem
              sx={cellItemHoverColor('crimson')}
              key='cancel'
              label={t('cancel')}
              title={t('cancel')}
              icon={<Cancel />}
              onClick={handleQuizEditCancel(id)}
            />
          ]
        }

        return [
          <GridActionsCellItem
            sx={cellItemHoverColor('goldenrod')}
            key='edit'
            label={t('edit')}
            title={t('edit')}
            icon={<Edit />}
            onClick={handleQuizEdit(id)}
          />,
          <GridActionsCellItem
            sx={cellItemHoverColor('crimson')}
            key='delete'
            label={t('delete')}
            title={t('delete')}
            icon={<Delete />}
            onClick={handleQuizDelete(quiz)}
          />,
          <GridActionsCellItem
            sx={cellItemHoverColor('steelblue')}
            key='download'
            label={t('download')}
            title={t('download')}
            icon={<Download />}
            onClick={handleQuizDownload(quiz)}
          />,
          <GridActionsCellItem
            sx={cellItemHoverColor('forestgreen')}
            key='play'
            label={t('play')}
            title={t('play')}
            icon={<PlayCircle />}
            onClick={handleQuizPlay(quiz)}
          />
        ]
      }
    }
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        disableColumnSelector
        disableRowSelectionOnClick
        editMode='row'
        density='compact'
        rows={quizzes}
        columns={columns}
        rowSelection={false}
        rowModesModel={rowModesModel}
        autosizeOptions={{ includeOutliers: true }}
        processRowUpdate={processRowUpdate}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        pageSizeOptions={[5, 10, 20]}
        // Come from TestsGridProps.ts
        sx={dataGridStyles}
        initialState={initialState}
        localeText={localeText(t)}
      />
    </Box>
  )
}
