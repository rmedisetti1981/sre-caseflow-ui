import { baseApi } from '../baseApi';

import type {
  //ClaimDocument,
  DocumentsResponse,
} from '../../../features/documents/document.types';

export const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClaimDocuments: builder.query<
      DocumentsResponse,
      string
    >({
      query: (claimId) =>
        `/claims/${claimId}/documents`,
      providesTags: ['Documents'],
    }),
  }),
});

export const {
  useGetClaimDocumentsQuery,
} = documentsApi;