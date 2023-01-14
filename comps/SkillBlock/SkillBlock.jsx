import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import {
  Box,
  Container,
} from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import FinalFeedback from './FinalFeedback';
import FeedbackItemBlock from './FeedbackItemBlock';
import CommentConfigBlock from './CommentConfigBlock';
import {
  addComments,
  deleteSingleSkillComments,
  updateSkillsBlockState,
} from './reducers/skillListSlice';
import {
  selectSkillInfo,
  selectCurrentStudent,
} from '../../selectors'

const SkillBlock = ({
  studentDetails,
  skillList,
  skillIter
}) => {
  const dispatch = useDispatch();
  const { rating,
    blockState: {
      configStep,
      feedbackEditStep,
    },
  } = useSelector(state => selectSkillInfo(state, skillIter));
  const { ssId } = useSelector(selectCurrentStudent);

  const thisSkill = skillList[skillIter];
  const { category: thisCategory } = thisSkill;

  // api call for copy
  const getComments = (skillI) => {
    dispatch(deleteSingleSkillComments({ ssId, skillIter: skillI }));
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/api/verbiage',
        {
          method: 'POST',
          body: JSON.stringify({
            studentDetails,
            rating: rating,
            category: thisCategory,
          })
        }
      );
      const { copy } = await data.json();
      const enhancedCopy = copy.map((item, i) => {
        // console.log('item', item)
        return {
          ...item,
          skillId: `skill${skillIter}`,
          sentenceIter: i // this could cause problems
        }
      })
      dispatch(addComments({
        comments: enhancedCopy,
        ssId,
      }));
      dispatch(updateSkillsBlockState({
        skillId: `skill${skillIter}`,
        stepName: 'configStep',
        isSubmitted: true,
        ssId,
      }));
      dispatch(updateSkillsBlockState({
        skillId: `skill${skillIter}`,
        stepName: 'feedbackEditStep',
        isSubmitted: false,
        ssId,
      }));
    }
  
    // call the function
    if (thisCategory && rating) {
      fetchData();
    }
  }



  return (
    <div>
      <hr style={{ margin: "20px" }}/>
      <Grid container spacing={0} direction="row" style={{ margin: "0px", padding: "0px 20px" }}>

        <Grid item xs={2}>          
          {true && <CommentConfigBlock
              skillIter={skillIter}
              getComments={getComments}
          />}
        </Grid>

        
        {configStep.submitted && !feedbackEditStep.submitted && (
          <Grid item xs={10}>
            <FeedbackItemBlock
              // setCopy={setThisSkillCopy}
              skillIter={skillIter}
            />
            </Grid>
        )}
        

        
        {configStep.submitted && feedbackEditStep.submitted && (
          <Grid item xs={10}>
            <FinalFeedback
              skillIter={skillIter}
            />
          </Grid>
        )}
        

        <Button
          onClick={() => console.log('clicked')}
          sx={{
            right: '0px',
            top: '0px',
            position: 'absolute'
          }}
        >
          <DeleteIcon />
        </Button>
      </Grid>
    </div>
  );
}
 
export default SkillBlock;