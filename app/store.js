import { configureStore } from '@reduxjs/toolkit'
import studentDetailsReducer from '../comps/SsDetails/reducers/studentDetailsSlice';
import skillListReducer from '../comps/SkillBlock/reducers/skillListSlice';
import appReducer from './appSlice';


export const store = configureStore({
  reducer: {
    student: studentDetailsReducer,
    feedback: skillListReducer,
    app: appReducer,
  },
});

