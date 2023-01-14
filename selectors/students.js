import { createSelector } from '@reduxjs/toolkit';

const selectStudentsById = state => state.student.byId;
const selectStudentsAllIds = state => state.student.allIds;
const selectStudentsIndex = state => state.student.currentIndex;


const selectCurrentStudentData = createSelector(
  [
    selectStudentsById,
    selectStudentsAllIds,
    selectStudentsIndex
  ], (ssMap, ssList, ssIndex) => {
    return ssMap[ssList[ssIndex]];
  },
)

const selectCurrentStudent = createSelector(
  [
    selectStudentsAllIds,
    selectStudentsIndex
  ], (ssList, ssIndex) => {
    return {
      ssIdx: ssIndex,
      ssId: ssList[ssIndex],
    }
  }
);

const selectSsArrPosition = createSelector(
  [
    selectStudentsAllIds,
    selectStudentsIndex
  ], (ssList, ssIndex) => {

    return {
      isNextSs: ssIndex + 1 !== ssList.length,
      isPreviousSs: ssIndex !== 0,
      totalSs: ssList.length,
      ssIndex,
    }
  }
);

const selectStudentById = createSelector(
  [
    selectStudentsById,
    (state, currentSsId) => currentSsId
  ],
  (ssMap, ssId) => ssMap[ssId]
);

const selectAllStudentsList = createSelector(
  [
    selectStudentsAllIds,
    selectStudentsById,
  ], (allIds, byId) => {
    return allIds.map(id => byId[id]);
  } 
)


export {
  selectCurrentStudent,
  selectCurrentStudentData,
  selectSsArrPosition,
  selectStudentById,
  selectAllStudentsList,
}
