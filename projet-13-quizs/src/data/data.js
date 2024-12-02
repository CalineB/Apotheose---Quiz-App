export const quizs = [
  {
    id: 1,
    title: 'Mon super Quiz',
    slug: 'mon-super-quiz',
    tag: {
      id: 1,
      label: 'Animaux',
    },
    level: {
      id: 2,
      label: 'Hard',
    },
    question: [
      {
        id: 1,
        description: 'Qui a la plus belle voix de Starship ?',
        answer: [
          {
            id: 1,
            description: 'Ulas',
            isgoodanswer: true,
          },
          {
            id: 2,
            description: 'Gérald',
            isgoodanswer: false,
          },
          {
            id: 3,
            description: 'Léo',
            isgoodanswer: false,
          },
          {
            id: 4,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
      {
        id: 2,
        description:
          'Je suis devenu dictateur le 31 Mai 2023 je suis je suis ?',
        answer: [
          {
            id: 5,
            description: 'Ulas',
            isgoodanswer: false,
          },
          {
            id: 6,
            description: 'Gérald',
            isgoodanswer: true,
          },
          {
            id: 7,
            description: 'Léo',
            isgoodanswer: false,
          },
          {
            id: 8,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
      {
        id: 3,
        description: "Je suis passé du status d'humain a celui de chat ?",
        answer: [
          {
            id: 9,
            description: 'Ulas',
            isgoodanswer: false,
          },
          {
            id: 10,
            description: 'Gérald',
            isgoodanswer: false,
          },
          {
            id: 11,
            description: 'Léo',
            isgoodanswer: true,
          },
          {
            id: 12,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Mon Autre super Quiz',
    slug: 'mon-autre-super-quiz',
    tag: {
      id: 1,
      label: 'Animaux',
    },
    level: {
      id: 2,
      label: 'Hard',
    },
    question: [
      {
        id: 1,
        description: 'Qui a la plus belle voix de Starship ?',
        answer: [
          {
            id: 1,
            description: 'Ulas',
            isgoodanswer: true,
          },
          {
            id: 2,
            description: 'Gérald',
            isgoodanswer: false,
          },
          {
            id: 3,
            description: 'Léo',
            isgoodanswer: false,
          },
          {
            id: 4,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
      {
        id: 2,
        description:
          'Je suis devenu dictateur le 31 Mai 2023 je suis je suis ?',
        answer: [
          {
            id: 5,
            description: 'Ulas',
            isgoodanswer: false,
          },
          {
            id: 6,
            description: 'Gérald',
            isgoodanswer: true,
          },
          {
            id: 7,
            description: 'Léo',
            isgoodanswer: false,
          },
          {
            id: 8,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
      {
        id: 3,
        description: "Je suis passé du status d'humain a celui de chat ?",
        answer: [
          {
            id: 9,
            description: 'Ulas',
            isgoodanswer: false,
          },
          {
            id: 10,
            description: 'Gérald',
            isgoodanswer: false,
          },
          {
            id: 11,
            description: 'Léo',
            isgoodanswer: true,
          },
          {
            id: 12,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Mon Autre super Quiz',
    slug: 'mon-autre-autre-super-quiz',
    tag: {
      id: 1,
      label: 'Aviation',
    },
    level: {
      id: 2,
      label: 'Hard',
    },
    question: [
      {
        id: 1,
        description: 'Qui a la plus belle voix de Starship ?',
        answer: [
          {
            id: 1,
            description: 'Ulas',
            isgoodanswer: true,
          },
          {
            id: 2,
            description: 'Gérald',
            isgoodanswer: false,
          },
          {
            id: 3,
            description: 'Léo',
            isgoodanswer: false,
          },
          {
            id: 4,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
      {
        id: 2,
        description:
          'Je suis devenu dictateur le 31 Mai 2023 je suis je suis ?',
        answer: [
          {
            id: 5,
            description: 'Ulas',
            isgoodanswer: false,
          },
          {
            id: 6,
            description: 'Gérald',
            isgoodanswer: true,
          },
          {
            id: 7,
            description: 'Léo',
            isgoodanswer: false,
          },
          {
            id: 8,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
      {
        id: 3,
        description: "Je suis passé du status d'humain a celui de chat ?",
        answer: [
          {
            id: 9,
            description: 'Ulas',
            isgoodanswer: false,
          },
          {
            id: 10,
            description: 'Gérald',
            isgoodanswer: false,
          },
          {
            id: 11,
            description: 'Léo',
            isgoodanswer: true,
          },
          {
            id: 12,
            description: 'Caline',
            isgoodanswer: false,
          },
        ],
      },
    ],
  },
];

export const profil = [
  { id: '1', username: 'joe', password: '12345' },
  { id: '2', username: 'jack', password: 'qwerty' },
];

export const profilAdmin = {
  id: 1,
  email: 'monsuperemail@email.fr',
  pseudo: 'jesuisadmin',
  password: 'monpasswordsecurise',
  role: {
    id: 1,
    label: 'admin',
  },
};

export const profilUser = {
  id: 2,
  email: 'monautresuperemail@email.fr',
  pseudo: 'jesuisuser',
  password: 'monpasswordsecurise',
  role: {
    id: 2,
    label: 'user',
  },
};

export const tags = [
  {
    id: 1,
    label: 'animaux',
  },
  {
    id: 2,
    label: 'histoire',
  },
  {
    id: 3,
    label: 'art',
  },
  {
    id: 4,
    label: 'pays',
  },
  {
    id: 5,
    label: 'France',
  },
];

export const level = [
  {
    id: 1,
    label: 'facile',
  },
  {
    id: 2,
    label: 'moins facile',
  },
  {
    id: 3,
    label: 'oklm',
  },
  {
    id: 4,
    label: 'hard',
  },
  {
    id: 5,
    label: 'oulalah c chaud',
  },
];
