import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PronounList from './PronounList';
import { Container } from '@mui/system';
import {
  Paper,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import SsStepper from '../SsStepper';
import {
  updateCurrentSsIndex,
} from './reducers/studentDetailsSlice';
import {
  selectCurrentStudentData,
} from '../../selectors';
import {
  createSsWithSameSkills,
  toggleSsConfigState,
} from '../../utils';

const SsDisplayDetails = ({

}) => {
  const dispatch = useDispatch();
  const storedSsDetails = useSelector(selectCurrentStudentData);

  const {
    firstName,
    lastName,
    gender, // male female other
    // ageGroup, // child, teen, adult
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
      <SsStepper>
        <Grid container>
          <Grid item xs={6} id="nameDisplayFields">
            <Grid container direction="column">

              <Grid item xs={6} id="firstNameDisplayField">
                <Grid container direction="row">
                  <Grid item>
                    <Typography sx={{margin: '5px', padding: "10px"}}>
                      First Name:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Paper variant="outlined" sx={{margin: '5px', padding: "10px"}}>
                      <Typography>{firstName}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item id="lastNameDisplayField">
                <Grid container direction="row">
                  <Grid item>
                    <Typography sx={{margin: '5px', padding: "10px"}}>
                      Last Name:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Paper variant="outlined" sx={{margin: '5px', padding: "10px"}}>
                      <Typography>{lastName}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} id="pronounDisplayFields">
            <Typography variant='h6' mb={3}>
              <PronounList gender={gender} voice={voice}/>
            </Typography>
            <Button
              variant="contained"
                sx={{}}
              onClick={() => dispatch(toggleSsConfigState()) }
            >Edit
            </Button>
          </Grid>
        </Grid>
      </SsStepper>
    </div>
  );
}

export default SsDisplayDetails;
