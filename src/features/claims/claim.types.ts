export type ClaimStatus =
  | 'OPEN'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'CLOSED';

export interface Claim {
  id: string;
  claimNumber: string;
  customerName: string;
  status: ClaimStatus;
  assignedTo: string | null;
  createdDate: string;
  documentCount: number;
}

export interface ClaimsResponse {
  data: Claim[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ClaimQueryParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  search?: string;
  status?: ClaimStatus;
}

export interface UpdateClaimRequest {
  id: string;
  data: Partial<Claim>;
}

export interface AssignClaimRequest {
  id: string;
  assignedTo: string;
}