import express from 'express';
import cors from 'cors';

import { claims } from './data/claims';

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
  });
});

app.get('/api/claims', (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 100;

  const search = String(req.query.search || '').trim();

  const status = req.query.status
    ? String(req.query.status)
    : '';

  const sortField = String(
    req.query.sortField || 'createdDate',
  );

  const sortDirection =
    req.query.sortDirection === 'asc'
      ? 'asc'
      : 'desc';

  const sortableFields = [
    'claimNumber',
    'customerName',
    'status',
    'assignedTo',
    'createdDate',
    'documentCount',
  ] as const;

  if (
    !sortableFields.includes(
      sortField as (typeof sortableFields)[number],
    )
  ) {
    return res.status(400).json({
      message: `Invalid sort field: ${sortField}`,
    });
  }

  const validStatuses = [
    'OPEN',
    'IN_REVIEW',
    'APPROVED',
    'REJECTED',
    'CLOSED',
  ];

  if (
    status &&
    !validStatuses.includes(status)
  ) {
    return res.status(400).json({
      message: `Invalid status: ${status}`,
    });
  }

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      !search ||
      claim.claimNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      claim.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (claim.assignedTo ?? '')
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !status || claim.status === status;

    return matchesSearch && matchesStatus;
  });

  const sortedClaims = [...filteredClaims].sort(
    (a, b) => {
      const aValue =
        a[sortField as keyof typeof a];

      const bValue =
        b[sortField as keyof typeof b];

      if (aValue === bValue) {
        return 0;
      }

      if (aValue == null) {
        return 1;
      }

      if (bValue == null) {
        return -1;
      }

      const comparison =
        String(aValue).localeCompare(
          String(bValue),
          undefined,
          {
            numeric: true,
            sensitivity: 'base',
          },
        );

      return sortDirection === 'asc'
        ? comparison
        : -comparison;
    },
  );

  const total = sortedClaims.length;

  const startIndex =
    (page - 1) * pageSize;

  const endIndex =
    startIndex + pageSize;

  const paginatedClaims =
    sortedClaims.slice(
      startIndex,
      endIndex,
    );

  return res.json({
    data: paginatedClaims,
    total,
    page,
    pageSize,
    sortField,
    sortDirection,
    filters: {
      search,
      status: status || null,
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `CaseFlow Mock API running on http://localhost:${PORT}`,
  );
});