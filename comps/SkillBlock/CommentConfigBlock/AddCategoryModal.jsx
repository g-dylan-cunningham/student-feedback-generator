import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  FormControl,
  Stack,
  Snackbar,
  MuiAlert,
  Alert,
} from '@mui/material';
import {
  addCategory,
} from '../../../app/appSlice';
import {
  updateSkillCategory
} from '../reducers/skillListSlice';
import {
  selectCategoriesMap,
  selectCategoriesList,
  selectCurrentStudent,
} from '../../../selectors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddCategoryModal({
  isModalOpen,
  setIsModalOpen,
  skillIter,
}) {
  const dispatch = useDispatch();
  const currentCategoryList = useSelector(selectCategoriesList);
  const currentCategoryMap = useSelector(selectCategoriesMap);
  const { ssId } = useSelector(selectCurrentStudent);
  const [isSnackbarError, setIsSnackbarError] = useState(false);

  const handleClick = () => {
    setIsSnackbarError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCategory = formData.get('newCatory');
    if (!currentCategoryMap[newCategory] && !currentCategoryList.includes(newCategory)) {
      dispatch(addCategory({ // adds category to list and map in appSlice 
        newCategory,
        ssId,
      }));
      dispatch(updateSkillCategory({ // updates to new category in CategorySelector
        skillId: `skill${skillIter}`,
        category: newCategory,
        ssId,
      }))
      setIsModalOpen(false);
    } else {
      setIsSnackbarError(true)
    }

  

  }
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box
          sx={style}
          component="form"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add new skill
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="new-category"
                  name="newCatory"
                  label="Skill Name"
                  variant="outlined"
                  placeholder='add new category'
                />
              </Grid>
              
              <Grid item xs={12}>
                <Stack spacing={2} direction="row" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <Button
                    variant="contained"
                    type="submit"
                  >Confirm</Button>
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Modal>
      <Snackbar open={isSnackbarError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Please enter a unique category
        </Alert>
      </Snackbar>
    </div>
  );
}