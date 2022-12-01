const ratingLabels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const categories = {
  listening: 'listening comprehension',
  verbal: 'verbal production',
  grammar: 'grammar',
  writing: 'writing',
  reading: 'reading'
}

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
};

export {
  ratingLabels,
  categories,
  pronounMap
};
