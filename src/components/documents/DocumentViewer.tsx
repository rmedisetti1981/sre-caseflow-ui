import { useState } from 'react';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  TextField
} from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface DocumentViewerProps {
  documentId: string;
  fileName: string;
  pageCount: number;
  fileSize: number;
}

interface PageComment {
  id: string;
  pageNumber: number;
  text: string;
  createdAt: string;
}

const DocumentViewer = ({
  documentId,
  fileName,
  pageCount,
  fileSize,
}: DocumentViewerProps) => {

  const [currentPage, setCurrentPage] = useState(1);

  const [comments, setComments] = useState<PageComment[]>([]);
  const [commentText, setCommentText] = useState('');

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [pageError, setPageError] = useState('');  

  const [zoom, setZoom] = useState(100);

  const [operation, setOperation] = useState<
  'EDIT' | 'SPLIT' | 'MERGE' | 'DELETE' | null
>(null);

    const [operationMessage, setOperationMessage] = useState('');
  
    const loadPage = async (page: number) => {
    setIsLoadingPage(true);
    setPageError('');

    try {
      // Simulate an API request for a single page.
      // In production this would call:
      // GET /documents/{documentId}/pages/{page}

      await new Promise((resolve) =>
        setTimeout(resolve, 500),
      );

      setCurrentPage(page);
    } catch (error) {
      console.error(
        'Failed to load document page:',
        error,
      );

      setPageError(
        'Unable to load this page. Please try again.',
      );
    } finally {
      setIsLoadingPage(false);
    }
  };

    const handlePreviousPage = () => {
        if (currentPage > 1 && !isLoadingPage) {
            loadPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (
            currentPage < pageCount &&
            !isLoadingPage
        ) {
            loadPage(currentPage + 1);
        }
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
  
    const handleOperation = async (
    selectedOperation:
        | 'EDIT'
        | 'SPLIT'
        | 'MERGE'
        | 'DELETE',
    ) => {
    setOperation(selectedOperation);
    setOperationMessage('');

    try {
        // Simulate a long-running backend operation.
        //
        // Production:
        // POST /documents/{documentId}/operations
        //
        // The backend would return an operation/job ID
        // and process the document asynchronously.

        await new Promise((resolve) =>
        setTimeout(resolve, 1000),
        );

        setOperationMessage(
        `${selectedOperation} operation completed successfully.`,
        );
    } catch (error) {
        console.error(
        `Failed to execute ${selectedOperation}:`,
        error,
        );

        setOperationMessage(
        `Unable to complete ${selectedOperation.toLowerCase()} operation. Please try again.`,
        );
    } finally {
        setOperation(null);
    }
    };

    const handleAddComment = () => {
        const text = commentText.trim();

        if (!text) {
            return;
        }

        const newComment: PageComment = {
            id: crypto.randomUUID(),
            pageNumber: currentPage,
            text,
            createdAt: new Date().toISOString(),
        };

        setComments((previousComments) => [
            ...previousComments,
            newComment,
        ]);

        setCommentText('');
    };

    const currentPageComments = comments.filter(
        (comment) => comment.pageNumber === currentPage,
    );

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
            {fileName}
            </Typography>

            <Typography
            variant="body2"
            color="text.secondary"
            >
            Document ID: {documentId}
            </Typography>

            <Typography
            variant="body2"
            color="text.secondary"
            >
            {pageCount} pages •{' '}
            {(fileSize / (1024 * 1024)).toFixed(0)} MB
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
            disabled={currentPage === 1 || isLoadingPage}
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
            Page {currentPage} / {pageCount}
          </Typography>

          <IconButton
            onClick={handleNextPage}
            disabled={
              currentPage === pageCount || isLoadingPage
            }
            aria-label="Next page"
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Document operations */}
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
        }}
        >
        <Button
            size="small"
            variant="outlined"
            disabled={operation !== null}
            onClick={() =>
            handleOperation('EDIT')
            }
        >
            Edit
        </Button>

        <Button
            size="small"
            variant="outlined"
            disabled={operation !== null}
            onClick={() =>
            handleOperation('SPLIT')
            }
        >
            Split
        </Button>

        <Button
            size="small"
            variant="outlined"
            disabled={operation !== null}
            onClick={() =>
            handleOperation('MERGE')
            }
        >
            Merge
        </Button>

        <Button
            size="small"
            color="error"
            variant="outlined"
            disabled={operation !== null}
            onClick={() =>
            handleOperation('DELETE')
            }
        >
            Delete
        </Button>
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

        {operation && (
        <Box
            sx={{
            px: 2,
            py: 1,
            backgroundColor: '#fff3cd',
            }}
        >
            <Typography variant="body2">
            Processing {operation.toLowerCase()} operation...
            </Typography>
        </Box>
        )}

        {operationMessage && (
        <Box
            sx={{
            px: 2,
            py: 1,
            }}
        >
            <Typography
            variant="body2"
            color="text.secondary"
            >
            {operationMessage}
            </Typography>
        </Box>
        )}

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

        {isLoadingPage ? (
        <Typography color="text.secondary">
            Loading page {currentPage}...
        </Typography>
        ) : pageError ? (
        <Box sx={{ textAlign: 'center' }}>
            <Typography color="error">
            {pageError}
            </Typography>

            <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => loadPage(currentPage)}
            >
            Retry
            </Button>
        </Box>
        ) : (
        <Typography>
            Document content will be rendered
            here.
        </Typography>
        )}
        </Box>
      </Box>

      <Box
  sx={{
    borderTop: '1px solid #ddd',
    p: 2,
  }}
>
  <Typography variant="h6">
    Page Comments
  </Typography>

  <TextField
    fullWidth
    multiline
    minRows={2}
    placeholder="Add a comment for this page..."
    value={commentText}
    onChange={(event) =>
      setCommentText(event.target.value)
    }
    sx={{ mt: 1 }}
  />

  <Button
    variant="contained"
    sx={{ mt: 1 }}
    onClick={handleAddComment}
    disabled={!commentText.trim()}
  >
    Add Comment
  </Button>

    <Box sx={{ mt: 2 }}>
        {currentPageComments.length === 0 ? (
        <Typography color="text.secondary">
            No comments for this page.
        </Typography>
        ) : (
        currentPageComments.map((comment) => (
            <Box
            key={comment.id}
            sx={{
                mb: 1,
                p: 1.5,
                border: '1px solid #ddd',
                borderRadius: 1,
            }}
            >
            <Typography>
                {comment.text}
            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
            >
                Page {comment.pageNumber}
            </Typography>
            </Box>
        ))
        )}
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
          disabled={currentPage === 1 || isLoadingPage}
        >
          Previous
        </Button>

        <Typography>
          {currentPage} / {pageCount}
        </Typography>

        <Button
          endIcon={<ChevronRightIcon />}
          onClick={handleNextPage}
          disabled={
            currentPage === pageCount || isLoadingPage
          }
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentViewer;