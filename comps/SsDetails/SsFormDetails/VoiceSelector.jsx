import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  Grid,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
} from '@mui/material';

const VoiceSelector = ({
  namePref,
  setNamePref,
  storedSsDetails = {},
  nameFields,
}) => {

  const { // populate forms with redux values if they exist
    honorific: currentHonorific,
    namePreference: currentNamePref,
    voice: currentVoice = 'thirdPerson',
    gender: currentGender
  } = storedSsDetails;

  const derivedCurrentHonorific = useMemo(() => {
    if (currentHonorific) return currentHonorific;
    if (currentGender === 'female') {
      return 'Ms';
    } else {
      return 'Mr.'
    }
  }, []);
  const transformedCurrentNamePref = useMemo(() => {
    if (currentNamePref === 'firstName') {
      return { firstName: true, lastName: false }
    } else if (currentNamePref === 'lastName') {
      return { firstName: false, lastName: true }
    } else if (currentNamePref === 'mixed') {
      return { firstName: true, lastName: true }
    }
    return { firstName: true, lastName: false }
  }, []);


  const [selectedVoice, setSelectedVoice] = useState(currentVoice);
  const [firstOrLastName, setFirstOrLastName] = useState(transformedCurrentNamePref);
  const [honorific, setHonorific] = useState(derivedCurrentHonorific);
  const [customHonorific, setCustomHonorific] = useState('');

  const namePreference = useMemo(() => {
    if (firstOrLastName.firstName && firstOrLastName.lastName) {
      return 'mixed';
     } else if (firstOrLastName.firstName) {
        return 'firstName';
      } else {
        return 'lastName';
      }
    // }
  }, [firstOrLastName]);

  useEffect(() => {
    const namePrefObj = {
      voice: selectedVoice,
      honorific: honorific === 'custom' ? customHonorific : honorific,
      namePreference
    }
    setNamePref(namePrefObj);
  }, [selectedVoice, firstOrLastName, honorific, customHonorific])


  const handleVoiceChange = (e) => {
    setSelectedVoice(event.target.value);
  };

  const ThirdPersonCheckboxes = () => {

    const handleFirstOrLastNameChange = (e) => {
      setFirstOrLastName({ ...firstOrLastName, ...{ [e.target.name]: e.target.checked }})
    }

    const handleHonorificChange = (e) => {
      setHonorific(e.target.value);
    }

    const handleCustomHonorificChange = (e) => {
      e.preventDefault()
      setCustomHonorific(e.target.value);
    }

    return (
      <Grid item xs={6}>
        <FormLabel id="voice-label">Name(s) used</FormLabel>
          <FormGroup
            onChange={handleFirstOrLastNameChange}
          >
            <Grid container direction="column">
              <FormControlLabel control={
                <Checkbox
                  value="firstName"
                  checked={!!firstOrLastName.firstName && !!nameFields.firstName}
                  name="firstName"
                  disabled={!nameFields.firstName}
                />
              } label="First Name" />
              <FormControlLabel control={
                <Checkbox
                  value="lastName"
                  name="lastName"
                  checked={!!firstOrLastName.lastName && !!nameFields.lastName}
                  disabled={!nameFields.lastName}
                />
              } label="Last name" />
              {
                firstOrLastName.lastName && (
                <div style={{ marginLeft: '10px'}}>
                  <RadioGroup
                    aria-labelledby="voice-label"
                    name="voice"
                    defaultValue={honorific}
                    value={honorific}
                    onChange={handleHonorificChange}
                  >
                    <FormControlLabel value="Mr." control={<Radio />} label="Mr."/>
                    <FormControlLabel value="Ms" control={<Radio />} label="Ms"/>
                    <FormControlLabel value="Mrs." control={<Radio />} label="Mrs."/>
                    <FormControlLabel value="Miss" control={<Radio />} label="Miss"/>
                    <FormControlLabel value="custom" control={
                      <Radio/>
                    } label="Custom"/>
                    {
                      honorific === 'custom' && (
                      <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        value={customHonorific}
                        onChange={handleCustomHonorificChange}
                      />)
                    }
                </RadioGroup>
              </div>
              )
            }
          </Grid>
        </FormGroup>
      </Grid>
    )
  }//, [namePref, honorific])

  return (
  <Grid container direction="row">
    <Grid item xs={6}>
      <FormLabel id="voice-label">Voice</FormLabel>
        <RadioGroup
          aria-labelledby="voice-label"
          name="voice"
          defaultValue="firstPerson"
          value={selectedVoice}
          onChange={handleVoiceChange}
        >
          <FormControlLabel value="firstPerson" control={<Radio />} label="1st Person"/>
          <FormControlLabel value="thirdPerson" control={<Radio />} label="3rd Person"/>
      </RadioGroup>
    </Grid>
    {
      selectedVoice === 'thirdPerson' && <ThirdPersonCheckboxes />
    }
</Grid>
    
  )
};

export default VoiceSelector;

