import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import RoleSelectionPage from './pages/RoleSelectionPage/RoleSelectionPage';
import ClaimsPage from './pages/ClaimsPage/ClaimsPage';
import ClaimWorkspacePage from './pages/ClaimsPage/ClaimWorkspacePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Role selection */}
        <Route
          path="/"
          element={<RoleSelectionPage />}
        />

        {/* Claims */}
        <Route
          path="/claims"
          element={<ClaimsPage />}
        />

        {/* Claim workspace */}
        <Route
          path="/claims/:claimId"
          element={<ClaimWorkspacePage />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;