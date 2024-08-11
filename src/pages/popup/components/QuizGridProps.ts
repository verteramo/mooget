/*******************************************************************************
 * QuizGridProps.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import {
  GridLocaleText
} from '@mui/x-data-grid'

import { TFunction } from 'i18next'

/** Package dependencies */

/** Project dependencies */

/**
 * Contains many properties for QuizGrid component.
 * @link https://github.com/verteramo/mooget
 * @link https://github.com/mui/mui-x/blob/v7.9.0/packages/x-data-grid/src/constants/localeTextConstants.ts
 */

/**
 * Initial state
 */
export const initialState = {
  pagination: { paginationModel: { pageSize: 5, page: 0 } }
}

/**
 * Data grid styles
 */
export const dataGridStyles = {
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  },
  '& .favorite-cell': {
    textOverflow: 'clip'
  }
}

/**
 * Cell item hover color
 * @param color Color
 * @returns Object with hover color
 */
export const cellItemHoverColor = (color: string): any => ({ '&:hover': { color } })

// /**
//  * Get columns
//  * @param rowModesModel Row modes model
//  * @param toggleFavorite Toggle favorite
//  * @param handleQuizEdit Handle quiz edit
//  * @param handleQuizEditSave Handle quiz edit save
//  * @param handleQuizEditCancel Handle quiz edit cancel
//  * @param handleQuizDelete Handle quiz delete
//  * @param handleQuizDownload Handle quiz download
//  * @param handleQuizPlay Handle quiz play
//  * @returns Array of columns
//  */
// export const getColumns = ({
//   rowModesModel,
//   toggleFavorite,
//   handleQuizEdit,
//   handleQuizEditSave,
//   handleQuizEditCancel,
//   handleQuizDelete,
//   handleQuizDownload,
//   handleQuizPlay
// }: {
//   rowModesModel: GridRowModesModel
//   toggleFavorite: (id: GridRowId) => (event: React.ChangeEvent<HTMLInputElement>) => void
//   handleQuizEdit: (id: GridRowId) => () => void
//   handleQuizEditSave: (id: GridRowId) => () => void
//   handleQuizEditCancel: (id: GridRowId) => () => void
//   handleQuizDelete: (quiz: Quiz) => () => void
//   handleQuizDownload: (quiz: Quiz) => () => void
//   handleQuizPlay: (quiz: Quiz) => () => void
// }): GridColDef[] => [
//     {
//       // Favorite column
//       field: 'favorite',
//       headerName: '',
//       resizable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       width: 52,
//       align: 'left',
//       cellClassName: 'favorite-cell',
//       renderCell: ({ value, row: { id } }: GridCellParams<Quiz, boolean>) => (
//         <Checkbox
//           size='small'
//           icon={<Favorite />}
//           checkedIcon={<Favorite color='error' />}
//           checked={value ?? false}
//           onChange={toggleFavorite(id)}
//         />
//       )
//     },

//     {
//       // Category column
//       field: 'category',
//       headerName: t('category'),
//       width: 180,
//       editable: true
//     },

//     {
//       // Name column
//       field: 'name',
//       headerName: t('quiz'),
//       width: 180,
//       editable: true
//     },

//     {
//       // Questions column
//       field: 'questions',
//       headerName: t('questions'),
//       align: 'center',
//       type: 'number',
//       renderCell: ({ value }: GridCellParams<any, Question[]>) =>
//         value?.length,
//       sortComparator: (v1: Question[], v2: Question[]) =>
//         v1.length - v2.length
//     },

//     {
//       // Actions column
//       field: 'actions',
//       type: 'actions',
//       resizable: false,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       width: 160,
//       align: 'center',
//       getActions: ({ id, row: quiz }: GridRowParams<Quiz>) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               sx={cellItemHoverColor('forestgreen')}
//               key='save'
//               label={t('save')}
//               title={t('save')}
//               icon={<Save />}
//               onClick={handleQuizEditSave(id)}
//             />,
//             <GridActionsCellItem
//               sx={cellItemHoverColor('crimson')}
//               key='cancel'
//               label={t('cancel')}
//               title={t('cancel')}
//               icon={<Cancel />}
//               onClick={handleQuizEditCancel(id)}
//             />
//           ]
//         }

