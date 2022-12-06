import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { update } from '../../../app/reducers/studentDetailsSlice';


export default function GenderSelector({
  currentGender,
  // genderField,
  // setGenderField
}) {
  const dispatch = useDispatch();
  const updateGenderInStore = (e) => {
    dispatch(update({
      gender: e.target.value, // male female other
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
          <FormControlLabel value="male" onClick={()=> console.log('click1')} control={
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
