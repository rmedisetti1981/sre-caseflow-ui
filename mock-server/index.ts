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

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedClaims = claims.slice(
    startIndex,
    endIndex,
  );

  res.json({
    data: paginatedClaims,
    total: claims.length,
    page,
    pageSize,
  });
});

app.listen(PORT, () => {
  console.log(
    `CaseFlow Mock API running on http://localhost:${PORT}`,
  );
});