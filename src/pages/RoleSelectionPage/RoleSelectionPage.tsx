import { Box, Button, Paper, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useNavigate } from 'react-router-dom';

import {
  regularUser,
  adminUser,
} from '../../features/auth/mockUsers';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        p: 3,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          CaseFlow
        </Typography>

        <Typography
          variant="h5"
          sx={{ mt: 1 }}
        >
          Select User Role
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Choose a role to continue
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          width: '100%',
          maxWidth: 800,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* User */}
        <Paper
          elevation={2}
          sx={{
            width: 320,
            p: 4,
            textAlign: 'center',
          }}
        >
          <PersonIcon
            sx={{
              fontSize: 60,
              mb: 2,
            }}
          />

          <Typography variant="h5">
            User
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              minHeight: 48,
            }}
          >
            View claims and documents based on
            user permissions.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              sessionStorage.setItem(
                'caseflow-user',
                JSON.stringify(regularUser),
              );

              navigate('/claims');
            }}
          >
            Continue as User
          </Button>
        </Paper>

        {/* Admin / Supervisor */}
        <Paper
          elevation={2}
          sx={{
            width: 320,
            p: 4,
            textAlign: 'center',
          }}
        >
          <AdminPanelSettingsIcon
            sx={{
              fontSize: 60,
              mb: 2,
            }}
          />

          <Typography variant="h5">
            Admin / Supervisor
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              minHeight: 48,
            }}
          >
            Full access to claim and document
            operations.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              sessionStorage.setItem(
                'caseflow-user',
                JSON.stringify(adminUser),
              );

              navigate('/claims');
            }}
          >
            Continue as Admin
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default RoleSelectionPage;