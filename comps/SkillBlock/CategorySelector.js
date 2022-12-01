import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { categories } from '../../config';

export default function BasicSelect({
  category,
  setCategory
}) {
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleChange}
        >
        {
          Object.keys(categories).map(key => {
            return <MenuItem key={key} value={key}>{categories[key]}</MenuItem>
          })
        }
        </Select>
      </FormControl>
    </Box>
  );
}