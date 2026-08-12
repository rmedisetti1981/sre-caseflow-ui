import {
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import type { ClaimDocument } from '../../features/documents/document.types';
import { useGetClaimDocumentsQuery } from '../../state/server/endpoints/documentsApi';

interface DocumentListProps {
  claimId: string;
  selectedDocumentId?: string;
  onDocumentSelect: (document: ClaimDocument) => void;
}

const formatFileSize = (bytes: number): string => {
  const megabytes = bytes / (1024 * 1024);

  if (megabytes < 1024) {
    return `${Math.round(megabytes)} MB`;
  }

  return `${(megabytes / 1024).toFixed(1)} GB`;
};

const DocumentList = ({
  claimId,
  selectedDocumentId,
  onDocumentSelect,
}: DocumentListProps) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetClaimDocumentsQuery(claimId);

  if (isLoading || isFetching) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        sx={{ p: 2 }}
      >
        Unable to load documents.
      </Typography>
    );
  }

  if (!data?.data.length) {
    return (
      <Typography
        color="text.secondary"
        sx={{ p: 2 }}
      >
        No documents found.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {data.data.map((document) => (
        <ListItemButton
          key={document.id}
          selected={
            document.id === selectedDocumentId
          }
          onClick={() =>
            onDocumentSelect(document)
          }
        >
          <ListItemText
            primary={document.fileName}
            secondary={`${formatFileSize(
              document.fileSize,
            )} • ${document.pageCount} pages`}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default DocumentList;