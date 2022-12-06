import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PronounList from './PronounList';
import { Container } from '@mui/system';
import {
  Paper,
  Typography,
  Grid,
  // Checkbox,
  // FormControlLabel,
  // FormGroup,
  FormControl,
  Button
} from '@mui/material';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';

const SsDisplayDetails = ({
  toggleSetIsEditMode
}) => {
  const storedSsDetails = useSelector(state => state.student.details);
  const {
    firstName,
    lastName,
    gender, // male female other
    ageGroup, // child, teen, adult
    namePreference, // firstName, lastName, mixed
    voice, // firstPerson, thirdPerson
    honorific  // Mr. Ms etc
  } = storedSsDetails;

  const studentName = useMemo(() => {
    if (namePreference === 'firstName') {
      return firstName;
    } else if (namePreference === 'lastName') {
      return honorific + " " + lastName;
    } else {
      return `${firstName} / ${honorific} ${lastName}`;
    }
  }, [storedSsDetails]);

  return (
    <div style={{ position: 'relative' }}>
      <Container>
        <Typography variant="h3" sx={{margin: '5px', padding: "10px", textAlign: 'center'}}>
          {studentName}
        </Typography>
      </Container>
      <Grid container direction="row">
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item xs={6}>
              <Grid container direction="row">
                <Grid item>
                  <Typography sx={{margin: '5px', padding: "10px"}}>
                    First Name:
                  </Typography>
                </Grid>
                <Grid item>
                  <Paper variant="outlined" sx={{margin: '5px', padding: "10px"}}>
                    <Typography>{storedSsDetails.firstName}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <Typography sx={{margin: '5px', padding: "10px"}}>
                    Last Name:
                  </Typography>
                </Grid>
                <Grid item>
                  <Paper variant="outlined" sx={{margin: '5px', padding: "10px"}}>
                    <Typography>{storedSsDetails.lastName}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="row">
                <Grid item xs={6}>
                  <Typography variant='h6' mb={3}>
                    <PronounList gender={storedSsDetails.gender} voice={storedSsDetails.voice}/>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                      sx={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '50px',
                      }}
                    onClick={() => { toggleSetIsEditMode() }}
                  >Edit</Button>
                </Grid>
              </Grid>
            </Grid>
        </Grid>
    </div>
  );
}

export default SsDisplayDetails;
