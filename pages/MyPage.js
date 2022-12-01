import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
import { uuid } from 'uuidv4';
import SkillBlock from "../comps/SkillBlock/SkillBlock";
import SsDetails from '../comps/StudentDetails';

const MyPage = () => {
  const [ studentDetails, setStudentDetails ] = useState({});
  const defaultSkillData = [
    {
      // studentDetails,
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
          // studentDetails,
          key: totalCurrentSkills,
          copy: []
        }
        // <SkillBlock
        //   studentDetails={studentDetails}
        //   key={totalCurrentSkills}
        // />
      );
      setSkillData(updatedSkillData);
    }
  }

  // console.log('studentd', studentDetails)
  return (
    <div>
      <SsDetails
        studentDetails={studentDetails}
        setStudentDetails={setStudentDetails}
      />
      {
        (studentDetails.firstName || studentDetails.lastName) && studentDetails.gender
        && skillData.map((skill, i) => {
          // console.log('skill mapping', skill)
          return (
          <div key={i}>
            <SkillBlock
              studentDetails={studentDetails}
              id={i}
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