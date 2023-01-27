import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Button,
  Box,
  Grid,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import {
  deleteComment,
  updateSingleSkillComment,
  addComment,
} from '../reducers/skillListSlice';
import {
  selectCurrentStudent,
  selectSkillInfo,
  selectCurrentStudentData,
} from '../../../selectors';

const Sentence = ({
  elem = {},
  skillIter,
}) => {
  const dispatch = useDispatch();
  const { ssId } = useSelector(selectCurrentStudent);
  const {
    skillId,
    category,
    rating: skillRating,
    blockState: {
      configStep: { submitted: isConfigCommentSubmitted },
      feedbackEditStep,
    },
  } = useSelector(state => selectSkillInfo(state, skillIter));
  const studentDetails = useSelector(selectCurrentStudentData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(elem.sentence);

  const removeSentence = (e) => {
    e.preventDefault();
    dispatch(deleteComment({
      commentId: elem.commentId,
      skillId,
      ssId,
    }));
  };

  const getSingleComment = (increment) => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/api/getSingleComment',
        {
          method: 'POST',
          body: JSON.stringify({
            studentDetails,
            ...elem,
            rating: elem.rating + increment,
            category,
            // sentenceIter: elem.sentenceIter, // do we need?
            // commentIter: elem.commentIter,
            // commentId: elem.commentId,
          })
        }
      );
      const { newComment } = await data.json();

      dispatch(addComment({
        comment: newComment,
        skillId,
        ssId,
      }));
    }

    if (true /* thisCategory && rating*/) {
      fetchData();
    }
  }

  const editSentenceContent = () => {
    dispatch(updateSingleSkillComment({
      commentId: elem.commentId,
      skillId: `skill${skillIter}`,
      ssId,
      text,
    }));
    setIsEditMode(false);
  }

  
  return (
    <div
      draggable
      style={{ margin: '15px', padding: '15px', border: '1px solid grey', textAlign: 'center', cursor: 'move'}}
    >
      { !isEditMode ? (
          <Grid container direction="row">
            <Grid item md={2} sx={{display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
              <IconButton
                sx={{}}
                onClick={() => getSingleComment(1)}
                disabled={elem.rating >= 5}
                color="primary"
              >
                <KeyboardArrowUpIcon fontSize="large" />
              </IconButton>
                <Typography variant="p">
                Rating: {elem.rating} 
                </Typography>
                     
              <IconButton
                sx={{}}
                onClick={() => getSingleComment(-1)}
                disabled={elem.rating <= 1}
                color="primary"
              >
                <KeyboardArrowDownIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item md={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant="p">
                {elem.sentence}
              </Typography>
            </Grid>
            <Grid item md={1} sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
              <Tooltip>
                <IconButton
                  sx={{}}
                  onClick={()=> {setIsEditMode(true); setText(elem.sentence)}}
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip>
                <IconButton
                  sx={{}}
                  onClick={removeSentence}
                >
                  <CloseIcon color="primary" />
                </IconButton>
              </Tooltip>

            </Grid>
          </Grid>
        ) : (
          <Fragment>
            <textarea
              style={{ width: "100%" }}
              value={text}
              onChange={e=>setText(e.target.value)}
              rows={6}
            >
            </textarea>
            <Button
              variant="outline"
              onClick={() => setIsEditMode(false)}
            >Cancel</Button>
            <Button
              variant="contained"
              onClick={editSentenceContent}
            >Update</Button>
          </Fragment>
        )
      }
    </div>
  )
}

export default Sentence;
