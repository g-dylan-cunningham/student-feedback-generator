import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Sentence from './Sentence';
import FeedbackEditable from './FeedbackEditable';
import CategorySelector from '../SkillBlock/CategorySelector';
import StarRater from '../SkillBlock/StarRater';
import styles from './SkillBlock.module.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SkillBlock = ({
  studentDetails,
  setSkillData,
  skillData,
  skillIter
}) => {
  const defaultCategory = '';
  const [ level, setLevel ] = useState(0);
  const [ thisSkillCopy, setThisSkillCopy ] = useState([]);
  const [ category, setCategory ] = useState(defaultCategory);
  // const [ textArea, setTextArea ] = useState('');

  const thisSkill = skillData[skillIter];
  const thisSkillCopyArr = thisSkill.copy;

  // api call for copy
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/base/api/verbiage',
        {
          method: 'POST',
          body: JSON.stringify({
            studentDetails,
            rating: level,
            category,
          })
        }
      );
      const { copy } = await data.json();
      setThisSkillCopy(copy);
    }
  
    // call the function
    if (category && level) {
      // console.log('fetching')
      fetchData();
    }

  }, [category, level, studentDetails])

  // vanilla dnd implementation - https://www.youtube.com/watch?v=CYKDtVZr_Jw&t=902s
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // sort sentence elements with drag and drop
  const handleSort = () => {
    // debugger
    let _thisSkillCopy = [ ...thisSkillCopy ];

    function swapElements(arr, i1, i2) {
      [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
    }

    // swapElements(_thisSkillCopyArr, dragItem.current, dragOverItem.current);
    swapElements(_thisSkillCopy, dragItem.current, dragOverItem.current);

    // reset position ref
    dragItem.current = null;
    dragOverItem.current = null;
    // setSkillData(_skillData);
    setThisSkillCopy(_thisSkillCopy);
  }

  return (
    
    // <div className={styles.formColumnContainer}>
    <Box sx={{ flexGrow: 1, borderTop: '1px solid black', paddingTop: "20px" }} mb={5}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
              {
                category !== defaultCategory
                ? (
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Typography variant='h5' >{category}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        onClick={() => setCategory(defaultCategory)}
                      >
                        <EditIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <StarRater
                        value={level}
                        setValue={setLevel}
                        category={category}
                      />
                    </Grid>
                </Grid>
                ) : (
                <div>
                  <CategorySelector
                    category={category}
                    setCategory={setCategory}
                  />
                </div>
                )
              }
        </Grid>
        <Grid item xs={6}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              {
                thisSkillCopy.map((elem, i) => {
                return  (
                  <div
                    key={i}
                    onDragStart={(e) => dragItem.current=i}  //  {(e) => onDragStart(e, i)}
                    onDragEnter={(e) => dragOverItem.current=i} // {(e) => onDragEnter(e, i)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Sentence
                      elem={elem}
                      sentenceIter={i}
                      skillIter={skillIter}
                      setSkillData={setSkillData}
                      skillData={skillData}
                    />
                  </div>
                );
              })
              }
            </div>

          </Box>
        </Grid>
        <Grid item xs={3}>
            <FeedbackEditable />
      </Grid>
      </Grid>
    </Box>

      
    // </div>
  );
}
 
export default SkillBlock;