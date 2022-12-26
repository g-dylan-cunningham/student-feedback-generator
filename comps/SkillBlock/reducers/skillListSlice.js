import { createSlice } from '@reduxjs/toolkit';
import { initialSsId } from '../../SsDetails/reducers/studentDetailsSlice';

const initialState = {
  bySsId: {

    [initialSsId]: {

      skills: {
        byId: {
          skill0: {
            skillId: 'skill0',
            category: '',
            rating: 5,
            blockState: {
              configStep: {
                submitted: false,
              },
              feedbackEditStep: {
                submitted: false,
              }
            },
            ssId: initialSsId,
          },
        },
        allIds: ['skill0'],
      },
    
      comments: {
        bySkillId: {
          skill0: {
            byCommentId: {},
            allIds: [],
            finalized: '',
          },
        },
      }
    }
  }
}

export const detailsSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    updateSkillsBlockState: (state, action) => {
      const { payload } = action;
      const { skillId, stepName, isSubmitted, ssId } = payload;
      state.bySsId[ssId].skills.byId[skillId].blockState[stepName].submitted = isSubmitted;
    },
    addSkill: (state, action) => {
      const { payload } = action;
      const { skillId, ssId } = payload;
      state.bySsId[ssId].skills.byId[skillId] = action.payload;
      state.bySsId[ssId].skills.allIds.push(skillId);
      state.bySsId[ssId].comments.bySkillId[skillId] = {
        byCommentId: {},
        allIds: [],
      }
    },
    copySkills: (state, action) => {
      const { payload } = action;
      const { ssId, skills } = payload;

      // must create schema in new ssId property to prepare for loop
      state.bySsId[ssId] = {
        skills: { byId: {}, allIds: [] },
        comments: { bySkillId: {} },
       };

      skills.forEach(skill => {
        // add skills intact
        state.bySsId[ssId].skills.byId[skill.skillId] = skill;
        state.bySsId[ssId].skills.allIds.push(skill.skillId)

        // add comments as empty
        state.bySsId[ssId].comments.bySkillId[skill.skillId] = {
          byCommentId: {},
          allIds: [],
          finalized: '',
        };

      })
      
    },
    updateSkillCategory: (state, action) => {
      const { payload } = action;
      const { skillId, category, ssId } = payload;
      state.bySsId[ssId].skills.byId[skillId] = { ...state.bySsId[ssId].skills.byId[skillId], category };
    },
    updateSkillRating: (state, action) => {
      const { payload } = action;
      const { skillId, rating, ssId } = payload;
      state.bySsId[ssId].skills.byId[skillId] = { ...state.bySsId[ssId].skills.byId[skillId], rating };
    },
    addComments: (state, action) => { // Array: comments (supports one or multiple)
      const { payload } = action;
      const { comments, ssId } = payload;
      try {
        for (let i = 0; i < comments.length; i++) {
          const { commentId, skillId, sentence, sentenceIter, isVisible } = comments[i];
          state.bySsId[ssId].comments.bySkillId[skillId].byCommentId[commentId] = {
            sentence: sentence,
            sentenceIter,
            commentId,
            isVisible, 
          };
          state.bySsId[ssId].comments.bySkillId[skillId].allIds.push(commentId);
        }

      } catch (e) {
        console.error('there was an error in addComments action in skillListSlice', e);
      }
    },
    deleteComment: (state, action) => { // delete one comment from a skill
      const { payload } = action;
      const { skillId, commentId, ssId } = payload;
      delete state.bySsId[ssId].comments.bySkillId[skillId].byCommentId[commentId];
      const array = state.bySsId[ssId].comments.bySkillId[skillId].allIds;
      const index = array.indexOf(commentId);
      if (index > -1) { // only splice array when item is found
        state.bySsId[ssId].comments.bySkillId[skillId].allIds.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    deleteSingleSkillComments: (state, action) => { // delete all comments from a skill
      const { payload } = action;
      const { ssId, skillIter } = payload;
      state.bySsId[ssId].skills.allIds.forEach(skillId => {
        if (skillId === `skill${skillIter}`) {
          state.bySsId[ssId].comments.bySkillId[skillId].byCommentId = {};
          state.bySsId[ssId].comments.bySkillId[skillId].allIds = [];
        }

      }) 
    },
    deleteAllComments: (state, action) => { // delete all comments 
      const { payload } = action;
      const { ssId } = payload;
      state.bySsId[ssId].skills.allIds.forEach(skillId => {
        state.bySsId[ssId].comments.bySkillId[skillId].byCommentId = {};
        state.bySsId[ssId].comments.bySkillId[skillId].allIds = [];
      }) 
    },
    updateSingleSkillComment: (state, action) => { // delete one comment from a skill
      const { payload } = action;
      const { skillId, commentId, ssId, text } = payload;
      state.bySsId[ssId].comments.bySkillId[skillId].byCommentId[commentId].sentence = text;
    },
    increaseVisibleComments: (state, action) => {
      const { payload } = action;
      const {
        skillIter,
        // numberToShow = 3,
        ssId,
      } = payload;
      const allCommentsList = state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].allIds;
      const allCommentsById = state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].byCommentId;
      let additionalCommentsToShow = 3;
      allCommentsList.forEach(commentId => {
        const currentComment = allCommentsById[commentId];
        if (!currentComment.isVisible && additionalCommentsToShow) {
          currentComment.isVisible = true;
          additionalCommentsToShow = additionalCommentsToShow - 1;
        }
      })
    },
    finalizeComments: (state, action) => {
      const { payload } = action;
      const { skillIter, ssId } = payload;

      const allCommentsList = state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].allIds;
      const allCommentsById = state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].byCommentId;
     
      state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].finalized = ''; // reset comments
      
      allCommentsList.forEach((commentId, i) => {
        const space = i ? " " : ""; // don't put space on first sentence
        if (allCommentsById[commentId].isVisible) {
          state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].finalized += (space + allCommentsById[commentId].sentence);
        }
      });
    },
    reorderComments: (state, action) => {
      const { payload } = action;
      const {
        skillIter,
        dragItem,
        dragOverItem,
        ssId,
      } = payload;


      const allCommentsList = [ ...state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].allIds ];

      function swapElements(arr, i1, i2) {
        [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
      }

      const dragIndex = allCommentsList.findIndex(item => item === dragItem);
      const dragOverIndex = allCommentsList.findIndex(item => item === dragOverItem);
      swapElements(allCommentsList, dragIndex, dragOverIndex);
      state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].allIds = allCommentsList

    },
    setTextArea: (state, action) => {
      const { payload } = action;
      const {
        value,
        skillIter,
        ssId,
      } = payload;
      state.bySsId[ssId].comments.bySkillId[`skill${skillIter}`].finalized = value;
    },
    deleteStudent: (state, action) => { // removes unneeded student record
      const { payload } = action;
      const { ssId } = payload;
      delete state.bySsId[ssId];
    },
  },
})

export const {
  updateSkillsBlockState,
  addSkill,
  copySkills,
  updateSkillCategory,
  updateSkillRating,
  addComments,
  deleteComment,
  deleteSingleSkillComments,
  deleteAllComments,
  updateSingleSkillComment,
  increaseVisibleComments,
  finalizeComments,
  reorderComments,
  setTextArea,
  deleteStudent,
} = detailsSlice.actions

export default detailsSlice.reducer