import { Box, Typography } from '@mui/material';

interface DocumentViewerProps {
  documentId: string;
}

const DocumentViewer = ({
  documentId,
}: DocumentViewerProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #ddd',
        }}
      >
        <Typography variant="h6">
          Document Viewer
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Document: {documentId}
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary">
          Document content will be loaded here.
        </Typography>
      </Box>
    </Box>
  );
};

export default DocumentViewer;