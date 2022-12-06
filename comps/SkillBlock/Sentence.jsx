import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const Sentence = ({
  elem,
  sentenceIter,
  skillData,
  setSkillData,
  skillIter,
}) => {

  const removeSentence = () => {
    const _thisSkill = Object.assign({}, skillData[skillIter]);
    const newCopy = _thisSkill.copy.filter((elem, i) => {
      return i !== sentenceIter;
    });

    _thisSkill.copy = newCopy;
    const newSkill =  [ ...skillData ];
    newSkill[skillIter] = _thisSkill;
    setSkillData(newSkill);
  }
  
  return (
    <div
      draggable
      style={{ margin: '15px', padding: '15px', width: '95%', border: '1px solid grey', textAlign: 'center', cursor: 'move'}}
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
      {elem.sentence}
    </div>
  )
}

export default Sentence;
