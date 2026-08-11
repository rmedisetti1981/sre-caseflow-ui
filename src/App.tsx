import { useAppSelector } from './state/client/hooks';

function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <div>
      <h1>CaseFlow</h1>

      <p>
        Authenticated:{' '}
        {isAuthenticated ? 'Yes' : 'No'}
      </p>
    </div>
  );
}

export default App;