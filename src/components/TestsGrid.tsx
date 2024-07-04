import { Question, Test } from '@/models'
import { deleteTest, updateTest } from '@/redux'
import { downloadTest } from '@/services'

import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

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

import { setCurrent } from '@/redux/current.slice'

interface IProps {
  tests: Test[]
}

export function TestsGrid ({ tests }: IProps): JSX.Element {
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const processRowUpdate = (test: GridRowModel<Test>): Test => {
    return dispatch(updateTest(test)).payload
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
      dispatch(updateTest({ ...test, favorite: !test.favorite }))
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

  const handleDeleteClick = (test: Test) => () => {
    console.log('handleDeleteClick', test)
    confirm({
      title: 'Remove Test',
      content: `Are you sure you want to remove '${test.name}' test?`
    })
      .then(() => dispatch(deleteTest(test.id)))
      .catch(console.error)
  }

  const handleDownloadClick = (test: Test) => () => {
    downloadTest(test)
  }

  const handlePlayClick = (test: Test) => () => {
    dispatch(setCurrent(test))
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
          icon={<Favorite />}
          checkedIcon={<Favorite color='error' />}
          checked={params.value ?? false}
          onChange={toggleFavorite(params.id)}
        />
      )
    },

    {
      // Name column
      field: 'name',
      headerName: 'Test',
      minWidth: 150,
      editable: true
    },

    {
      // Category column
      field: 'category',
      headerName: 'Category',
      minWidth: 200,
      editable: true
    },

    {
      // Questions column
      field: 'questions',
      headerName: 'Questions',
      align: 'center',
      type: 'number',
      renderCell:
        (params: GridCellParams<any, Question[]>) =>
          params.value?.length,
      sortComparator:
        (v1: Question[], v2: Question[]) =>
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
      getActions: (params: GridRowParams<Test>) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key='save'
              label='Save'
              title='Save'
              icon={<Save />}
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              key='cancel'
              label='Cancel'
              title='Cancel'
              icon={<Cancel />}
              onClick={handleCancelClick(params.id)}
            />
          ]
        }

        return [
          <GridActionsCellItem
            key='edit'
            label='Edit'
            title='Edit'
            icon={<Edit />}
            onClick={handleEditClick(params.id)}
          />,
          <GridActionsCellItem
            key='delete'
            label='Delete'
            title='Delete'
            icon={<Delete />}
            onClick={handleDeleteClick(params.row)}
          />,
          <GridActionsCellItem
            key='download'
            label='Download'
            title='Download'
            icon={<Download />}
            onClick={handleDownloadClick(params.row)}
          />,
          <GridActionsCellItem
            key='play'
            label='Play'
            title='Play'
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
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } }
        }}
      />
    </Box>
  )
}
