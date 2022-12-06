import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { ratingLabels } from '../../config';


function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${ratingLabels[value]}`;
}

export default function StarRater({
  value,
  setValue,
  category
}) {
  
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        disabled={!category}
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
        <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
