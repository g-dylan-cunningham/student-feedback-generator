// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  console.log(
    rating,
    category,
      firstName,
      lastName,
      gender,
      'ageGroup', ageGroup,
      namePreference,
      'honorific',honorific,
      voice
  );

  const params = {
    rating,
    ageGroup,
    category,
    ss: getSsDetails({gender, firstName, lastName, namePreference, voice})
  };

  // We want to assemble an array of functions that will allow us to arrive the sentence attribute in
  // the response. Because there are so many categories, age groups, and ratings, there may not be 
  // sufficient comments in each sub sub category, so we we also include the generic comments after the 
  // custom sub sub category comments. 

  let configuredCategoriesArr = [];
  let genericCategoryArr = [];

  if (copy[category] && copy[category][ageGroup]) {
    configuredCategoriesArr = copy[category][ageGroup][rating].map((getSentence, i) => {
      return {
        getSentence,
        commentType: 'custom',
        category,
        ageGroup,
        rating,
        commentIter: i,
      };
    });
  } 
  
  if (configuredCategoriesArr.length < 6) {
    genericCategoryArr = copy['generic'][ageGroup][rating].map((getSentence, i) => {
      return {
        getSentence,
        commentType: 'generic',
        category,
        ageGroup,
        rating,
        commentIter: i,
      };
    });
  }
  
  const response = [
    ...configuredCategoriesArr,
    ...genericCategoryArr
  ].map((comment, serverIter) => { // response is an array of functions
    return {
      serverIter, // can we delete?
      sentence: comment.getSentence(params),
      commentType: comment.commentType,
      category: comment.category,
      ageGroup: comment.ageGroup,
      rating: comment.rating,
      commentIter: comment.commentIter,
      commentId: uuid(),
      isVisible: serverIter < 5,
    };
  })

  res.status(200).json({ copy: response });
}
