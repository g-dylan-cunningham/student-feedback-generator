import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Grid,
  // Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import { TooltipSpan } from './shared';
import {
  updateCurrentSsIndex,
} from './SsDetails/reducers/studentDetailsSlice';
import {
  selectCurrentStudentData,
  selectSsArrPosition,
} from '../selectors';
import {
  createSsWithSameSkills,
  toggleSsConfigState,
} from '../utils';


const SsStepper = ({
  children,
  isReportMode,
}) => {
  const dispatch = useDispatch();
  const ssPosition = useSelector(selectSsArrPosition);

  const handleCreateStudentClick = () => {
    dispatch(createSsWithSameSkills());
  };

  const handlePreviousClick = () => {
    dispatch(updateCurrentSsIndex({ indexShift: -1 }));
  };


  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row">
            
            <Grid item xs={1} id="leftButtons">
              <TooltipSpan title="Show Previous Student" disabled={!ssPosition.isPreviousSs}>
                  <IconButton
                    sx={{
                      margin: '8px 0px'
                    }}
                    disabled={!ssPosition.isPreviousSs}
                    onClick={handlePreviousClick}
                  >
                    <NavigateBeforeIcon
                      fontSize="large"
                      color={ssPosition.isPreviousSs ? "primary" : "disabled"}
                    />
                  </IconButton>
                </TooltipSpan>
            </Grid>
            <Grid item xs={10}>
              { children }
            </Grid>

            <Grid item xs={1} id="rightButtons">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >

                {
                  ssPosition.isNextSs || isReportMode ? ( // don't allow creation in report mode, just disable chevron
                    <TooltipSpan title="Show Next Student" disabled={!ssPosition.isNextSs}>
                      <IconButton
                        sx={{
                          margin: '8px 0px'
                        }}
                        disabled={!ssPosition.isNextSs}
                        onClick={() => dispatch(updateCurrentSsIndex({ indexShift: 1 }))}
                      >
                        <NavigateNextIcon
                          fontSize="large"
                          color={ssPosition.isNextSs ? "primary" : "disabled"}
                        />
                      </IconButton>
                    </TooltipSpan>
                  ) : (
                    <TooltipSpan title="Create New Student">
                      <IconButton
                        sx={{
                          margin: '8px 15px'
                        }}
                        // disabled
                        onClick={handleCreateStudentClick}
                      >
                        <AddCircleIcon
                          fontSize="large"
                          color="primary"
                        />
                      </IconButton>
                    </TooltipSpan>
                  )
                }
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
          >
          
            <span>Student {ssPosition.ssIndex + 1}/{ssPosition.totalSs}</span>
          </div>
        </Grid>
      </Grid>
  )
}

export default SsStepper;
