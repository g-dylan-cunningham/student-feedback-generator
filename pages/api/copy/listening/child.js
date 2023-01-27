import { cap } from '../../utils';

const listeningChild = {
    1: [
      ({ ss, category}) => `${ss.name}'s listening skills are lacking. ${cap(ss.pronoun)} could have issues focusing for the entire class time.`,
      ({ ss }) => `${cap(ss.pronoun)} really needs to make an effort to pay attention and not be distracted`,
      ({ ss }) => `${cap(ss.possessive)} ability to listen is not keeping pace with her classmates`,
    ],
    2: [
      ({ ss, category}) => `${ss.name} CUSTOM has shown mediocre skill in ${category}.`,
      ({ ss }) => `${cap(ss.pronoun)} CUSTOM attempted, but did not quite put in the effort needed to succeed.`,
      ({ ss }) => `${cap(ss.possessive)} CUSTOM work ethic is poor.`,
    ],
    3: [
      ({ ss, category}) => `${ss.name} CUSTOM has shown reasonable skill in ${category}.`,
      ({ ss }) => `${cap(ss.pronoun)} CUSTOM put in the minimal effort needed to succeed.`,
      ({ ss }) => `${cap(ss.possessive)} CUSTOM work ethic is acceptable.`,
    ],
    4: [
      ({ ss, category}) => `${ss.name} CUSTOM has shown adept skill in ${category}.`,
      ({ ss }) => `${cap(ss.pronoun)} CUSTOM was successful with the amount of effort they put in.`,
      ({ ss }) => `${cap(ss.possessive)} CUSTOM work ethic is very good.`,
    ],
    5: [
      ({ ss, category}) => `${ss.name} CUSTOM has shown excellent skill in ${category}.`,
      ({ ss }) => `${cap(ss.pronoun)} CUSTOM put in a lot of effort.`,
      ({ ss }) => `${cap(ss.possessive)} CUSTOM work ethic is exemplary.`,
    ],
}

export default listeningChild;
