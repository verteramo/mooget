import { Test } from '@/models'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface IProps {
  tests: Test[]
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Test' },
  { field: 'category', headerName: 'Category' }
]

export function TestsTable ({ tests }: IProps): JSX.Element {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tests}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
