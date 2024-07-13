import {
  Box,
  Checkbox
} from '@mui/material'

import {
  Cancel,
  Delete,
  Download,
  Edit,
  PlayCircle,
  Save,
  Star
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

import { IQuestion, IQuiz } from '@/dom'
import { removeQuiz, setConfigCurrentTest, updateQuiz } from '@/redux'
import { downloadTest } from '@/scripts/utilities'

import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { initialState, localeText, styles } from './TestsGridProps'

interface IProps {
  tests: IQuiz[]
}

export function TestsGrid ({ tests }: IProps): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const processRowUpdate = (test: GridRowModel<IQuiz>): IQuiz => {
    return dispatch(updateQuiz(test)).payload
  }

  const handleRowModesModelChange = (model: GridRowModesModel): void => {
    setRowModesModel(model)
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params, event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const toggleFavorite = (id: GridRowId) => () => {
    const test = tests.find((test) => test.id === id)

    if (test !== undefined) {
      dispatch(updateQuiz({ ...test, favorite: !(test.favorite ?? false) }))
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit }
    })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })
  }

  const handleDeleteClick = (test: IQuiz) => () => {
    confirm({
      title: <>{t('remove-title')}</>,
      content: (
        <p>
          {t('remove-content', {
            name: test.name,
            questions: test.questions.length
          })}
        </p>
      )
    })
      .then(() => dispatch(removeQuiz(test.id)))
      .catch(console.error)
  }

  const handleDownloadClick = (test: IQuiz) => () => {
    downloadTest(test)
  }

  const handlePlayClick = (test: IQuiz) => () => {
    dispatch(setConfigCurrentTest(test.id))
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
      align: 'center',
      width: 20,
      renderCell: (params: GridCellParams<any, boolean>) => (
        <Checkbox
          size='small'
          icon={<Star />}
          checkedIcon={<Star color='warning' />}
          checked={params.value ?? false}
          onChange={toggleFavorite(params.id)}
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
      headerName: t('test'),
      minWidth: 180,
      editable: true
    },

    {
      // Questions column
      field: 'questions',
      headerName: t('questions'),
      align: 'center',
      type: 'number',
      renderCell: (params: GridCellParams<any, IQuestion[]>) =>
        params.value?.length,
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
      getActions: (params: GridRowParams<IQuiz>) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key='save'
              label={t('save')}
              title={t('save')}
              icon={<Save />}
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              key='cancel'
              label={t('cancel')}
              title={t('cancel')}
              icon={<Cancel />}
              onClick={handleCancelClick(params.id)}
            />
          ]
        }

        return [
          <GridActionsCellItem
            key='edit'
            label={t('edit')}
            title={t('edit')}
            icon={<Edit />}
            onClick={handleEditClick(params.id)}
          />,
          <GridActionsCellItem
            key='delete'
            label={t('delete')}
            title={t('delete')}
            icon={<Delete />}
            onClick={handleDeleteClick(params.row)}
          />,
          <GridActionsCellItem
            key='download'
            label={t('download')}
            title={t('download')}
            icon={<Download />}
            onClick={handleDownloadClick(params.row)}
          />,
          <GridActionsCellItem
            key='play'
            label={t('play')}
            title={t('play')}
            icon={<PlayCircle />}
            onClick={handlePlayClick(params.row)}
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
        rows={tests}
        columns={columns}
        rowSelection={false}
        rowModesModel={rowModesModel}
        autosizeOptions={{ includeOutliers: true }}
        processRowUpdate={processRowUpdate}
        onRowModesModelChange={handleRowModesModelChange}
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
