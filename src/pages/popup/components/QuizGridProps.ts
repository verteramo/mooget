/*******************************************************************************
 * QuizGridProps.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { GridLocaleText } from '@mui/x-data-grid'
import { TFunction } from 'i18next'

/**
 * Contains the initial state, styles and locale text for the TestsGrid component.
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
 * Styles
 */
export const styles = {
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
