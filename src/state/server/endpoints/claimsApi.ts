import { baseApi } from '../baseApi';

import type {
  AssignClaimRequest,
  Claim,
  ClaimQueryParams,
  ClaimsResponse,
  UpdateClaimRequest,
} from '../../../features/claims/claim.types';

export const claimsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated claims
    getClaims: builder.query<ClaimsResponse, ClaimQueryParams>({
      query: (params) => ({
        url: '/claims',
        params,
      }),
      providesTags: ['Claims'],
    }),

    // Get a single claim
    getClaim: builder.query<Claim, string>({
      query: (id) => `/claims/${id}`,
      providesTags: (_result, _error, id) => [
        {
          type: 'Claim',
          id,
        },
      ],
    }),

    // Edit claim
    updateClaim: builder.mutation<Claim, UpdateClaimRequest>({
      query: ({ id, data }) => ({
        url: `/claims/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Claims'],
    }),

    // Delete claim
    deleteClaim: builder.mutation<void, string>({
      query: (id) => ({
        url: `/claims/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Claims'],
    }),

    // Assign claim
    assignClaim: builder.mutation<Claim, AssignClaimRequest>({
      query: ({ id, assignedTo }) => ({
        url: `/claims/${id}/assign`,
        method: 'POST',
        body: {
          assignedTo,
        },
      }),
      invalidatesTags: ['Claims'],
    }),
  }),
});

export const {
  useGetClaimsQuery,
  useGetClaimQuery,
  useUpdateClaimMutation,
  useDeleteClaimMutation,
  useAssignClaimMutation,
} = claimsApi;