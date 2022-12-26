import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from '../StudentDetails.module.css';
import { Typography } from '@mui/material';
import { updateStudent } from '../../../comps/SsDetails/reducers/studentDetailsSlice';
import {
  selectCurrentStudentData,
  // selectCurrentStudent,
} from '../../../selectors';
import {
  deleteStudentById,
  toggleSsConfigState,
} from '../../../utils';
import {
  // toggleSsDetailsEditMode,
} from '../../../app/appSlice';
import GenderSelector from './GenderSelector';
import AgeSelector from './AgeSelector';
import VoiceSelector from './VoiceSelector';

const SsFormDetails = ({
}) => {
  const dispatch = useDispatch();
  const storedSsDetails = useSelector(selectCurrentStudentData);
  const [nameFields, setNameFields] = useState({ // used to derive if button is disabled
    firstName: storedSsDetails && storedSsDetails.firstName,
    lastName: storedSsDetails && storedSsDetails.lastName
  });
  const handleSetNameFields = (e) => {
    setNameFields({...nameFields, ...{ [e.target.name]: e.target.value}})
  }
  const isDisabled = useMemo(() => {
    return !nameFields.firstName || !nameFields.lastName
  }, [nameFields]);
  const [namePref, setNamePref] = useState({ namePreference: '', voice: '', honorific: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { namePreference, voice, honorific } = namePref;
    dispatch(updateStudent({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      gender: formData.get('gender'), // male female other
      ageGroup: formData.get('ageGroup'), // child, teen, adult
      namePreference, // firstName, lastName, mixed
      voice, // firstPerson, thirdPerson
      honorific,  // Mr. Ms etc
      ssId: storedSsDetails.ssId
    }));

    // setStudentDetails(storedObj);
    dispatch(toggleSsConfigState());
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteStudentById({ssId: storedSsDetails.ssId}))
  }

  return (
    <div
      id='studentDetailsComp'
      style={{
        display: 'flex',
        padding: '15px',
        justifyContent: 'center'
      }}
    >
      <Box
        component="form"
        sx={{
          width: '100%',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        id='studentDetails'
      >
          <FormControl
            className={styles.formColumnContainer}
            name="student-details"
            onChange={handleSetNameFields}
          >
            <Grid container spacing={10} columns={{ xs: 2, md: 12 }}>
              <Grid item xs={12} md={4}>
                <div className={styles.nameTextInputWrapper}>
                  <TextField
                    id="ss-first-name"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    defaultValue={storedSsDetails && storedSsDetails.firstName}
                    className={styles.nameTextInput}
                    required
                  />
                  <TextField
                    id="ss-last-name"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    defaultValue={storedSsDetails && storedSsDetails.lastName}
                    className={styles.nameTextInput}
                    required
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Grid container spacing={10} columns={{ xs: 4, md: 12 }}>
                  <Grid item xs={6} md={3}>
                    <GenderSelector
                      currentGender={storedSsDetails && storedSsDetails.gender}
                      // setGenderField={setGenderField}
                      // genderField={genderField}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <AgeSelector currentAge={storedSsDetails && storedSsDetails.ageGroup}/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <VoiceSelector
                      namePref={namePref}
                      nameFields={nameFields}
                      setNamePref={setNamePref}
                      storedSsDetails={storedSsDetails}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  spacing={2}
                  sx={{ width: 'auto', height: 'auto' }}
                >
                  <Button
                      variant="outlined"
                      onClick={handleDeleteButtonClick}
                      disabled={isDisabled}
                    >Delete</Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isDisabled}
                  >Confirm</Button>
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        
      </Box>
    </div>
  );
}

export default SsFormDetails;
