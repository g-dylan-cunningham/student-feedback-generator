import { pronounMap } from './config';

const cap = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getSsDetails = ({
  gender, firstName, lastName, namePreference, voice

}) => {

  const ss = pronounMap[gender]; // assemble all the pronouns, will add name also later
  const getName = () => {
    if (voice === 'firstPerson') {
      return 'you';
    }
    if (namePreference === 'mixed') {
      const oneOrZero = (Math.random()>0.6)? 1 : 0;
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
  ss['name'] = getName(); // add preferred name to pronouns
  return ss;
}

export {
  cap,
  getSsDetails,
}