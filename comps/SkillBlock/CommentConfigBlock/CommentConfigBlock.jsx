import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import {
  Box,
  Container,
} from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { categories } from '../../../config';
import CategorySelector from './CategorySelector';
import StarRater from './StarRater';
import EditCategoryDialog from './EditCategoryDialog';
import {
  updateSkillCategory,
} from '../reducers/skillListSlice';
import {
  selectCategoriesMap,
  // selectCategoriesList,
  selectSkillInfo,
  selectCurrentStudent,
} from '../../../selectors';
import {
  setStepStatus
} from '../../../utils';

export default ({
  getComments,
  skillIter,
}) => {
  const dispatch = useDispatch();
  const [selectorExpanded, setSelectorExpanded] = useState(false);
  const [editCategoryAlertIsOpen, setEditCategoryAlertIsOpen] = useState(false);

  const { 
    category,
    rating: value,
    blockState: {
      configStep: { submitted: isConfigCommentSubmitted },
    },
  } = useSelector(state => selectSkillInfo(state, skillIter));
  const categoryMap = useSelector(selectCategoriesMap);
  const { ssId } = useSelector(selectCurrentStudent);

  const resetCategory = () => {
    setSelectorExpanded(true);
    dispatch(updateSkillCategory({
      skillId: `skill${skillIter}`,
      category: '',
      ssId,
    }))
  };


  const editButtonClickHandler = () => {
    setEditCategoryAlertIsOpen(true);
  }

  return (
    <div id="comment-config-block-container">
      {
        category !== ''
        ? (
          <Grid container spacing={2} direction="column" id="comment-config-block-selected-category-container">
            <Grid item xs={12} sx={{ }}>
              <Grid container spacing={2} direction="row" sx={{display:'relative'}}>
                <Grid item sx={{width: "90%"}}>

                  <Paper variant="outlined" sx={{margin: '5px', padding: "10px"}}>
                    <Typography variant='h5' >{categoryMap[category]}</Typography>
                  </Paper>


                  
                </Grid>
                <Grid item sx={{ width: '10%', display: 'relative'}}>
                  {!isConfigCommentSubmitted && <Button
                    sx={{display: 'absolute', left: '-40px'}}
                    onClick={resetCategory}
                  >
                    <EditIcon />
                  </Button>}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>

              <Grid container spacing={2} direction="row">
                <Grid item xs={7}>
                  <StarRater
                    skillIter={skillIter}
                  />
                </Grid>

                <Grid item xs={5}>
                  { // show correct button based upon if its first submission or editing
                    !isConfigCommentSubmitted
                    ? (
                      <Button
                        onClick={() => getComments(skillIter)}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        onClick={editButtonClickHandler}
                        variant="outlined"
                      >
                        edit
                      </Button>
                    )
                  }

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div id="comment-config-block-unselected-category-container">
            <CategorySelector
              selectedCategory={category}
              skillIter={skillIter}
              selectorExpanded={selectorExpanded}
            />
          </div>
        )
      }
      {
        editCategoryAlertIsOpen && (
          <EditCategoryDialog
            editCategoryAlertIsOpen={editCategoryAlertIsOpen}
            setEditCategoryAlertIsOpen={setEditCategoryAlertIsOpen}
            skillIter={skillIter}
          />
        )
      }
    </div>
  )
  
}