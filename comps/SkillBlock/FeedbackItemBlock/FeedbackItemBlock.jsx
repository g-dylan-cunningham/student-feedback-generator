import React, { useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  selectAllCommentsForSkill,
  selectCurrentStudent,
} from '../../../selectors';
import {
  increaseVisibleComments,
  finalizeComments,
  reorderComments,
  updateSkillsBlockState,
  } from '../reducers/skillListSlice';
import Sentence from './Sentence';

const FeedbackItemBlock = ({
  skillIter
}) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => selectAllCommentsForSkill(state, skillIter)) || [];
  const { ssId } = useSelector(selectCurrentStudent);

  const visibleComments = useMemo(() => {
    return comments.filter((comment) => {
      return comment.isVisible;
    });
  }, [comments]);

  // vanilla dnd implementation - https://www.youtube.com/watch?v=CYKDtVZr_Jw&t=902s
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // hides the finalized comments because there has been an edit to feedback items
  const setFeedbackEditStepStatus = (bool) => {
    dispatch(updateSkillsBlockState({
      skillId: `skill${skillIter}`,
      stepName: 'feedbackEditStep',
      isSubmitted: bool,
      ssId,
    }));
  }

  const handleShowMoreCommentsClick = () => {
    dispatch(increaseVisibleComments({ skillIter, ssId }));
    setFeedbackEditStepStatus(false);
  }

  const handleFinalizeCommentsClick = () => {
    dispatch(finalizeComments({ skillIter, ssId }));
    setFeedbackEditStepStatus(true);
  }

  // sort sentence elements with drag and drop
  const handleSort = () => {
    dispatch(reorderComments({
      skillIter,
      dragItem: dragItem.current,
      dragOverItem: dragOverItem.current,
      ssId,
    }));
    setFeedbackEditStepStatus(false);
    // reset position ref
    dragItem.current = null;
    dragOverItem.current = null;
  }


  return (
    <div id="feedback-item-block-container">
      <Box
        sx={{
          '& .MuiTextField-root': {
            m: 1, width: '25ch',
          },
        }}
      >
      <Grid container direction="column">
        <Grid item>
          {
            visibleComments.map((elem, i) => {
              return  (
                <div
                  key={i}
                  onDragStart={(e) => dragItem.current=elem.commentId}  //  {(e) => onDragStart(e, i)}
                  onDragEnter={(e) => dragOverItem.current=elem.commentId} // {(e) => onDragEnter(e, i)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Sentence
                    elem={elem}
                    skillIter={skillIter}
                  />
                </div>
              );
            })
          }
        </Grid>
        <Grid item>
          <Grid container direction="row" id="feedbackItemBlockButtonContainer" spacing={3}
            sx={{
              justifyContent: 'flex-end',
              padding: '15px',
            }}
          >
            {
              comments.length > visibleComments.length && (
                <Grid item>
                  <Button
                    variant="text"
                    onClick={handleShowMoreCommentsClick}
                  >Show More</Button>
                </Grid>
              )
            }
            {
              visibleComments.length && (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleFinalizeCommentsClick}
                  >Get Text</Button>
                </Grid>
              )
            }
          </Grid>
        </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default FeedbackItemBlock;
