export type Permission =
  | 'CLAIM_VIEW'
  | 'CLAIM_EDIT'
  | 'CLAIM_DELETE'
  | 'CLAIM_ASSIGN'
  | 'DOCUMENT_VIEW'
  | 'DOCUMENT_EDIT'
  | 'DOCUMENT_DELETE'
  | 'DOCUMENT_SPLIT'
  | 'DOCUMENT_MERGE'
  | 'DOCUMENT_COMMENT'
  | 'DOCUMENT_ANNOTATE';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: Permission[];
}