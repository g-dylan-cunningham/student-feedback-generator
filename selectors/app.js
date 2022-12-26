import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentStudent } from './students';
import { selectConfiguredSkillsList } from './skills'

const appData = state => state.app;
const currentStudent = createSelector( // { ssId, ssIdx }
  selectCurrentStudent,
  curSs => curSs
)

const selectCategoriesMap = createSelector(
  [
    appData,
    currentStudent,
  ],
  (app, curSs) => app.bySsId[curSs.ssId].categoriesMap
);

const selectCategoriesList = createSelector(
  [
    appData,
    currentStudent,
  ],
  (app, curSs) => app.bySsId[curSs.ssId].categoriesList
);

const selectRemainingSkills = createSelector(
  [
    selectConfiguredSkillsList,
    selectCategoriesList,
  ],
  (configuredSkillsList, currentSkillList) => {

    function removeItemOnce(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
    const reducedSkillsList = [ ...currentSkillList ];
    for ( let i = 0; i <= configuredSkillsList.length - 1; i++ ) {
      removeItemOnce(reducedSkillsList, configuredSkillsList[i]);
    }
    return reducedSkillsList;
  }
);

const selectSsDetails = createSelector(
  [
    appData,
    currentStudent,
  ],
  (app, curSs) => app.bySsId[curSs.ssId].ssDetails
);
const selectIsEditMode = createSelector(
  selectSsDetails,
  ssDetails => ssDetails.isEditMode || false
);


// const selectCurrentSsData = createSelector([
//   selectCurrentStudent, selectFeedback
// ], (curSs, feedback) => {
//   return feedback.bySsId[curSs.ssId] || {};
// });

export {
  selectCategoriesMap,
  selectCategoriesList,
  selectRemainingSkills,
  selectIsEditMode,
}
