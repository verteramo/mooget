/*******************************************************************************
 * QuizGrid.tsx
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'

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
  Html,
  PlayCircle,
  Save
} from '@mui/icons-material'

// Package dependencies
import {
  dataGridStyles,
  initialState,
  localeText
} from './QuizGridProps'

// Package dependencies
import { Question, Quiz } from '@/models'
import { useConfigStore, useProgressStore, useQuizCollectionStore } from '@/stores'
import { openNewTab, openSidePanel } from '@/utils/native'
import { saveQuizAsJson } from '@/utils/quizzes'
import { CustomNoRowsOverlay } from './QuizGridNoRowsOverlay'
import { useTranslation } from 'react-i18next'

export function QuizGrid (): JSX.Element {
  const { t } = useTranslation()
  const confirm = useConfirm()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const items = useQuizCollectionStore((state) => state.items)
  const removeQuiz = useQuizCollectionStore((state) => state.removeQuiz)
  const updateQuiz = useQuizCollectionStore((state) => state.updateQuiz)
  const toggleFavorite = useQuizCollectionStore((state) => state.toggleFavorite)
  const toggleSequential = useQuizCollectionStore((state) => state.toggleSequential)

  const quizId = useProgressStore((state) => state.quizId)
  const initProgress = useProgressStore((state) => state.initProgress)

  const setPrintQuizId = useConfigStore((state) => state.setPrintQuizId)

  const handleFavoriteChange = (id: string) => () => {
    toggleFavorite(id)
  }

  const handleSequetialChange = (id: string) => () => {
    toggleSequential(id)
  }

  const processRowUpdate = (quiz: GridRowModel<Quiz>): Quiz => {
    updateQuiz(quiz)
    return quiz
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> =
    (params, event) => {
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
    saveQuizAsJson(quiz)
  }

  const handleQuizPlay = (quiz: Quiz) => () => {
    if (quizId !== quiz.id) {
      initProgress(quiz)
    }

    openSidePanel().catch(console.error)
  }

  const handleQuizSolve = (quiz: Quiz) => () => {
    setPrintQuizId(quiz.id)
    openNewTab('solver.html').catch(console.error)
  }

  const columns: GridColDef[] = [
    {
      // Favorite column
      field: 'favorite',
      headerName: '',
      width: 50,
      resizable: false,
      filterable: false,
      disableColumnMenu: true,
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
      flex: 1,
      minWidth: 200,
      editable: true,
      hideable: true
    },

    {
      // Name column
      field: 'name',
      headerName: t('quiz'),
      flex: 1,
      minWidth: 200,
      editable: true,
      renderCell: ({ row: { url }, value }: GridCellParams<Quiz, string>) => (
        <Link href={url} color='inherit' target='_blank' rel='noreferrer'>
          {value}
        </Link>
      )
    },

    {
      // Sequential column
      field: 'sequential',
      headerName: t('sequential'),
      flex: 0.5,
      width: 50,
      align: 'center',
      type: 'boolean',
      editable: true,
      resizable: false,
      disableColumnMenu: true,
      cellClassName: 'favorite-cell',
      renderCell: ({ row: { id }, value }: GridCellParams<Quiz, boolean>) => (
        <Checkbox
          checked={value ?? false}
          onChange={handleSequetialChange(id)}
        />
      )
    },

    {
      // Questions column
      field: 'questions',
      headerName: t('questions'),
      flex: 0.5,
      width: 100,
      align: 'center',
      type: 'number',
      renderCell: ({ value }: GridCellParams<Quiz, Question[]>) =>
        value?.length,
      sortComparator: (a: Question[], b: Question[]) => a.length - b.length
    },

    {
      // Actions column
      field: 'actions',
      type: 'actions',
      flex: 0.25,
      width: 50,
      resizable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: 'center',
      getActions: ({ id, row: quiz }: GridRowParams<Quiz>) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        return isInEditMode
          ? [
            <GridActionsCellItem
              showInMenu
              key='save'
              label={t('save')}
              title={t('save')}
              icon={<Save />}
              onClick={handleQuizEditSave(id)}
            />,
            <GridActionsCellItem
              showInMenu
              key='cancel'
              label={t('cancel')}
              title={t('cancel')}
              icon={<Cancel />}
              onClick={handleQuizEditCancel(id)}
            />
            ]
          : [
            <GridActionsCellItem
              showInMenu
              key='edit'
              label={t('edit')}
              title={t('edit')}
              icon={<Edit />}
              onClick={handleQuizEdit(id)}
            />,
            <GridActionsCellItem
              showInMenu
              key='delete'
              label={t('delete')}
              title={t('delete')}
              icon={<Delete />}
              onClick={handleQuizDelete(quiz)}
            />,
            <GridActionsCellItem
              showInMenu
              key='download'
              label={t('download')}
              title={t('download')}
              icon={<Download />}
              onClick={handleQuizDownload(quiz)}
            />,
            <GridActionsCellItem
              showInMenu
              key='solve'
              label={t('solve')}
              title={t('solve')}
              icon={<Html />}
              onClick={handleQuizSolve(quiz)}
            />,
            <GridActionsCellItem
              showInMenu
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
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </Box>
  )
}
