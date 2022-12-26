import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { deleteComment, updateSingleSkillComment } from '../reducers/skillListSlice';
import {
  selectCurrentStudent,
} from '../../../selectors';

const Sentence = ({
  elem = {},
  skillIter,
}) => {
  const dispatch = useDispatch();
  const { ssId } = useSelector(selectCurrentStudent);

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(elem.sentence);

  const removeSentence = (e) => {
    e.preventDefault();
    dispatch(deleteComment({
      commentId: elem.commentId,
      skillId: `skill${skillIter}`,
      ssId,
    }));
  };

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
          <Fragment>
            <div
              style={{
                display: 'absolute',
                float: 'right'
              }}
            >
              <Tooltip>
                <IconButton
                  sx={{}}
                  onClick={()=> setIsEditMode(true)}
                >
                  <EditIcon/>
                </IconButton>
              </Tooltip>
              <Tooltip>
                <IconButton
                  sx={{}}
                  onClick={removeSentence}
                >
                  <CloseIcon/>
                </IconButton>
              </Tooltip>
            </div>
            {elem.sentence}
          </Fragment>
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
