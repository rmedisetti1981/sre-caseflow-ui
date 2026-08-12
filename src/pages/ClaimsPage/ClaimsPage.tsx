import { useState } from 'react';

import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  type GridFilterModel,
} from '@mui/x-data-grid';

import { useGetClaimsQuery } from '../../state/server/endpoints/claimsApi';

const columns: GridColDef[] = [
  {
    field: 'claimNumber',
    headerName: 'Claim Number',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'customerName',
    headerName: 'Customer',
    flex: 1.5,
    minWidth: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 130,
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    flex: 1,
    minWidth: 160,
  },
  {
    field: 'createdDate',
    headerName: 'Created Date',
    flex: 1,
    minWidth: 160,
  },
  {
    field: 'documentCount',
    headerName: 'Documents',
    type: 'number',
    flex: 0.8,
    minWidth: 120,
  },
];

const ClaimsPage = () => {
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 100,
    });

  const [sortModel, setSortModel] =
    useState<GridSortModel>([
      {
        field: 'createdDate',
        sort: 'desc',
      },
    ]);

  const [filterModel, setFilterModel] =
    useState<GridFilterModel>({
      items: [],
    });

  const sort = sortModel[0];

  const searchFilter = filterModel.items.find(
    (item) => item.field === 'customerName',
  );

  const statusFilter = filterModel.items.find(
    (item) => item.field === 'status',
  );

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetClaimsQuery({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    sortField: sort?.field,
    sortDirection: sort?.sort ?? undefined,
    search:
      searchFilter?.value || undefined,
    status:
      statusFilter?.value as
        | 'OPEN'
        | 'IN_REVIEW'
        | 'APPROVED'
        | 'REJECTED'
        | 'CLOSED'
        | undefined,
  });

  if (error) {
    return (
      <div>
        Failed to load claims.
      </div>
    );
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 100px)',
        padding: 24,
      }}
    >
      <h1>Claims</h1>

      <DataGrid
        rows={data?.data ?? []}
        columns={columns}
        rowCount={data?.total ?? 0}
        loading={isLoading || isFetching}
        pagination
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={
          setPaginationModel
        }
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        filterModel={filterModel}
        onFilterModelChange={
          setFilterModel
        }
        pageSizeOptions={[25, 50, 100]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ClaimsPage;