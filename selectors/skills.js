import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentStudent } from './students';

// const selectSsId = state => state.student.byId.ssId;
const selectFeedback = state => state.feedback;


const selectCurrentSsData = createSelector(
  [
    selectCurrentStudent,
    selectFeedback,
  ],
  (curSs, feedback) => {
  return feedback.bySsId[curSs.ssId] || {};
});



const selectSkillsData = createSelector(selectCurrentSsData, ssData => ssData.skills || {});
const selectCommentsData = createSelector(selectCurrentSsData, ssData => ssData.comments || {});
// const selectCommentsData = state => state.feedback.comments;

const selectConfiguredSkillsList = createSelector(
  [selectSkillsData],
  (ssSkills) => {
    let arr = [];
    for (const skill in ssSkills.byId) {
      arr.push(ssSkills.byId[skill].category);
    }
    return arr;
  }
)


const selectOrderedSkills = createSelector(selectSkillsData, skills => {
  const { byId, allIds } = skills;
  return allIds.map(key => {
    return byId[key];
  });
});

const selectAllCommentsForSkill = createSelector(
  [
    selectCommentsData,
    (state, currentSkilli) => `skill${currentSkilli}`,
  ],
  (allComments, currentSkillId) => {
    
    const commentsInCurrentSkill = allComments.bySkillId[currentSkillId] || {};
    const currentComments = commentsInCurrentSkill.allIds || [];
    return currentComments.map((commentId) => {
      return commentsInCurrentSkill.byCommentId[commentId];
    });
  }
);

const selectVisibleCommentsForSkill = createSelector( // do we need or useMemo?
  [
    selectAllCommentsForSkill,
  ],
  (comments) => {
    return comments.filter((comment) => {
      return comment.isVisible;
    });
  }
);

const selectFinalFeedbackForSkill = createSelector(
  [
    selectCommentsData,
    (state, currentSkilli) => `skill${currentSkilli}`,
  ],
  (allComments, currentSkillId) => {
    return allComments.bySkillId[currentSkillId].finalized;
  }
);

const selectSkillInfo = createSelector(
  [
    selectSkillsData,
    (state, currentSkilli) => `skill${currentSkilli}`,
  ],
  (allSkills, currentSkillId) => {
    
    return allSkills.byId[currentSkillId] || {};
  }
);


export {
  selectConfiguredSkillsList,
  selectOrderedSkills,
  selectAllCommentsForSkill,
  selectVisibleCommentsForSkill,  
  selectFinalFeedbackForSkill,
  selectSkillInfo,
  // selectSkillsBlockState,
};
