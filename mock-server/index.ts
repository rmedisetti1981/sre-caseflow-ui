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

app.get('/api/claims', (_req, res) => {
  res.json({
    data: claims,
    total: claims.length,
  });
});

app.listen(PORT, () => {
  console.log(
    `CaseFlow Mock API running on http://localhost:${PORT}`,
  );
});