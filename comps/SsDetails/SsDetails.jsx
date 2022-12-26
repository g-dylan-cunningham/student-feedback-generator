import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SsDisplayDetails from './SsDisplayDetails';
import SsFormDetails from './SsFormDetails';
import {
  selectCurrentStudentData,
  selectIsEditMode,
} from '../../selectors';

const SsDetails = ({
  studentDetails, setStudentDetails
}) => {
  const isEditMode = useSelector(selectIsEditMode);
  const storedSsDetails = useSelector(selectCurrentStudentData);
  const isSsDetailsSet = useMemo(() => {
    return Object.keys(storedSsDetails).length
  }, [storedSsDetails]);

  return (
    <>
  {
    isSsDetailsSet && !isEditMode
    ? (
      <SsDisplayDetails />
    )
    : <SsFormDetails />
  }
    </>
  )
}
 
export default SsDetails;
