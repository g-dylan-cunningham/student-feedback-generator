import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
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
      {/* <SsIndexContext.Provider value={SsIndexContext}> */}
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
        
        <div>
          <Button
            onClick={() => addEmptySkillBlock({ skillList })}
          >
            <AddIcon />
          </Button>
        </div>
      {/* </SsIndexContext.Provider> */}
    </div>
  );
}
 
export default MyPage;