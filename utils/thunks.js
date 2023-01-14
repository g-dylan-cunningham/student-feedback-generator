import { v4 as uuid } from 'uuid';
import { createSelector } from '@reduxjs/toolkit';
import {
  addStudent as addStudentConfig,
  deleteStudent as deleteStudentConfig,
  toggleSsDetailsEditMode,
} from '../app/appSlice';
import {
  addStudent,
  deleteStudent as deleteStudentDetails,
  updateCurrentSsIndex,
} from '../comps/SsDetails/reducers/studentDetailsSlice';
import {
  copySkills,
  deleteStudent as deleteStudentSkills,
  updateSkillsBlockState,
} from '../comps/SkillBlock/reducers/skillListSlice';
import {
  selectConfiguredSkillsList,
  selectRemainingSkills,
  selectCurrentStudent,
  selectOrderedSkills,
  selectSsArrPosition,
  selectCategoriesList,
} from '../selectors';


function getObjKey(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}

// Thunks
const setStepStatus = ({skillIter, isSubmitted, stepName, ssId }) => (dispatch) => {
  dispatch(updateSkillsBlockState({
    skillId: `skill${skillIter}`,
    stepName, //  'configStep' 'feedbackEditStep'
    isSubmitted, // boolean
    ssId,
  }));
};



const createSsWithSameSkills = () => (dispatch, getState) => {
  const state = getState();
  const { ssId, ssIdx } = selectCurrentStudent(state);
  const newSsId = uuid();
  const existingSkills = selectOrderedSkills(state);

  const remainingSkillsList = selectRemainingSkills(state);
  console.log('remainingSkillsList', remainingSkillsList, existingSkills)


  const defaultSkills = existingSkills.map((skill, i) => {
    return {
      blockState: {
        configStep: {submitted: false},
        feedbackEditStep: {submitted: false},
      },
      category: skill.category,
      rating: 5,
      skillId: skill.skillId, //`skill${i}`.
      ssId,
    }
  })

  dispatch(copySkills({
    ssId: newSsId,
    skills: defaultSkills,
  }));

  dispatch(addStudent({ ssId: newSsId }));

  const defaultConfig = {
    categoriesMap: state.app.bySsId[ssId].categoriesMap,
    categoriesList: remainingSkillsList,
    ssDetails: {
      isEditMode: true,
    },
  };

  dispatch(addStudentConfig({
    ssId: newSsId,
    config: defaultConfig,
  }));


  dispatch(updateCurrentSsIndex({ indexShift: 1 }));

};

const deleteStudentById = ({ ssId }) => (dispatch, getState) => {
  const state = getState();
  // if there are no other students, do nothing (hide button)

  // derive best next ssIndex
  const { isNextSs, isPreviousSs } = selectSsArrPosition(state);
  if (isPreviousSs) {
    dispatch(updateCurrentSsIndex({ indexShift: -1 }));
  } else if (isNextSs) {
    dispatch(updateCurrentSsIndex({ indexShift: 1 }));
  } else {
    return;
  }

  // clean up the deleted student from each reducer
  dispatch(deleteStudentDetails({ ssId }));
  dispatch(deleteStudentConfig({ ssId }));
  dispatch(deleteStudentSkills({ ssId }));
}

const toggleSsConfigState = ({ isEditMode } = {} ) => (dispatch, getState) => {
  const state = getState();
  const { ssId } = selectCurrentStudent(state);

  if (isEditMode) { // use param if provided
    dispatch(toggleSsDetailsEditMode({ ssId, isEditMode }));
  } else { // otherwise, just toggle current state
    dispatch(toggleSsDetailsEditMode({
      ssId,
      isEditMode: !state.app.bySsId[ssId].ssDetails.isEditMode,
    }));
  }
}

export {
  setStepStatus,
  createSsWithSameSkills,
  deleteStudentById,
  toggleSsConfigState,
}