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

import {
  Box,
  Checkbox,
  Link
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
  FavoriteBorder,
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
import { Question, Quiz } from '@/core/models'
import { useProgressStore, useQuizCollectionStore } from '@/core/stores'
import { Color } from '@/core/utilities/colors'
import { createProgress, openSidePanel, promptQuizDownload } from '@/core/utilities/quizzes'

export function QuizGrid (): JSX.Element {
  const { t } = useTranslation()
  const confirm = useConfirm()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const items = useQuizCollectionStore((state) => state.items)
  const removeQuiz = useQuizCollectionStore((state) => state.removeQuiz)
  const toggleFavorite = useQuizCollectionStore((state) => state.toggleFavorite)

  const setProgress = useProgressStore((state) => state.setProgress)

  const quizId = useProgressStore((state) => state.quizId)
  const updateQuiz = useQuizCollectionStore((state) => state.updateQuiz)

  const handleFavoriteChange = (id: string) => () => {
    toggleFavorite(id)
  }

  const processRowUpdate = (quiz: GridRowModel<Quiz>): Quiz => {
    updateQuiz(quiz)
    return quiz
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
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

  const handleQuizDelete = ({ id, name }: Quiz) => () => {
    confirm({
      title: t('delete'),
      content: name,
      cancellationText: t('cancel'),
      confirmationText: t('accept')
    })
      .then(() => removeQuiz(id))
      .catch(console.error)
  }

  const handleQuizDownload = (quiz: Quiz) => () => {
    promptQuizDownload(quiz)
  }

  const handleQuizPlay = (quiz: Quiz) => () => {
    if (quizId !== quiz.id) {
      console.log('Setting progress for quiz', quiz)
      setProgress(createProgress(quiz))
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
      renderCell: ({ row: { id }, value }: GridCellParams<Quiz, boolean>) => (
        <Checkbox
          color='error'
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={value ?? false}
          onChange={handleFavoriteChange(id)}
        />
      )
    },

    {
      // Category column
      field: 'category',
      headerName: t('category'),
      width: 180,
      editable: true,
      hideable: true
    },

    {
      // Name column
      field: 'name',
      headerName: t('quiz'),
      width: 180,
      editable: true,
      renderCell: ({ row: { url }, value }: GridCellParams<Quiz, string>) => (
        <Link
          href={url}
          fontWeight='bold'
          underline='hover'
          target='_blank'
          rel='noreferrer'
        >
          {value}
        </Link>
      )
    },

    {
      // Questions column
      field: 'questions',
      headerName: t('questions'),
      align: 'center',
      type: 'number',
      renderCell: ({ value }: GridCellParams<Quiz, Question[]>) =>
        value?.length,
      sortComparator: (a: Question[], b: Question[]) =>
        a.length - b.length
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
              sx={cellItemHoverColor(Color.Donatello)}
              key='save'
              label={t('save')}
              title={t('save')}
              icon={<Save />}
              onClick={handleQuizEditSave(id)}
            />,
            <GridActionsCellItem
              sx={cellItemHoverColor(Color.Raphael)}
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
            sx={cellItemHoverColor(Color.Michelangelo)}
            key='edit'
            label={t('edit')}
            title={t('edit')}
            icon={<Edit />}
            onClick={handleQuizEdit(id)}
          />,
          <GridActionsCellItem
            sx={cellItemHoverColor(Color.Raphael)}
            key='delete'
            label={t('delete')}
            title={t('delete')}
            icon={<Delete />}
            onClick={handleQuizDelete(quiz)}
          />,
          <GridActionsCellItem
            sx={cellItemHoverColor(Color.Donatello)}
            key='download'
            label={t('download')}
            title={t('download')}
            icon={<Download />}
            onClick={handleQuizDownload(quiz)}
          />,
          <GridActionsCellItem
            sx={cellItemHoverColor(Color.Leonardo)}
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
        rows={items}
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
