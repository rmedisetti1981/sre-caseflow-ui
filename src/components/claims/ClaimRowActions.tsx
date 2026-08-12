import { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import {
  useAssignClaimMutation,
  useDeleteClaimMutation,
  useUpdateClaimMutation,
} from '../../state/server/endpoints/claimsApi';

import type {
  Claim,
  ClaimStatus,
} from '../../features/claims/claim.types';

interface ClaimRowActionsProps {
  claim: Claim;
}

const AGENTS = [
  'Agent 1001',
  'Agent 1002',
  'Agent 1003',
  'Agent 1004',
  'Agent 1005',
];

const ClaimRowActions = ({
  claim,
}: ClaimRowActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [customerName, setCustomerName] =
    useState(claim.customerName);

  const [claimStatus, setClaimStatus] =
    useState<ClaimStatus>(claim.status);

  const [assignedTo, setAssignedTo] =
    useState(claim.assignedTo ?? '');

  const [
    updateClaim,
    {
      isLoading: isUpdating,
    },
  ] = useUpdateClaimMutation();

  const [
    assignClaim,
    {
      isLoading: isAssigning,
    },
  ] = useAssignClaimMutation();

  const [
    deleteClaim,
    {
      isLoading: isDeleting,
    },
  ] = useDeleteClaimMutation();

  const handleEdit = async () => {
    await updateClaim({
      id: claim.id,
      data: {
        customerName,
        status: claimStatus,
      },
    }).unwrap();

    setEditOpen(false);
  };

  const handleAssign = async () => {
    if (!assignedTo) {
      return;
    }

    await assignClaim({
      id: claim.id,
      assignedTo,
    }).unwrap();

    setAssignOpen(false);
  };

  const handleDelete = async () => {
    await deleteClaim(claim.id).unwrap();

    setDeleteOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Button
          size="small"
          title="Edit claim"
          onClick={() => {
            setCustomerName(claim.customerName);
            setClaimStatus(claim.status);
            setEditOpen(true);
          }}
        >
          <EditIcon fontSize="small" />
        </Button>

        <Button
          size="small"
          title="Assign claim"
          onClick={() => {
            setAssignedTo(
              claim.assignedTo ?? '',
            );
            setAssignOpen(true);
          }}
        >
          <AssignmentIndIcon fontSize="small" />
        </Button>

        <Button
          size="small"
          color="error"
          title="Delete claim"
          onClick={() => {
            setDeleteOpen(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </Box>

      {/* Edit Claim Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => {
          if (!isUpdating) {
            setEditOpen(false);
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Edit Claim
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Claim Number"
              value={claim.claimNumber}
              disabled
              fullWidth
            />

            <TextField
              label="Customer Name"
              value={customerName}
              onChange={(event) => {
                setCustomerName(
                  event.target.value,
                );
              }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>
                Status
              </InputLabel>

              <Select
                value={claimStatus}
                label="Status"
                onChange={(event) => {
                  setClaimStatus(
                    event.target.value as ClaimStatus,
                  );
                }}
              >
                <MenuItem value="OPEN">
                  Open
                </MenuItem>

                <MenuItem value="IN_REVIEW">
                  In Review
                </MenuItem>

                <MenuItem value="APPROVED">
                  Approved
                </MenuItem>

                <MenuItem value="REJECTED">
                  Rejected
                </MenuItem>

                <MenuItem value="CLOSED">
                  Closed
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setEditOpen(false);
            }}
            disabled={isUpdating}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleEdit}
            disabled={
              isUpdating ||
              !customerName.trim()
            }
          >
            {isUpdating
              ? 'Saving...'
              : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Claim Dialog */}
      <Dialog
        open={assignOpen}
        onClose={() => {
          if (!isAssigning) {
            setAssignOpen(false);
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Assign Claim
        </DialogTitle>

        <DialogContent>
          <FormControl
            fullWidth
            sx={{ mt: 1 }}
          >
            <InputLabel>
              Agent
            </InputLabel>

            <Select
              value={assignedTo}
              label="Agent"
              onChange={(event) => {
                setAssignedTo(
                  event.target.value,
                );
              }}
            >
              {AGENTS.map((agent) => (
                <MenuItem
                  key={agent}
                  value={agent}
                >
                  {agent}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setAssignOpen(false);
            }}
            disabled={isAssigning}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAssign}
            disabled={
              isAssigning ||
              !assignedTo
            }
          >
            {isAssigning
              ? 'Assigning...'
              : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteOpen}
        onClose={() => {
          if (!isDeleting) {
            setDeleteOpen(false);
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Delete Claim
        </DialogTitle>

        <DialogContent>
          Are you sure you want to delete claim{' '}
          <strong>
            {claim.claimNumber}
          </strong>
          ?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setDeleteOpen(false);
            }}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting
              ? 'Deleting...'
              : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClaimRowActions;