export const modifiers = [
  {
    name: 'Spambot',
    emoji: '💩',
    description: '$1 every time you post',
    identifier: 'spambot',
    rarirty: 1,
    events: ['post'],
    actions: [],
  },
  {
    name: 'Boosted',
    emoji: '👩🏻‍💻',
    description: "$5 every time you're reposted",
    identifier: 'boosted-1',
    rarirty: 1,
    events: ['repost'],
    actions: [],
  },
  {
    name: "Somebody's",
    emoji: '🐣',
    description: "$2 every time you're favorited",
    identifier: 'favorites-1',
    rarirty: 1,
    events: ['fav'],
    actions: [],
  },
  {
    name: "Sociable",
    emoji: '👯',
    description: "$1 every time you interact",
    identifier: 'sociable-1',
    rarirty: 1,
    events: ['fav'],
    actions: [],
  }
];