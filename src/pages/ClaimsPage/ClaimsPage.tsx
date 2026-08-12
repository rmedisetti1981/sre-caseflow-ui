import { useEffect, useState } from 'react';

import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
} from '@mui/x-data-grid';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { useGetClaimsQuery } from '../../state/server/endpoints/claimsApi';

import type { ClaimStatus } from '../../features/claims/claim.types';

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
  // User-entered search value
  const [search, setSearch] = useState('');

  // Debounced search value used for API requests
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Status filter
  const [status, setStatus] = useState<ClaimStatus | ''>('');

  // Server-side pagination
  const [paginationModel, setPaginationModel] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 100,
    });

  // Server-side sorting
  const [sortModel, setSortModel] =
    useState<GridSortModel>([
      {
        field: 'createdDate',
        sort: 'desc',
      },
    ]);

  /**
   * Debounce search input.
   *
   * The API will not be called for every keystroke.
   * Example:
   *
   * J
   * Ja
   * Jam
   * Jame
   * James
   *
   *          ↓ wait 400ms
   *
   * One API request
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const sort = sortModel[0];

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetClaimsQuery({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,

    sortField: sort?.field,

    sortDirection:
      sort?.sort ?? undefined,

    search:
      debouncedSearch || undefined,

    status:
      status || undefined,
  });

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        Failed to load claims.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)',
        width: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <h1 style={{ margin: 0 }}>
        Claims
      </h1>

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Search claims"
          placeholder="Claim number or customer"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);

            // Return to first page when search changes
            setPaginationModel((previous) => ({
              ...previous,
              page: 0,
            }));
          }}
          size="small"
          sx={{
            width: 300,
          }}
        />

        <FormControl
          size="small"
          sx={{
            minWidth: 180,
          }}
        >
          <InputLabel id="claim-status-label">
            Status
          </InputLabel>

          <Select
            labelId="claim-status-label"
            value={status}
            label="Status"
            onChange={(event) => {
              setStatus(
                event.target.value as ClaimStatus | '',
              );

              // Return to first page when status changes
              setPaginationModel((previous) => ({
                ...previous,
                page: 0,
              }));
            }}
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="OPEN">
              Open
            </MenuItem>

            <MenuItem value="IN_REVIEW">
              In Review
            </MenuItem>

            <MenuItem value="APPROVED">
              Approved
            </MenuItem>

            <MenuItem value="REJECTED">
              Rejected
            </MenuItem>

            <MenuItem value="CLOSED">
              Closed
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Claims Data Grid */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
        }}
      >
        <DataGrid
        rows={data?.data ?? []}
        columns={columns}
        rowCount={data?.total ?? 0}
        loading={isLoading || isFetching}
        pagination
        paginationMode="server"
        sortingMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => {
            setPaginationModel((previous) => {
            const pageSizeChanged =
                previous.pageSize !== newModel.pageSize;

            return {
                ...newModel,
                page: pageSizeChanged
                ? 0
                : newModel.page,
            };
            });
        }}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => {
            setSortModel(newSortModel);

            setPaginationModel((previous) => ({
                ...previous,
                page: 0,
            }));
        }}
        pageSizeOptions={[25, 50, 100]}
        disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default ClaimsPage;