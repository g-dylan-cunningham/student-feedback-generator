import { createSlice } from '@reduxjs/toolkit'
import { uuid } from 'uuidv4';

export const initialSsId = uuid();
const initialState = {
  currentIndex: 0,
  byId: {
    [initialSsId]: {
      gender: 'male',
      firstName: 'Byson',
      lastName: 'Cunningham',
      ssId: initialSsId,
    }
  },
  allIds: [
    initialSsId
  ],
}

export const detailsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      const { payload } = action;
      state.byId[payload.ssId] = { ...state.byId[payload.ssId], ...payload };

      // state.details = { ...state.details, ...action.payload }
    },
    addStudent: (state, action) => {
      const { payload } = action;
      const { ssId } = payload;
      state.byId[ssId] = { ...payload, ssId };
      state.allIds.push(ssId);
      // state.currentIndex = state.allIds.indexOf(ssId);
    },
    deleteStudent: (state, action) => {
      const { payload } = action;
      const { ssId } = payload;
      delete state.byId[ssId];
      state.allIds = state.allIds.filter(curId => curId !== ssId);
    },
    updateCurrentSsIndex: (state, action) => {
      const { payload } = action;
      const { indexShift } = payload;
      state.currentIndex = state.currentIndex + indexShift;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  updateStudent,
  addStudent,
  deleteStudent,
  updateCurrentSsIndex,
} = detailsSlice.actions

export default detailsSlice.reducer