import { createSlice } from '@reduxjs/toolkit'
import { initialSsId } from '../comps/SsDetails/reducers/studentDetailsSlice';

// listening: 'listening comprehension',
// verbal: 'verbal production',
// grammar: 'grammar',
// writing: 'writing',
// reading: 'reading'


const initialState = {
  bySsId: {
    [initialSsId]: {
      categoriesMap: {
        listening: 'Listening Comprehension',
        verbal: 'Verbal Production',
        grammar: 'Grammar Formation',
        writing: 'Writing Production',
        reading: 'Reading Ability',
        addNewCategory: 'ADD CUSTOM CATEGORY',
      },
      categoriesList: [
        'listening', 'verbal', 'grammar', 'writing', 'reading', 'addNewCategory'
      ],
      ssDetails: {
        isEditMode: true,
      },
    }
  }

}

function swapElements(arr, i1, i2) {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const { payload } = action;
      const { config, ssId } = payload;
      state.bySsId[ssId] = config;
    },
    deleteStudent: (state, action) => { // removes unneeded student record
      const { payload } = action;
      const { ssId } = payload;
      delete state.bySsId[ssId];
    },
    addCategory: (state, action) => {
      const { payload } = action;
      const { newCategory, ssId } = payload;
      console.log('addCategory', ssId, state.bySsId[ssId], state.bySsId[ssId].categoriesMap)
      state.bySsId[ssId].categoriesMap[newCategory] = newCategory,
      console.log('addCategory2', ssId, state.bySsId[ssId], state.bySsId[ssId].categoriesMap)
      

      state.bySsId[ssId].categoriesList.push(newCategory);

      // if a new category has been added, make addNewCategory first element
      if (state.bySsId[ssId].categoriesList.length === initialState.bySsId[ssId].categoriesList.length +1) {
        const newList = state.bySsId[ssId].categoriesList.filter(elem => elem !== 'addNewCategory');
        newList.unshift('addNewCategory');
        state.bySsId[ssId].categoriesList = newList;
      }
      
    },
    toggleSsDetailsEditMode: (state, action) => {
      const { payload = {} } = action;
      const { isEditMode, ssId } = payload; // optional payload
      // if (newEditModeState) { // use param if provided
      state.bySsId[ssId].ssDetails.isEditMode = isEditMode
      // } else { // otherwise, just toggle current state
      //   state.bySsId[ssId].ssDetails.isEditMode = !state.bySsId[ssId].ssDetails.isEditMode;
      // }

    }
  },
})

export const {
  addStudent,
  deleteStudent,
  addCategory,
  toggleSsDetailsEditMode,
} = appSlice.actions

export default appSlice.reducer