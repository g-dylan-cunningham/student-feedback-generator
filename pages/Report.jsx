import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Button,
  Typography,
  Tooltip,
  Grid,
} from '@mui/material';
import SsStepper from '../comps/SsStepper';
import {
  selectStudentById,
  selectCurrentStudentData,
  // selectSkillsData,
  selectReportDetails,
  selectConfiguredSkillsList,
  // selectOrderedSkills,
} from '../selectors';

const Report = ({

}) => {
  const ssDetails = useSelector(selectCurrentStudentData);
  const ssSkills = useSelector(selectReportDetails);

  const {
    firstName,
    lastName,
  } = ssDetails;
  return (
    <Fragment>
      
      <SsStepper isReportMode>
        {/* <Typography variant="h6">Student </Typography> */}
      </SsStepper>

      <Typography variant="h3">{firstName} {lastName}</Typography>
      <Grid container direction="column" spacing={3} p={3}>
      {
        ssSkills.map(skill => (
          <Grid item>
            <Typography variant="h5">{skill.skillName}</Typography>
            <Typography variant="p1">{skill.finalized}</Typography>
          </Grid>
        ))
      }
      </Grid>

      <Tooltip title="Show student results page">
        <Link
          href={{
            pathname: '/MyPage',
            // query: { ssId: storedSsDetails.ssId },
          }}
        >
          <Button variant="contained" type="primary">Edit Student Comments</Button>
        </Link>
      </Tooltip>
    </Fragment>
  )
};

export default Report;
