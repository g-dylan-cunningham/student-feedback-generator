import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SsDisplayDetails from './SsDisplayDetails';
import SsFormDetails from './SsFormDetails';

const SsDetails = ({
  studentDetails, setStudentDetails
}) => {
  
  const [ isEditMode, setIsEditMode ] = useState(true);
  const toggleSetIsEditMode = () => setIsEditMode(!isEditMode);

  const storedSsDetails = useSelector(state => state.student.details);
  console.log('storedSsDetails', storedSsDetails);
  const isSsDetailsSet = useMemo(() => {
    console.log('memo')
    return Object.keys(storedSsDetails).length
  }, [storedSsDetails]);

  console.log(isSsDetailsSet, !isEditMode)
  return (
    <>
  {
    isSsDetailsSet && !isEditMode
    ? (
      <SsDisplayDetails
        // studentDetails={studentDetails}
        // setStudentDetails={setStudentDetails}
        toggleSetIsEditMode={toggleSetIsEditMode}
      />
    )
    : <SsFormDetails
        // setStudentDetails={setStudentDetails}
        // studentDetails={studentDetails}
        toggleSetIsEditMode={toggleSetIsEditMode}
      />
  }
    </>
  )
}
 
export default SsDetails;
