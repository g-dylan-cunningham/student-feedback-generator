// import { createSelector } from '@reduxjs/toolkit';
import {
  selectCategoriesMap,
  selectCategoriesList,
  selectRemainingSkills,
  selectIsEditMode,
} from './app';

import {
  selectConfiguredSkillsList,
  selectOrderedSkills,
  selectAllCommentsForSkill,
  selectVisibleCommentsForSkill,  
  selectFinalFeedbackForSkill,
  selectSkillInfo,
  // selectSkillsBlockState,
} from './skills';

import {
  selectCurrentStudent,
  selectCurrentStudentData,
  selectSsArrPosition,
} from './students';



// const appData = state => state.app;
// const selectSkillsData = state => state.feedback.skills;
// const selectCommentsData = state => state.feedback.comments;



export {
  // app
  selectCategoriesMap,
  selectCategoriesList,
  selectRemainingSkills,
  selectIsEditMode,

  // skills
  selectConfiguredSkillsList,
  selectOrderedSkills,
  selectAllCommentsForSkill,
  selectVisibleCommentsForSkill,  
  selectFinalFeedbackForSkill,
  selectSkillInfo,

  // students
  selectCurrentStudent,
  selectCurrentStudentData,
  selectSsArrPosition,


}