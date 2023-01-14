import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentStudent, selectAllStudentsList } from './students';

// const selectSsId = state => state.student.byId.ssId;
const selectFeedback = state => state.feedback;
const selectStudent = state => state.student;

const selectAllSsReportInfo = createSelector(
  [
    selectAllStudentsList,
    selectFeedback,
    selectStudent,
  ],
  (ssList, feedbackData, studentData) => {
    return ssList.map(({ssId}) => {
      const feedback = feedbackData.bySsId[ssId];
      const student = studentData.byId[ssId];
      return {
        ssName: student.firstName + " " + student.lastName,
        ssId,
        skills: feedback.skills.allIds.map(skillId => {
          const { category, rating } = feedback.skills.byId[skillId];
          const { finalized } = feedback.comments.bySkillId[skillId];
          return {
            category,
            skillId,
            rating,
            finalized,
          }
        })
      }
    });
  }
);

const selectCurrentSsReportInfo = ( // delete?
  [
    selectAllSsReportInfo,
    selectCurrentStudent,
  ],
  (reportInfo, currentStudent) => {
    const idx = (currentStudent && currentStudent.ssIdx) || 0;
    return reportInfo[idx];
  }
);

const selectDataBySs = createSelector(
  [
    (state, ssId) => ssId,
    selectFeedback,
    selectStudent,
  ],
  (ssId, feedback, student) => {
    return {
      feedback: feedback.bySsId[ssId] || {},
      student: student.byId[ssId] || {},
    };
  }
);

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


const selectReportDetails = createSelector( // for current student
  [
    selectSkillsData,
    selectCommentsData,
  ],
  (
    skills,
    comments
  ) => {
    const { byId: skillsById, allIds: skillsAllIds} = skills;

    const res = skillsAllIds.map(skillId => {

      return {
        finalized: comments.bySkillId[skillId].finalized,
        skillName: skillsById[skillId].category
      };
    })
    return res;
  }
);

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
  selectAllSsReportInfo,
  selectCurrentSsReportInfo,
  selectReportDetails,
  selectConfiguredSkillsList,
  selectOrderedSkills,
  selectAllCommentsForSkill,
  selectVisibleCommentsForSkill,  
  selectFinalFeedbackForSkill,
  selectSkillInfo,
};
