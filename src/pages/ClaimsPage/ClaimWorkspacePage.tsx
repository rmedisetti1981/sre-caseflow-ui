import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import DocumentList from '../../components/documents/DocumentList';

import type { ClaimDocument } from '../../features/documents/document.types';

import DocumentViewer from '../../components/documents/DocumentViewer';

import type { User } from '../../features/auth/types';
import { regularUser } from '../../features/auth/mockUsers';

const ClaimWorkspacePage = () => {
  const navigate = useNavigate();

  const storedUser = sessionStorage.getItem('caseflow-user');

  const currentUser: User = storedUser ? JSON.parse(storedUser) : regularUser;

  const { claimId } = useParams<{
    claimId: string;
  }>();

  const [selectedDocument, setSelectedDocument] =
    useState<ClaimDocument | null>(null);

  if (!claimId) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Claim ID is missing.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/claims')}
        >
          Back to Claims
        </Button>

        <Typography variant="h4">
          Claim Workspace
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          {claimId}
        </Typography>
      </Box>

      <Divider />

      {/* Workspace */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 2,
        }}
      >
        {/* Documents */}
        <Paper
          elevation={1}
          sx={{
            overflow: 'auto',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">
              Documents
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Documents associated with this claim
            </Typography>
          </Box>

          <Divider />

          <DocumentList
            claimId={claimId}
            selectedDocumentId={
              selectedDocument?.id
            }
            onDocumentSelect={
              setSelectedDocument
            }
          />
        </Paper>

        {/* Document area */}
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
        {selectedDocument ? (
          <DocumentViewer
            documentId={selectedDocument.id}
            fileName={selectedDocument.fileName}
            pageCount={selectedDocument.pageCount}
            fileSize={selectedDocument.fileSize}
            user={currentUser}
          />
        ) : (
          <Typography color="text.secondary">
            Select a document to view it.
          </Typography>
        )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ClaimWorkspacePage;