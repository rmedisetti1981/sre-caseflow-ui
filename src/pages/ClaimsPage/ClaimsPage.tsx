import { useGetClaimsQuery } from '../../state/server/endpoints/claimsApi';

const ClaimsPage = () => {
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetClaimsQuery({
    page: 1,
    pageSize: 100,
  });

  if (isLoading) {
    return <div>Loading claims...</div>;
  }

  if (error) {
    return <div>Failed to load claims.</div>;
  }

  return (
    <div>
      <h1>Claims</h1>

      <p>
        Total claims: {data?.total ?? 0}
      </p>

      <p>
        Loaded records: {data?.data.length ?? 0}
      </p>

      {isFetching && <p>Refreshing...</p>}

      <ul>
        {data?.data.slice(0, 10).map((claim) => (
          <li key={claim.id}>
            {claim.claimNumber} - {claim.customerName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimsPage;