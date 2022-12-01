import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styles from './StudentDetails.module.css';
import { Typography } from '@mui/material';

const StudentDetailForm = ({
  setStudentDetails
}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStudentDetails({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      gender: data.get('gender')
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        // margin: '0 auto'
        justifyContent: 'center'
      }}
    >

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

        
          <FormControl
            className={styles.formColumnContainer}
            name="gender"
          >
            <span className={styles.formColumn}>
              <div className={styles.nameTextInputWrapper}>
                <TextField
                  id="ss-first-name"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  // value={ssFName}
                  // onChange={(e) => setSsFName(e.target.value)}
                  className={styles.nameTextInput}
                />
                <TextField
                  id="ss-last-name"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  className={styles.nameTextInput}
                />
              </div>
            </span>
            <span className={styles.formColumn}>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-label"
                name="gender"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female"/>
                <FormControlLabel value="male" control={<Radio />} label="Male"/>
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                <FormControlLabel value="firstPerson" control={<Radio />} label="First Person" />
              </RadioGroup>
            </span>
            <span className={styles.formColumn} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
              <Stack spacing={2} direction="row">
                <Button variant="contained" sx={{}} type="submit">Confirm</Button>
              </Stack>
            </span>
          </FormControl>
        
      </Box>
    </div>
  );
}

const pronounMap = {
  male: {
    pronoun: 'he',
    possessive: 'his',
    object: 'him',
    possesivePronoun: 'his'
  },
  female: {
    pronoun: 'she',
    possessive: 'her',
    object: 'her',
    possesivePronoun: 'hers'
  },
  other: {
    pronoun: 'they',
    possessive: 'their',
    object: 'them',
    possesivePronoun: 'theirs'
  },
  firstPerson: {
    pronoun: 'you',
    possessive: 'your',
    object: 'you',
    possesivePronoun: 'yours'
  },
}

const PronounList = ({ gender }) => {
  if (!gender) {
    return <></>
  }
  return (
    <span>
      {
        `${pronounMap[gender].pronoun} / ${pronounMap[gender].object} / ${pronounMap[gender].possessive}`
      }
    </span>
  )
}

const SsDetails = ({
  studentDetails, setStudentDetails
}) => {
  return (
    <>
  {
    Object.keys(studentDetails).length
    ? (
      <Typography variant='h3' mb={3}>
        <span>{studentDetails.firstName} - </span>
        <PronounList gender={studentDetails.gender}/>
      </Typography>
    )
    : <StudentDetailForm setStudentDetails={setStudentDetails} />
  }
    </>
  )
}
 
export default SsDetails;