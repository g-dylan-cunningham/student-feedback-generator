import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box,
  TextField,
  Grid,
  FormControl,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import styles from '../StudentDetails.module.css';
import {
  updateStudent,
} from '../../../comps/SsDetails/reducers/studentDetailsSlice';
import {
  selectCurrentStudentData,
  selectCurrentClass,
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
  const currentSs = useSelector(selectCurrentStudentData);
  const currentClass = useSelector(selectCurrentClass);
  const [nameFields, setNameFields] = useState({ // used to derive if button is disabled
    firstName: currentSs && currentSs.firstName,
    lastName: currentSs && currentSs.lastName
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
      ssId: currentSs.ssId,
      classId: currentClass
    }));

    // setStudentDetails(storedObj);
    dispatch(toggleSsConfigState());
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteStudentById({ssId: currentSs.ssId}))
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
            <Grid container spacing={5} columns={{ xs: 2, md: 12 }}>
              <Grid item xs={12} md={4}>
                <div className={styles.nameTextInputWrapper}>
                  <TextField
                    id="ss-first-name"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    defaultValue={currentSs && currentSs.firstName}
                    className={styles.nameTextInput}
                    required
                  />
                  <TextField
                    id="ss-last-name"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    defaultValue={currentSs && currentSs.lastName}
                    className={styles.nameTextInput}
                    required
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={7}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} id="genderAndAgeContainer">

                    <Grid container direction='row'>

                      <Grid item xs={6} sm={6} md={6}>
                        <GenderSelector currentGender={currentSs && currentSs.gender} />
                      </Grid>

                      <Grid item xs={6} sm={6} md={6}>
                        <AgeSelector currentAge={currentSs && currentSs.ageGroup} />
                      </Grid>

                    </Grid>
                  </Grid>



                  <Grid item xs={12} md={6}>
                    <VoiceSelector
                      namePref={namePref}
                      nameFields={nameFields}
                      setNamePref={setNamePref}
                      currentSs={currentSs}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={1}>
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
