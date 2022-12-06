import React from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
import SkillBlock from "../comps/SkillBlock/SkillBlock";
import SsDetails from '../comps/SsDetails/SsDetails';

const MyPage = () => {
  const storedSsDetails = useSelector(state => state.student.details);
  // const storedSkillList = useSelector(state => state.skill.list);
  const defaultSkillData = [
    {
      key: 0,
      copy: [],
    }
  ]
  const [ skillData, setSkillData ] = useState(defaultSkillData);

  const addSkillClickHandler = () => {
    const totalCurrentSkills = Object.keys(skillData).length;
    if (totalCurrentSkills) {
      const updatedSkillData = skillData.concat(
        {
          key: totalCurrentSkills,
          copy: []
        }
      );
      setSkillData(updatedSkillData);
    }
  }

  return (
    <div>
      <SsDetails />
      {
        (storedSsDetails.firstName || storedSsDetails.lastName) && storedSsDetails.gender
        && skillData.map((skill, i) => {
          // console.log('skill mapping', skill)
          return (
          <div key={i}>
            <SkillBlock
              studentDetails={storedSsDetails}
              skillIter={i}
              position={i}
              skillData={skillData}
              setSkillData={setSkillData}
            />
      
          </div>
        )})
      }
      <hr />
      <div>
        <Button
          onClick={() => addSkillClickHandler(true)}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
    // </div>
  );
}
 
export default MyPage;