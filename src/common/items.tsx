export const items: {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  dietary?: string[];
  options: {
    name: string;
    freeSelections: number;
    description?: string;
    selections: {
      name: string;
      price: number;
      selected: boolean;
    }[];
  }[];
}[] = [
  {
    id: 0,
    name: 'Lamb Souvlaki Wrap',
    description: `Freshly grilled lamb, marinated in salt & pepper and a touch of Greek oregano 
          and lemon juice. Served inside our Greek handmade pita with lettuce, tomatoes, red onions,
           parsley, fries and our homemade tzatziki sauce`,
    price: 6.5,
    dietary: [],
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Lamb',
            price: 2.0,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: 'Double Lamb Naked Souvlaki',
    description:
      'Our delicious Greek salad alongside our special lamb skewers with tzatziki (served cold)',
    price: 9.0,
    dietary: [],
    options: [],
  },
  {
    id: 2,
    name: 'Pork Souvlaki  Wrap',
    image: 'souvlaki.png',
    description:
      'Grilled pork skewer served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and tzatziki sauce',
    price: 6.0,
    dietary: [],
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Chicken',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Pork',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Lamb & Beef',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Mushrooms',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Tomato Croquettes',
            price: 1.5,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Chicken Souvlaki Wrap',
    description:
      'Grilled chicken skewer served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and yoghurt, mustard and honey sauce',
    price: 6.0,
    dietary: [],
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Chicken',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Pork',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Lamb & Beef',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Mushrooms',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Tomato Croquettes',
            price: 1.5,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Ground Lamb & Beef Souvlaki Wrap',
    description:
      'Grilled ground lamb & beef served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and spicy feta and red pepper sauce',
    price: 6.0,
    image: 'lamb_beef_souvlaki.png',
    dietary: [],
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Chicken',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Pork',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Lamb & Beef',
            price: 2.0,
            selected: false,
          },
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Mushrooms',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Tomato Croquettes',
            price: 1.5,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Halloumi Souvlaki Wrap',
    dietary: ['vegeterian'],
    description:
      'Grilled halloumi served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and yoghurt, mustard and honey sauce',
    price: 6.0,
    image: 'vegeterian_souvlaki.png',
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Mushrooms',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Tomato Croquettes',
            price: 1.5,
            selected: false,
          },
        ],
      },
    ],
  },

  {
    id: 6,
    name: 'Mushrooms Souvlaki Wrap',
    dietary: ['vegan'],
    description:
      'Grilled mushrooms served in Greek handmade pita with tomatoes, red onions, parsley, oregano fries and vegan mayonnaise',
    price: 6.0,
    image: 'vegan_souvlaki.png',
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Mushrooms',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Tomato Croquettes',
            price: 1.5,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Tomato Croquettes Souvlaki Wrap',
    dietary: ['vegan'],
    description:
      'Tomato croquettes served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and aubergine sauce',
    price: 6.0,
    image: 'vegan_souvlaki_2.png',
    options: [
      {
        name: 'Extras',
        freeSelections: 0,
        selections: [
          {
            name: 'Extra Halloumi',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Mushrooms',
            price: 1.5,
            selected: false,
          },
          {
            name: 'Extra Tomato Croquettes',
            price: 1.5,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: 'Pork Gyros Wrap',
    description:
      'Pork shavings served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and tzatziki sauce',
    price: 6.5,
    image: 'pork_gyros.png',
    dietary: [],
    options: [
      {
        name: 'Upgrade to Box',
        freeSelections: 0,
        selections: [{name: 'Upgrade to Box', price: 2.0, selected: false}],
      },
    ],
  },

  {
    id: 9,
    name: 'Chicken Gyros Wrap',
    description:
      'Chicken shavings served in Greek handmade pita with lettuce, tomatoes, red onions, parsley, oregano fries and and yoghurt, mustard and honey sauce',
    price: 6.5,
    image: 'chicken_gyros.png',
    dietary: [],
    options: [
      {
        name: 'Upgrade to Box',
        freeSelections: 0,
        selections: [{name: 'Upgrade to Box', price: 2.0, selected: false}],
      },
    ],
  },

  {
    id: 10,
    name: 'Vegan Gyros Wrap',
    dietary: ['vegan'],
    description:
      'Vegan organic seitan gyros served in Greek handmade pita with tomatoes, red onions, parsley, oregano fries and vegan mayonnaise',
    price: 6.5,
    image: 'chicken_gyros.png',
    options: [
      {
        name: 'Upgrade to Box',
        freeSelections: 0,
        selections: [{name: 'Upgrade to Box', price: 2.0, selected: false}],
      },
    ],
  },
  {
    id: 11,
    name: 'Naked Souvlaki',
    dietary: ['gluten-free'],
    description:
      'Our delicious Greek salad with your choice of two skewers and homemade sauce',
    price: 8,
    options: [
      {
        name: 'Skewers',
        description: 'Choose a skewer',
        freeSelections: 0,
        selections: [
          {name: 'Double Pork', price: 0, selected: false},
          {name: 'Double Chicken', price: 0, selected: false},
          {name: 'Pork and Chicken', price: 0, selected: false},
          {name: 'Pork & Lamb & Beef', price: 0, selected: false},
          {name: 'Chicken & Lamb & Beef', price: 0, selected: false},
        ],
      },
      {
        name: 'Sauce',
        description: 'Choose a sauce',
        freeSelections: 0,
        selections: [
          {name: 'Tzatziki', price: 0, selected: false},
          {
            name: 'Yogurt, mustard and honey sauce',
            price: 0,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Greek Salad',
    dietary: ['gluten-free'],
    description:
      'Tomatoes, red onions, feta cheese & Kalamata olives dressed in oregano & Greek extra virgin olive oil',
    price: 5.5,
    options: [],
  },
];
