import { cap } from '../../utils';

const adult = {
    1: [
      ({ ss, category}) => `${ss.name} has shown poor skill in ${category}`,
      ({ ss }) => `${cap(ss.pronoun)} did not put in the effort needed to succeed`,
      ({ ss }) => `${cap(ss.possessive)} work ethic is not acceptable`,
    ],
    2: [
      ({ ss, category}) => `${ss.name} has shown mediocre skill in ${category}`,
      ({ ss }) => `${cap(ss.pronoun)} attempted, but did not quite put in the effort needed to succeed`,
      ({ ss }) => `${cap(ss.possessive)} work ethic is poor`,
    ],
    3: [
      ({ ss, category}) => `${ss.name} has shown reasonable skill in ${category}`,
      ({ ss }) => `${cap(ss.pronoun)} put in the minimal effort needed to succeed`,
      ({ ss }) => `${cap(ss.possessive)} work ethic is acceptable`,
    ],
    4: [
      ({ ss, category}) => `${ss.name} has shown adept skill in ${category}`,
      ({ ss }) => `${cap(ss.pronoun)} was successful with the amount of effort they put in`,
      ({ ss }) => `${cap(ss.possessive)} work ethic is very good`,
    ],
    5: [
      ({ ss, category}) => `${ss.name} has shown excellent skill in ${category}`,
      ({ ss }) => `${cap(ss.pronoun)} put in a lot of effort`,
      ({ ss }) => `${cap(ss.possessive)} work ethic is exemplary`,
    ],
}

export default adult;
// export {
//   ratings,
// };
