import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import ClaimsPage from './pages/ClaimsPage/ClaimsPage';
import ClaimWorkspacePage from './pages/ClaimsPage/ClaimWorkspacePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/claims"
              replace
            />
          }
        />

        <Route
          path="/claims"
          element={<ClaimsPage />}
        />

        <Route
          path="/claims/:claimId"
          element={<ClaimWorkspacePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;