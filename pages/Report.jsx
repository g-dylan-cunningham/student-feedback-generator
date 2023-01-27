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
  selectSsArrPosition,
  selectAllSsReportInfo,
  selectCurrentStudent
} from '../selectors';

const Report = ({

}) => {
  const ssReportInfo = useSelector(selectAllSsReportInfo);
  const { ssIdx } = useSelector(selectCurrentStudent);
  const ssPosition = useSelector(selectSsArrPosition);
  const ssInfo = ssReportInfo[ssIdx];

  return (
    <Fragment>
      
      <SsStepper isReportMode>
        <Grid container justifyContent="center" mt={5}>
          <Grid item>
            <Typography variant="h4">{ssInfo.ssName}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" mt={2}>
            
          <Grid item xs={0} md={5} id="reportSsDetailOffset" /> {/** offset only */}
          <Grid item xs={2} id="reportSsDetailStepperDisplay">
            <Grid container justifyContent="center">
              <Grid item>
                <span>Student {ssPosition.ssIndex + 1}/{ssPosition.totalSs}</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} md={5}>
            <Grid container justifyContent="right">
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
          </Grid>
        </Grid>
      </SsStepper>
   
      <Grid container direction="column" spacing={3} p={3}>
        <Grid item>
          <Divider sx={{ mb: 5 }} />
          <Grid container direction="row" justifyContent="space-between">

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
