import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { updateStudent } from '../../../comps/SsDetails/reducers/studentDetailsSlice';
import {
  selectCurrentStudent,
} from '../../../selectors';

export default function GenderSelector({
  currentGender = 'female',
}) {
  const dispatch = useDispatch();
  const { ssId } = useSelector(selectCurrentStudent);
  const updateGenderInStore = (e) => {
    dispatch(updateStudent({
      gender: e.target.value, // male female other
      id: ssId,
    }))
  }
  return (
    <div>
      <FormLabel id="gender-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="gender-label"
        name="gender"
        defaultValue={currentGender}
        onChange={updateGenderInStore}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female"/>
        <FormControlLabel value="male" control={
          <Radio
            // onClick={()=> console.log('click')}
          />
        } label="Male"/>
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        {/* <FormControlLabel value="firstPerson" control={<Radio />} label="First Person" /> */}
      </RadioGroup>
    </div>
  );
}
