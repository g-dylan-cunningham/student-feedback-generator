import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateSkillCategory } from '../reducers/skillListSlice';
import AddNewCategoryModal from './AddCategoryModal';
import {
  selectCategoriesMap,
  // selectCategoriesList,
  selectRemainingSkills,
  selectCurrentStudent,
} from '../../../selectors';


const CategorySelector = ({
  selectedCategory,
  skillIter,
  selectorExpanded,
}) => {
  const dispatch = useDispatch();
  const categoryMap = useSelector(selectCategoriesMap);
  const categoryList = useSelector(selectRemainingSkills);
  const { ssId } = useSelector(selectCurrentStudent);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleChange = (e) => {
    if (e.target.value === 'addNewCategory') {
      setIsModalOpen(true);
    } else {
      dispatch(updateSkillCategory({
        skillId: `skill${skillIter}`,
        category: e.target.value,
        ssId,
      }))
    }
  };
  return (
    <Box sx={{ minWidth: 120 }}>
    <AddNewCategoryModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      skillIter={skillIter}
    />
      <FormControl fullWidth error={!selectedCategory}>
        <InputLabel id="category-selector-label">Category</InputLabel>
        <Select
          labelId="category-selector-label"
          id="category-selector"
          value={selectedCategory}
          label="category"
          onChange={handleChange}
          defaultOpen={selectorExpanded}
        >
        {
          categoryList.map(categoryKey => {
            return <MenuItem key={categoryKey} value={categoryKey}>{categoryMap[categoryKey]}</MenuItem>
          })
        }
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategorySelector;
