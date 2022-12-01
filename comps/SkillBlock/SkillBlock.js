import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
// import { ratingLabels } from '../config';
// import { ratings } from '../copy'
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

const Sentence = ({ sentence, id, i, skillData, setSkillData }) => {
  const removeSentence = () => {
    // const currentSkill = Object.assign({}, skillData[id]);
    // console.log('curskil', currentSkill)
    // const { copy } = currentSkill;

    const thisSkill = skillData[id];
    // console.log('id', id, skillData)
    const thisSkillCopyArr = thisSkill.copy;

    const newCopy = thisSkillCopyArr.filter((elem) => {
      return elem.id !== i;
    })
    currentSkill.copy = newCopy;
    const newSkillData =  [ ...skillData ];
    newSkillData[id] = currentSkill;
    setSkillData(newSkillData);
  }
  return (
    <div
      draggable
      style={{ margin: '15px', padding: '15px', width: '100%', border: '1px solid grey', textAlign: 'center', cursor: 'move'}}
    >
      <div
        style={{
          display: 'absolute',
          float: 'right'
        }}
      >
        <CloseIcon
          onClick={removeSentence}
        />
      </div>
      {sentence}
    </div>
  )
}

const SkillBlock = ({
  studentDetails,
  setSkillData,
  skillData,
  id
}) => {
  const defaultCategory = 'please select category';
  const [ level, setLevel ] = useState(0);
  const [ category, setCategory ] = useState(defaultCategory);
  // const [ textArea, setTextArea ] = useState('');

  const thisSkill = skillData[id];
  // console.log('id', id, skillData)
  const thisSkillCopyArr = thisSkill.copy;
  console.log('skillBlock - id', id,'skillData',skillData, 'skillVerbiageArray', thisSkillCopyArr)
  // api call for copy
  useEffect(() => {
    // var json;
    const fetchData = async () => {
      // console.log('studentDetails', studentDetails);
      const data = await fetch('http://localhost:3000/base/api/verbiage',
        {
          method: 'POST',
          body: JSON.stringify({
            studentDetails,
            rating: level,
            category,
            ageGroup: 'adult',
            namePreference: 'mixed'
          })
        }
      );
      const { copy } = await data.json();

      const currentSkill = Object.assign({}, thisSkill);
      currentSkill.copy = copy;
      const newSkillData = [ ...skillData ];
      newSkillData[id] = currentSkill;
      setSkillData(newSkillData);
      console.log('fetched verbiage', newSkillData, 'id', id, 'currentSkill', currentSkill)
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
    let _skillData = [...skillData];
    const _thisSkillCopyArr = _skillData[id].copy;
    console.log('dragedded and over', dragItem.current, dragOverItem.current)
    // remove and save the dragged item
    const draggedItemContent = _thisSkillCopyArr[dragItem.current];
    const draggedOverItemContent = _thisSkillCopyArr[dragOverItem.current];


    function swapElements(arr, i1, i2) {
      [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
    }

    swapElements(_thisSkillCopyArr, dragItem.current, dragOverItem.current);
    // const draggedItemContent = _skillData.splice(dragItem.current, 1)[0];
    // const draggedOverItemContent = _skillData.splice(dragOverItem.current, 1)[0];

    console.log('dragg', draggedItemContent, draggedOverItemContent, _skillData)

    console.log('+draggedItemContent', draggedItemContent, dragItem.current, dragOverItem.current, _skillData);

    // switch the position
    // _skillData.splice(dragOverItem.current, 0, draggedItemContent);
    // console.log('+skillData', _skillData)
    // reset position ref
    dragItem.current = null;
    dragOverItem.current = null;
    console.log('_skillData', _skillData)
    setSkillData(_skillData);

  }
  // const onDragStart = (e, index) => {
  //   console.log('onDragStart', index, e.target.value);
  // }
  // const onDragEnter = (e, index) => {
  //   console.log('onDragEnter', index, e.target.value);
  // }
  // const onDragEnd = (e, index) => {
  //   console.log('onDragEnd', index, e.target.value);
  // }

  return (
    
    // <div className={styles.formColumnContainer}>
    <Box sx={{ flexGrow: 1 }} mb={5}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>

            <Typography variant='h4' >
              {
                category !== defaultCategory
                ? <span>
                  {category}
                  <Button
                    onClick={() => setCategory(defaultCategory)}
                  >
                    <EditIcon />
                  </Button>
                </span>
                : <CategorySelector
                    category={category}
                    setCategory={setCategory}
                  />
              }
            </Typography>
            <StarRater
              value={level}
              setValue={setLevel}
            />

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>


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
                thisSkillCopyArr.map(({id, sentence, ...rest}, i) => {
                  console.log('rest', rest, id)
                return  (
                  <div
                    key={id}
                    onDragStart={(e) => dragItem.current=i}  //  {(e) => onDragStart(e, i)}
                    onDragEnter={(e) => dragOverItem.current=i} // {(e) => onDragEnter(e, i)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Sentence
                      id={id}
                      i={i}
                      sentence={sentence}
                      setSkillData={setSkillData}
                      skillData={skillData}
                    />
                  </div>
                );
              })
              }
            </div>
              {/* <TextField
                id="outlined-multiline-static"
                label="comments"
                multiline
                rows={4}
                value={textArea}
                placeholder="Select a category and rating"
                onChange={e => setTextArea(e.target.value)}
              /> */}
            </Box>


          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            finalized

          </Item>
        </Grid>
      </Grid>
    </Box>

      
    // </div>
  );
}
 
export default SkillBlock;