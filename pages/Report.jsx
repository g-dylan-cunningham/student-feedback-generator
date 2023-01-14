import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Grid,
  Box,
  Toolbar,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Container,
  Tooltip,
  IconButton,
} from '@mui/material';
import SsStepper from '../comps/SsStepper';
import {
  selectCurrentSsReportInfo,
  selectAllSsReportInfo,
  selectCurrentStudent
} from '../selectors';

const Report = ({

}) => {
  const ssReportInfo = useSelector(selectAllSsReportInfo);
  const { ssIdx } = useSelector(selectCurrentStudent);
  console.log('ssRportInfo', ssReportInfo, ssReportInfo[ssIdx]);
  const ssInfo = ssReportInfo[ssIdx];

  return (
    <Fragment>
      
      <SsStepper isReportMode>
        {/* <Typography variant="h6">Student </Typography> */}
      </SsStepper>
   
      <Grid container direction="column" spacing={3} p={3}>
        <Grid item>
          <Divider sx={{ mt: 5, mb: 5 }} />
          <Grid container direction="row" justifyContent="space-between">

            <Grid item>
              <Typography variant="h5">{ssInfo.ssName}</Typography>
            </Grid>

            <Grid item>
              <Tooltip title="Show student results page">
                <Link
                  href={{
                    pathname: '/MyPage',
                  }}
                >
                  <Button variant="contained" type="primary">Edit Student Comments</Button>
                </Link>
              </Tooltip>
            </Grid>

          </Grid>
          <Grid container direction="column">
            {
              ssInfo.skills.map(skill => (
                <Grid item key={skill.skillId}>
                  <Box ml={1}>
                    <Typography sx={{ textTransform: 'uppercase' }} variant="h6">{skill.category}</Typography>
                    <Typography variant="p">{skill.finalized}</Typography>
                  </Box>
                </Grid>
              ))
            }
          </Grid>

        </Grid>

        <Grid item>
          <Tooltip title="Open Students report PDF">
            <Link
              href={{
                pathname: '/Pdf',
                // query: { ssId: storedSsDetails.ssId },
              }}
            >
              <Button variant="contained" type="primary">Open Report PDF</Button>
            </Link>
          </Tooltip>
        </Grid>
      </Grid>


    </Fragment>
  )
};

export default Report;
