import {
  Box,
  Checkbox
} from '@mui/material'

import {
  Cancel,
  Delete,
  Download,
  Edit,
  Favorite,
  PlayCircle,
  Save
} from '@mui/icons-material'

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

import { IQuestion, QuizInfo } from '@/dom'
import { removeQuiz, setQuiz, updateQuiz } from '@/redux'
import { downloadQuiz } from '@/scripts/utilities'

import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { initialState, localeText, styles } from './QuizGridProps'

interface IProps {
  quizzes: QuizInfo[]
}

export function QuizGrid ({ quizzes }: IProps): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const processRowUpdate = (quiz: GridRowModel<QuizInfo>): QuizInfo => {
    return dispatch(updateQuiz(quiz)).payload
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params, event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const toggleFavorite = (id: string) => () => {
    const quiz = quizzes.find(({ id: currentId }) => currentId === id)

    if (quiz !== undefined) {
      dispatch(updateQuiz({ ...quiz, favorite: !(quiz.favorite ?? false) }))
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

  const handleQuizDelete = ({ id, name, questions: { length } }: QuizInfo) => () => {
    confirm({
      title: <>{t('remove-title')}</>,
      content: <p>{t('remove-content', { name, length })}</p>
    })
      .then(() => dispatch(removeQuiz(id)))
      .catch(console.error)
  }

  const handleQuizDownload = (quiz: QuizInfo) => () => {
    downloadQuiz(quiz)
  }

  const handleQuizPlay = (quiz: QuizInfo) => () => {
    dispatch(setQuiz(quiz))
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.sidePanel.open({ tabId: tab.id as number }).catch(console.error)
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
      width: 50,
      align: 'left',
      cellClassName: 'favorite-cell',
      renderCell: ({ value, row: { id } }: GridCellParams<QuizInfo, boolean>) => (
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
      minWidth: 180,
      editable: true
    },

    {
      // Name column
      field: 'name',
      headerName: t('quiz'),
      minWidth: 180,
      editable: true
    },

    {
      // Questions column
      field: 'questions',
      headerName: t('questions'),
      align: 'center',
      type: 'number',
      renderCell: ({ value }: GridCellParams<any, IQuestion[]>) =>
        value?.length,
      sortComparator: (v1: IQuestion[], v2: IQuestion[]) =>
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
      getActions: ({ id, row: quiz }: GridRowParams<QuizInfo>) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key='save'
              label={t('save')}
              title={t('save')}
              icon={<Save />}
              onClick={handleQuizEditSave(id)}
            />,
            <GridActionsCellItem
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
            key='edit'
            label={t('edit')}
            title={t('edit')}
            icon={<Edit />}
            onClick={handleQuizEdit(id)}
          />,
          <GridActionsCellItem
            key='delete'
            label={t('delete')}
            title={t('delete')}
            icon={<Delete />}
            onClick={handleQuizDelete(quiz)}
          />,
          <GridActionsCellItem
            key='download'
            label={t('download')}
            title={t('download')}
            icon={<Download />}
            onClick={handleQuizDownload(quiz)}
          />,
          <GridActionsCellItem
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
        sx={styles}
        initialState={initialState}
        localeText={localeText(t)}
      />
    </Box>
  )
}
