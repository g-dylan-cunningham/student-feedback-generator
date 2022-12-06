import React from 'react'
import TextField from '@mui/material/TextField';

const Feedback = () => {
  return (
    <TextField
      id="outlined-multiline-static"
      label="comments"
      multiline
      rows={4}
      // value={textArea}
      placeholder="Select a category and rating"
      // onChange={e => setTextArea(e.target.value)}
    />
  );
}
 
export default Feedback;