import type { ClaimDocument } from '../../src/features/documents/document.types';

export const documents: ClaimDocument[] = [
  {
    id: 'doc-1',
    claimId: 'claim-1',
    fileName: 'Claim-Form.pdf',
    fileType: 'PDF',
    fileSize: 125 * 1024 * 1024,
    pageCount: 25,
    createdDate: new Date().toISOString(),
  },
  {
    id: 'doc-2',
    claimId: 'claim-1',
    fileName: 'Medical-Records.pdf',
    fileType: 'PDF',
    fileSize: 450 * 1024 * 1024,
    pageCount: 120,
    createdDate: new Date().toISOString(),
  },
  {
    id: 'doc-3',
    claimId: 'claim-2',
    fileName: 'Supporting-Documents.pdf',
    fileType: 'PDF',
    fileSize: 750 * 1024 * 1024,
    pageCount: 200,
    createdDate: new Date().toISOString(),
  },
];