//         return [
//           <GridActionsCellItem
//             sx={cellItemHoverColor('goldenrod')}
//             key='edit'
//             label={t('edit')}
//             title={t('edit')}
//             icon={<Edit />}
//             onClick={handleQuizEdit(id)}
//           />,
//           <GridActionsCellItem
//             sx={cellItemHoverColor('crimson')}
//             key='delete'
//             label={t('delete')}
//             title={t('delete')}
//             icon={<Delete />}
//             onClick={handleQuizDelete(quiz)}
//           />,
//           <GridActionsCellItem
//             sx={cellItemHoverColor('steelblue')}
//             key='download'
//             label={t('download')}
//             title={t('download')}
//             icon={<Download />}
//             onClick={handleQuizDownload(quiz)}
//           />,
//           <GridActionsCellItem
//             sx={cellItemHoverColor('forestgreen')}
//             key='play'
//             label={t('play')}
//             title={t('play')}
//             icon={<PlayCircle />}
//             onClick={handleQuizPlay(quiz)}
//           />
//         ]
//       }
//     }
//   ]

/**
 * Locale text
 * @param t Translation function
 * @returns localeText object
 */
export function localeText (t: TFunction): Partial<GridLocaleText> {
  return {
    noRowsLabel: t('no-rows-label'),

    columnMenuLabel: t('column-menu-label'),
    columnMenuShowColumns: t('column-menu-show-columns'),
    columnMenuManageColumns: t('column-menu-manage-columns'),
    columnMenuFilter: t('column-menu-filter'),
    columnMenuHideColumn: t('column-menu-hide-column'),
    columnMenuUnsort: t('column-menu-unsort'),
    columnMenuSortAsc: t('column-menu-sort-asc'),
    columnMenuSortDesc: t('column-menu-sort-desc'),

    filterPanelAddFilter: t('filter-panel-add-filter'),
    filterPanelRemoveAll: t('filter-panel-remove-all'),
    filterPanelDeleteIconLabel: t('filter-panel-delete-icon-label'),
    filterPanelLogicOperator: t('filter-panel-logic-operator'),
    filterPanelOperator: t('filter-panel-operator'),
    filterPanelOperatorAnd: t('filter-panel-operator-and'),
    filterPanelOperatorOr: t('filter-panel-operator-or'),
    filterPanelColumns: t('filter-panel-columns'),
    filterPanelInputLabel: t('filter-panel-input-label'),
    filterPanelInputPlaceholder: t('filter-panel-input-placeholder'),

    filterOperatorContains: t('filter-operator-contains'),
    filterOperatorEquals: t('filter-operator-equals'),
    filterOperatorStartsWith: t('filter-operator-starts-with'),
    filterOperatorEndsWith: t('filter-operator-ends-with'),
    filterOperatorIs: t('filter-operator-is'),
    filterOperatorNot: t('filter-operator-not'),
    filterOperatorAfter: t('filter-operator-after'),
    filterOperatorOnOrAfter: t('filter-operator-on-or-after'),
    filterOperatorBefore: t('filter-operator-before'),
    filterOperatorOnOrBefore: t('filter-operator-on-or-before'),
    filterOperatorIsEmpty: t('filter-operator-is-empty'),
    filterOperatorIsNotEmpty: t('filter-operator-is-not-empty'),
    filterOperatorIsAnyOf: t('filter-operator-is-any-of'),

    columnHeaderSortIconLabel: t('column-header-sort-icon-label'),

    MuiTablePagination: {
      labelRowsPerPage: t('rows-per-page'),
      labelDisplayedRows: ({ from, to, count }: {
        from: number
        to: number
        count: number
      }) =>
              `${from} - ${to} de ${count === -1 ? `más de ${to}` : count}`

    }
  }
}
