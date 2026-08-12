import express from 'express';
import cors from 'cors';

import { claims } from './data/claims';
import { documents } from './data/documents';

import type { ClaimStatus } from '../src/features/claims/claim.types';

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

// Get a single claim
app.get('/api/claims/:id', (req, res) => {
  const claim = claims.find(
    (item) => item.id === req.params.id,
  );

  if (!claim) {
    return res.status(404).json({
      message: 'Claim not found',
    });
  }

  return res.json(claim);
});


// Update claim
app.put('/api/claims/:id', (req, res) => {
  const claim = claims.find(
    (item) => item.id === req.params.id,
  );

  if (!claim) {
    return res.status(404).json({
      message: 'Claim not found',
    });
  }

  const {
    customerName,
    status,
  } = req.body;

  const validStatuses: ClaimStatus[] = [
    'OPEN',
    'IN_REVIEW',
    'APPROVED',
    'REJECTED',
    'CLOSED',
  ];

  if (
    status !== undefined &&
    !validStatuses.includes(status)
  ) {
    return res.status(400).json({
      message: `Invalid status: ${status}`,
    });
  }

  if (
    customerName !== undefined &&
    typeof customerName !== 'string'
  ) {
    return res.status(400).json({
      message: 'customerName must be a string',
    });
  }

  if (customerName !== undefined) {
    claim.customerName = customerName.trim();
  }

  if (status !== undefined) {
    claim.status = status;
  }

  return res.json(claim);
});


// Assign claim
app.post('/api/claims/:id/assign', (req, res) => {
  const claim = claims.find(
    (item) => item.id === req.params.id,
  );

  if (!claim) {
    return res.status(404).json({
      message: 'Claim not found',
    });
  }

  const { assignedTo } = req.body;

  if (
    !assignedTo ||
    typeof assignedTo !== 'string'
  ) {
    return res.status(400).json({
      message: 'assignedTo is required',
    });
  }

  claim.assignedTo = assignedTo;

  return res.json(claim);
});


// Delete claim
app.delete('/api/claims/:id', (req, res) => {
  const claimIndex = claims.findIndex(
    (item) => item.id === req.params.id,
  );

  if (claimIndex === -1) {
    return res.status(404).json({
      message: 'Claim not found',
    });
  }

  claims.splice(claimIndex, 1);

  return res.status(204).send();
});

app.get('/api/claims/:claimId/documents', (req, res) => {
  const { claimId } = req.params;

  const claimDocuments = documents.filter(
    (document) => document.claimId === claimId,
  );

  return res.json({
    data: claimDocuments,
    total: claimDocuments.length,
  });
});

app.listen(PORT, () => {
  console.log(
    `CaseFlow Mock API running on http://localhost:${PORT}`,
  );
});