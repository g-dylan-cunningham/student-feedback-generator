import { configureStore } from '@reduxjs/toolkit'
import studentDetailsReducer from './reducers/studentDetailsSlice';

export const store = configureStore({
  reducer: {
    student: studentDetailsReducer
  },
});

