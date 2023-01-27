import { v4 as uuid } from 'uuid';
import copy from './copy';
import { getSsDetails } from './utils';

export default function handler(req, res) {
  const {
    body
  } = req;

  const {
    rating,
    category,
    // sentenceIter,
    commentIter,
    commentType,
    commentId,
    isVisible,
    studentDetails: {
      firstName,
      lastName,
      gender,
      ageGroup,
      namePreference, // firstName, lastName, mixed
      honorific, // String - Mr. Mrs. Ms Miss, custom
      voice, // firstPerson, thirdPerson
    }
  } = JSON.parse(body);

  // console.log( 'getSingleComment',
  //   rating,
  //   category,
  //   firstName,
  //   lastName,
  //   gender,
  //   'ageGroup', ageGroup,
  //   namePreference,
  //   'honorific',honorific,
  //   voice,
  //   // sentenceIter,
  //   commentIter,
  //   commentType,
  //   commentId,
  //   isVisible,
  // );

  const params = {
    rating,
    ageGroup,
    category,
    ss: getSsDetails({gender, firstName, lastName, namePreference, voice})
  };

  const getSentence = copy[category][ageGroup][rating][commentIter];

  const response = {
    sentence: getSentence(params),
    commentType,
    category,
    ageGroup,
    rating,
    commentIter,
    commentId,
    isVisible,
  };

  res.status(200).json({ newComment: response });
}
