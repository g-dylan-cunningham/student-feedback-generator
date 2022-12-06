import React, { useEffect, useMemo } from 'react';
import { Container } from '@mui/system';
import {
  Paper,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
} from '@mui/material';

const pronounMap = {
  male: {
    pronoun: 'he',
    possessive: 'his',
    object: 'him',
    possesivePronoun: 'his'
  },
  female: {
    pronoun: 'she',
    possessive: 'her',
    object: 'her',
    possesivePronoun: 'hers'
  },
  other: {
    pronoun: 'they',
    possessive: 'their',
    object: 'them',
    possesivePronoun: 'theirs'
  },
  firstPerson: {
    pronoun: 'you',
    possessive: 'your',
    object: 'you',
    possesivePronoun: 'yours'
  },
}


const PronounList = ({ voice, gender }) => {

  if (!gender || !voice) {
    return <></>
  }

  if (!voice) return null;
  return (
    <span>
      {
        <>
          {
            voice === 'firstPerson'
            ? (<>
              <div>2nd Person: {pronounMap.firstPerson.pronoun}</div>
              <div>Direct Object: {pronounMap.firstPerson.object}</div>
              <div>Possesive Pronoun: {pronounMap.firstPerson.possessive}</div>
            </>)
            : (<>
              <div>3rd Person: {pronounMap[gender].pronoun}</div>
              <div>Direct Object: {pronounMap[gender].object}</div>
              <div>Possesive Pronoun: {pronounMap[gender].possessive}</div>
            </>)
          }

        </>
      }
    </span>
  )
}

export default PronounList;
