import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  setStepStatus,
} from '../../../utils';
import {
  selectCurrentStudent,
} from '../../../selectors'

export default function AlertDialog({
  editCategoryAlertIsOpen,
  setEditCategoryAlertIsOpen,
  skillIter,
}) {
  const dispatch = useDispatch();
  const { ssId } = useSelector(selectCurrentStudent);

  const handleAgreeClick = () => {
    dispatch(setStepStatus({
      skillIter,
      stepName: 'configStep', //  'configStep' 'feedbackEditStep'
      isSubmitted: false, // boolean
      ssId,
    }));
    dispatch(setStepStatus({
      skillIter,
      stepName: 'feedbackEditStep', //  'configStep' 'feedbackEditStep'
      isSubmitted: false, // boolean
      ssId,
    }));
    setEditCategoryAlertIsOpen(false);
  }

  return (
    <div>
      <Dialog
        open={editCategoryAlertIsOpen}
        onClose={() => setEditCategoryAlertIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changing student rating or skill category will result is losing the comments generated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCategoryAlertIsOpen(false)}>No</Button>
          <Button onClick={handleAgreeClick} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}