import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { ratingLabels } from '../../../config';
import {
  updateSkillRating,
} from '../reducers/skillListSlice';
import {
  selectSkillInfo,
  selectCurrentStudent,
} from '../../../selectors'

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${ratingLabels[value]}`;
}

export default function StarRater({
  skillIter
}) {
  const dispatch = useDispatch();
  const {
    category,
    rating: value,
    blockState: {
      configStep: { submitted: isConfigCommentSubmitted },
      feedbackEditStep,
    },
  } = useSelector(state => selectSkillInfo(state, skillIter));
  const { ssId } = useSelector(selectCurrentStudent);

  const setValue = (value) => {
    dispatch(updateSkillRating({
      skillId: `skill${skillIter}`,
      // category: ''
      rating: value,
      ssId,
    }))
  };
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: '130px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Rating
        disabled={!category || isConfigCommentSubmitted}
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{}}>{ratingLabels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
