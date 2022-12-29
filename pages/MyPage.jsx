import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  Tooltip,
  IconButton,
  Grid,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import SkillBlock from "../comps/SkillBlock/SkillBlock";
import SsDetails from '../comps/SsDetails/SsDetails';
import { addSkill as addSkillAction } from '../comps/SkillBlock/reducers/skillListSlice';
import {
  selectOrderedSkills,
  selectCurrentStudentData,
} from '../selectors';


const MyPage = () => {
  const dispatch = useDispatch();
  const storedSsDetails = useSelector(selectCurrentStudentData);
  const skillList = useSelector(state => selectOrderedSkills(state));


  /* adds new skill category when user clicks plus icon */
  const addEmptySkillBlock = ({ skillList }) => {
    const totalCurrentSkills = skillList.length;
    if (totalCurrentSkills) {
      const newEmptySkill = {
        skillId: `skill${totalCurrentSkills}`,
        category: '',
        rating: 5,
        blockState: {
          configStep: {
            submitted: false,
          },
          feedbackEditStep: {
            submitted: false,
          }
        },
        ssId: storedSsDetails.ssId
      }
      dispatch(addSkillAction(newEmptySkill));
    }
  }

  return (
    <div>
      <SsDetails />

      {
        (storedSsDetails.firstName || storedSsDetails.lastName) && storedSsDetails.ageGroup
        && skillList.map((skill, i) => {
          // console.log('skill mapping', skill)
          return (
          <div key={i}>
            <SkillBlock
              studentDetails={storedSsDetails}
              skillIter={i}
              skillList={skillList}
            />
      
          </div>
        )})
      }

      <hr style={{ margin: "20px" }}/>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Tooltip title="Add new assessment category">
            <IconButton
              sx={{ padding: "25px 30px" }}
              onClick={() => addEmptySkillBlock({ skillList })}
            >
              <AddIcon fontSize="large"/>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Show student results page">
            <Link
              href={{
                pathname: '/Report',
                // query: { ssId: storedSsDetails.ssId },
              }}
            >Report
            </Link>
            {/* <IconButton
              sx={{ padding: "25px 30px" }}
              onClick={() => addEmptySkillBlock({ skillList })}
            >
              <AddIcon fontSize="large"/>
            </IconButton> */}
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}
 
export default MyPage;