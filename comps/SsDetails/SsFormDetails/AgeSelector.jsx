import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AgeSelector = ({ currentAge = 'child' }) => {
  return (
    <div>
      <FormLabel id="age-label">Age Group</FormLabel>
        <RadioGroup
          aria-labelledby="age-label"
          name="ageGroup"
          defaultValue={currentAge}
        >
          <FormControlLabel value="child" control={<Radio />} label="Child"/>
          <FormControlLabel value="teen" control={<Radio />} label="Teen"/>
          <FormControlLabel value="adult" control={<Radio />} label="Adult" />
      </RadioGroup>
    </div>
  );
}
 
export default AgeSelector;