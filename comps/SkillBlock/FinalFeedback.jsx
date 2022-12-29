import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  TextField,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  UndoSharp as UndoIcon,
} from '@mui/icons-material';
import styles from './FinalFeedback.module.css';
import {
  selectFinalFeedbackForSkill,
  selectCurrentStudent,
} from '../../selectors';
import {
  setTextArea,
  updateSkillsBlockState,
} from './reducers/skillListSlice';


const FinalFeedback = ({ skillIter }) => {
  const dispatch = useDispatch();

  const [isShowIcons, setIsShowIcons ] = useState(false);

  const finalFeedback = useSelector(state => selectFinalFeedbackForSkill(state, skillIter) || ' ');
  const { ssId } = useSelector(selectCurrentStudent);

  const getRowNumber = () => {
    const computed = Math.round(finalFeedback.length / window.innerWidth * 15);
    if (computed < 5) {
      return 5;
    } else if (computed > 20) {
      return 20;
    }
    return computed;
  }

  const handleCopyContentClick = async () => {
    await navigator.clipboard.writeText(finalFeedback);
  }
  const handleDeleteCopyClick = () => {
    dispatch(setTextArea({
      value: '',
      skillIter,
      ssId,
    }));
  }

  const goBackToFeedbackItemBlock = () => {
    console.log('goBackToFeedbackItemBlock')
    dispatch(updateSkillsBlockState(
      {
        skillId: `skill${skillIter}`,
        stepName: 'feedbackEditStep',
        isSubmitted: false,
        ssId,
      }
    ));
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': {
          m: 1, width: '25ch',
        },
        padding: '0px 20px',
      }}
    >
      <div
        id='final-feedback-component'
        style={{
          height: '100%'
        }}
        onMouseEnter={e => {
          setIsShowIcons(true);
      }}
        onMouseLeave={e => {
          setIsShowIcons(false);
        }}
      >
    
        <div
          id='header-container'
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'left',
              // alignItems: 'center'
            }}
          >
            <Tooltip
              title="Go back to configure each comment"
            >
              <IconButton
                sx={{
                  margin: '8px 0px'
                }}
                onClick={goBackToFeedbackItemBlock}
              >
                <UndoIcon color="primary"/>
              </IconButton>
            </Tooltip>
            <Typography variant='h5' sx={{ margin: '8px' }}>Student Feedback</Typography>

          </div>

          {
            isShowIcons && (
              <div
                className={styles.fadeIn}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  animation: 'fadeIn 5s'
                }}
              >
                <Tooltip title="Copy Text">
                  <IconButton
                    sx={{
                      margin: '8px 0px'
                    }}
                    onClick={handleCopyContentClick}
                  >
                    <ContentCopyIcon/>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Clear text">
                  <IconButton
                    sx={{
                      margin: '8px 8px'
                      }}
                      onClick={handleDeleteCopyClick}
                      >
                    <DeleteIcon/>
                  </IconButton>
                </Tooltip>

              </div>
            )
          }
        </div>

        <textarea
          value={finalFeedback}
          rows={getRowNumber()}
          style={{
            padding: "10px",
            width: '100%',
          }}
          onChange={e => dispatch(setTextArea({ value: e.target.value, skillIter, ssId }))}
        >
          <Typography variant='h5' sx={{ margin: '8px' }}>Student Feedback</Typography>
        </textarea>
      </div>
    </Box>
  );
}
 
export default FinalFeedback;