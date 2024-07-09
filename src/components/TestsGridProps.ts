import { TFunction } from 'i18next'

export const initialState = {
  pagination: { paginationModel: { pageSize: 5, page: 0 } }
}

export const styles = {
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  }
}

export function localeText (t: TFunction): any {
  return {
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
