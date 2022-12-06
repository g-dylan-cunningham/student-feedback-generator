// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pronounMap } from './config';
import genericCopy from './copy/genericCategory';

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
  )


  const ss = pronounMap[gender]; // assemble all the pronouns, will add name also later

  const getName = ({gender, firstName, lastName, namePreference, voice}) => {
    if (voice === 'firstPerson') {
      return 'you';
    }
    if (namePreference === 'mixed') {
      const oneOrZero = (Math.random()>0.5)? 1 : 0;
      namePreference = ['firstName', 'lastName'][oneOrZero]
    }
    if (firstName && namePreference === 'firstName') {
      return firstName;
    }
    if (lastName && namePreference === 'lastName') {
        let honorificStr;
        if (honorific) {
          honorificStr = honorific + ' ';
        } else {
          honorificStr = '';
        }
        return honorificStr + lastName;
    }
    if (lastName && namePreference === 'lastName') {
      return lastName;
    }
    return 'nameNotConfiguredProperly';
  }
  ss['name'] = getName({gender, firstName, lastName, namePreference, voice}); // add preferred name to pronouns
  
  // console.log(      
  //   'server studentd', ss
  // );

  const params = {
    rating,
    ageGroup,
    category,
    ss
  }


  
  const arr = genericCopy[ageGroup][rating];

  const response = arr.map((getSentence, i) => {
    return { iter: i, sentence: getSentence(params)};
  })




  res.status(200).json({ copy: response })
}
