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
import {
  updateCurrentSsIndex,
} from './reducers/studentDetailsSlice';
import {
  selectCurrentStudentData,
  selectSsArrPosition,
} from '../../selectors';
import {
  createSsWithSameSkills,
  toggleSsConfigState,
} from '../../utils';

const SsDisplayDetails = ({
  // toggleSetIsEditMode
}) => {
  const dispatch = useDispatch();
  const storedSsDetails = useSelector(selectCurrentStudentData);
  const ssPosition = useSelector(selectSsArrPosition)
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

  const handleCreateStudentClick = () => {
    // dispatch(toggleSsConfigState());
    dispatch(createSsWithSameSkills());
    
  }

  return (
    <div style={{ position: 'relative' }}>
      <Container>
        <Typography variant="h3" sx={{margin: '5px', padding: "10px", textAlign: 'center'}}>
          {studentName}
        </Typography>
      </Container>
      <Grid container direction="row">
        <Grid item xs={2} id="leftButtons">
          
          <Tooltip title="Show Previous Student">
              <IconButton
                sx={{
                  margin: '8px 0px'
                }}
                disabled={!ssPosition.isPreviousSs}
                onClick={() => dispatch(updateCurrentSsIndex({ indexShift: -1 }))}
              >
                <NavigateBeforeIcon
                  fontSize="large"
                  color={ssPosition.isPreviousSs ? "primary" : "disabled"}
                />
              </IconButton>
            </Tooltip>



        </Grid>
        <Grid item xs={4} id="nameDisplayFields">
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
        </Grid>
        <Grid item xs={2} id="rightButtons">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >

            <Button
              variant="contained"
                sx={{}}
              onClick={() => dispatch(toggleSsConfigState()) }
            >Edit
            </Button>

            {
              ssPosition.isNextSs ? (
                <Tooltip title="Show Next Student">
                  <IconButton
                    sx={{
                      margin: '8px 0px'
                    }}
                    // disabled
                    onClick={() => dispatch(updateCurrentSsIndex({ indexShift: 1 }))}
                  >
                    <NavigateNextIcon
                      fontSize="large"
                      color="primary"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Create New Student">
                  <IconButton
                    sx={{
                      margin: '8px 0px'
                    }}
                    // disabled
                    onClick={handleCreateStudentClick}
                  >
                    <AddCircleIcon
                      fontSize="large"
                      color="primary"
                    />
                  </IconButton>
                </Tooltip>
              )
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SsDisplayDetails;
