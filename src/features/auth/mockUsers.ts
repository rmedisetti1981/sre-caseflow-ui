import type { User } from './types';

export const regularUser: User = {
  id: 'user-001',
  name: 'Case User',
  email: 'user@caseflow.com',
  roles: ['USER'],
  permissions: [
    'CLAIM_VIEW',
    'DOCUMENT_VIEW',
    'DOCUMENT_COMMENT',
  ],
};

export const adminUser: User = {
  id: 'admin-001',
  name: 'Case Administrator',
  email: 'admin@caseflow.com',
  roles: ['ADMIN', 'SUPERVISOR'],
  permissions: [
    'CLAIM_VIEW',
    'CLAIM_EDIT',
    'CLAIM_DELETE',
    'CLAIM_ASSIGN',
    'DOCUMENT_VIEW',
    'DOCUMENT_EDIT',
    'DOCUMENT_DELETE',
    'DOCUMENT_SPLIT',
    'DOCUMENT_MERGE',
    'DOCUMENT_COMMENT',
    'DOCUMENT_ANNOTATE',
  ],
};