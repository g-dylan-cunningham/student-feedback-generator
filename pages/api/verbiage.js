// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pronounMap } from './config';
import genericCopy from './copy/genericCategory';

export default function handler(req, res) {
  const {
    body
  } = req;

  const {
    rating,
    ageGroup,
    category,
    namePreference, // firstName, lastName, mixed, firstPerson
    studentDetails: {
      firstName,
      lastName,
      gender
    }
  } = JSON.parse(body);


  const ss = pronounMap[gender]; // assemble all the pronouns, will add name also later

  const getName = ({gender, firstName, lastName, namePreference}) => {
    if (namePreference === 'firstPerson') {
      return 'you';
    }
    if (namePreference === 'mixed') {
      const oneOrZero = (Math.random()>0.5)? 1 : 0;
      namePreference = ['firstName', 'lastName'][oneOrZero]
    }
    if (firstName && namePreference === 'firstName') {
      return firstName;
    }
    if (lastName && gender && namePreference === 'lastName') {
      const salutoryMap = {
        male: 'Mr.',
        female: 'Ms',
      }
      const salutation = salutoryMap[gender];
      if (salutation) {
        return salutation + ' ' + lastName;
      }
    }
    if (lastName && namePreference === 'lastName') {
      return lastName;
    }
    return 'nameNotConfiguredProperly';
  }
  ss['name'] = getName({gender, firstName, lastName, namePreference}); // add preferred name to pronouns
  
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
