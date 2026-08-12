export interface DocumentPage {
  pageNumber: number;
  thumbnailUrl: string;
}

export interface ClaimDocument {
  id: string;
  claimId: string;
  fileName: string;
  fileType: 'PDF' | 'IMAGE';
  fileSize: number;
  pageCount: number;
  createdDate: string;
}

export interface DocumentsResponse {
  data: ClaimDocument[];
  total: number;
}

export interface DocumentComment {
  id: string;
  documentId: string;
  pageNumber: number;
  comment: string;
  createdBy: string;
  createdDate: string;
}