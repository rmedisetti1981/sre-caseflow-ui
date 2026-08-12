import { useState } from 'react';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface DocumentViewerProps {
  documentId: string;
}

const TOTAL_PAGES = 25;

const DocumentViewer = ({
  documentId,
}: DocumentViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [zoom, setZoom] = useState(100);

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) =>
      Math.max(1, previousPage - 1),
    );
  };

  const handleNextPage = () => {
    setCurrentPage((previousPage) =>
      Math.min(TOTAL_PAGES, previousPage + 1),
    );
  };

  const handleZoomOut = () => {
    setZoom((previousZoom) =>
      Math.max(50, previousZoom - 10),
    );
  };

  const handleZoomIn = () => {
    setZoom((previousZoom) =>
      Math.min(200, previousZoom + 10),
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ddd',
        }}
      >
        {/* Document information */}
        <Box>
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

        {/* Page controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography
            sx={{
              minWidth: 100,
              textAlign: 'center',
            }}
          >
            Page {currentPage} / {TOTAL_PAGES}
          </Typography>

          <IconButton
            onClick={handleNextPage}
            disabled={
              currentPage === TOTAL_PAGES
            }
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Zoom controls */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <IconButton
            onClick={handleZoomOut}
            disabled={zoom === 50}
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </IconButton>

          <Typography
            sx={{
              minWidth: 50,
              textAlign: 'center',
            }}
          >
            {zoom}%
          </Typography>

          <IconButton
            onClick={handleZoomIn}
            disabled={zoom === 200}
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* Document content area */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          p: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            width: `${zoom}%`,
            maxWidth: 900,
            minHeight: 1000,
            backgroundColor: '#fff',
            boxShadow: 2,
            p: 5,
            transition: 'width 0.2s ease',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3 }}
          >
            {documentId}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Page {currentPage}
          </Typography>

          <Typography>
            Document content will be rendered
            here.
          </Typography>
        </Box>
      </Box>

      {/* Bottom navigation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          p: 1,
          borderTop: '1px solid #ddd',
        }}
      >
        <Button
          startIcon={<ChevronLeftIcon />}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Typography>
          {currentPage} / {TOTAL_PAGES}
        </Typography>

        <Button
          endIcon={<ChevronRightIcon />}
          onClick={handleNextPage}
          disabled={
            currentPage === TOTAL_PAGES
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentViewer;