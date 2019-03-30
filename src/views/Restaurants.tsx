import React from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Page from '../templates/Page';
import RestaurantItem from '../components/RestaurantItem';

interface Props extends RouteComponentProps {}
const RestaurantsView = (_: Props) => {
  return (
    <Page heading="BoxPark" showNavbar>
      <NoOfRestaurants>{restaurants.length} Restaurants</NoOfRestaurants>
      {restaurants.map(restaurant => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </Page>
  );
};

/* Export
============================================================================= */
export default RestaurantsView;

/* Styled Compoents
============================================================================= */
const NoOfRestaurants = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
`;

const restaurants = [
  {
    id: 0,
    name: 'THE ATHENIAN',
    image: 'The-Athenian-Holder.jpg',
    description:
      'GREEK SOUVLAKI FLATBREAD WRAPS WITH TENDER CHICKEN, JUICY PORK AND GRILLED HALLOUMI',
    tags: [
      'greek',
      'souvlaki wraps',
      'bbq',
      'salads',
      'chicken',
      'pork',
      'lamb',
    ],
  },
  {
    id: 1,
    name: "BIFF'S JACK SHACK",
    image: 'Biffs-Holder.jpg',
    description: 'FILTHY VEGAN JUNK FOOD',
    tags: [
      'vegan',
      'burger',
      'jackfruit',
      'fast food',
      'vegetarian',
      'wings',
      'lunch',
    ],
  },
  {
    id: 2,
    name: 'BLACK BEAR BURGER',
    image: 'Black-Bear-Burger-Holder.jpg',
    description: 'HIGH QUALITY BEEF BURGERS',
    tags: [],
  },
  {
    id: 3,
    name: 'BEATBOX',
    image: 'Beatbox-E1-Holder.jpg',
    description:
      'FRESH COFFEE & PIES BY DAY, LIVE MUSIC, EVENTS AND A BAR BY NIGH',
    tags: [
      'coffee',
      'pies',
      'mash',
      'beer',
      'wine',
      'spirits',
      'cocktails',
      'soft drinks',
      'events',
    ],
  },
  {
    id: 4,
    name: 'COQFIGHTER CHICKEN & BEER',
    image: 'Coqfighter-E1-Holder-NEW.jpg',
    description:
      'CHICKEN WINGS, WHOLE LEG CHICKEN BURGERS, KOREAN BAO, FRIES AND CRAFT BEER',
    tags: [
      'Fried Chicken',
      'Korean Fried Chicken',
      'Burgers',
      'Bao',
      'Beer',
      'Craft Beer',
      'Fries',
    ],
  },
  {
    id: 5,
    name: 'DUM DUMS DONUTTERIE',
    image: 'Dum-Dums-Holder2.jpg',
    description:
      'FRESHLY BAKED - NOT FRIED! - HANDMADE AND SIGNIFICANTLY LOWER FAT DOUGHNUTS',
    tags: ['doughnuts', 'coffee', 'cronuts'],
  },
  {
    id: 6,
    name: 'EAT CHAY',
    image: 'Eat-Chay-Holder.jpg',
    description: 'VEGAN ASIAN MUNCH!',
    tags: [
      'BANH MI',
      ' STEAMED BAO BUNS',
      'NOODLE SALADS',
      'LOADED RICE BOWLS',
    ],
  },
  {
    id: 7,
    name: 'FALAFELICIOUS',
    image: 'Falafelicious-Holder.jpg',
    description:
      'DELICIOUS MODERN FALAFEL, CHICKEN SCHNITZEL AND MIDDLE EASTERN SALADS',
    tags: ['falafel', 'salads', 'wraps', 'grilled chicken'],
  },
  {
    id: 8,
    name: 'NOSTEAGIA',
    image: 'Nosteagia-E1-Holder-NEW.jpg',
    description:
      'BUBBLE WAFFLE INSPIRED BY HK EGG PUFF WAFFLES WITH ICE CREAM AND FRESH FRUIT',
    tags: ['bubble waffles'],
  },
  {
    id: 9,
    name: 'OSTERIA DELLA PASTA',
    image: 'Osteria-Della-Holder.jpg',
    description:
      'AUTHENTIC HANDMADE FRESH PASTA FROM ITALY USING THE FINEST INGREDIENTS',
    tags: ['pasta', 'fish', 'seafood', 'ragu'],
  },
  {
    id: 10,
    name: 'PIEMINISTER',
    image: 'Pieminister-Holder.jpg',
    description:
      'SERVING UP ORGANIC FRESHLY MADE PIES WITH GLUTEN FREE AND VEGAN OPTIONS',
    tags: [
      'pies',
      'vegan pies',
      'gluten free pies',
      'meat pies',
      'vegetable pies',
      'organic pies',
    ],
  },
  {
    id: 11,
    name: 'POPTATA',
    image: 'Poptata-E1-Holder-NEW.jpg',
    description: '',
    tags: [],
  },
  {
    id: 12,
    name: "RUDIE'S JERK SHACK",
    image: 'RUDIES-HOLDER.jpg',
    description:
      'HIP JAMAICAN JOINT SERVING BANGING REAL JERK AND SMALL PLATES WITH A CONTEMPORARY TWIST',
    tags: [
      'jerk chicken',
      'caribbean',
      'jerk lamb',
      ' jerk pork',
      'jamaican tapas',
      'wings',
      'ribs burgers',
    ],
  },
  {
    id: 13,
    name: 'SMALL BATCH COFFEE',
    image: 'small-Batch-Holder.jpg',
    description:
      'SERVING UP FRESHLY ROASTED AND PERFECTLY BREWED ORGANIC COFFEE ALL DAY',
    tags: [
      'coffee',
      'latte',
      'filter coffee',
      'americano',
      'flat white',
      'mocha',
      'espresso',
    ],
  },
  {
    id: 14,
    name: 'SNOG FROZEN YOGHURT',
    image: 'Snog-Holder.jpg',
    description:
      'FAT FREE FROZEN YOGHURT SWEETENED WITH AGAVE NECTAR WITH YOUR CHOICE OF TOPPINGS',
    tags: [
      'Frozen Yogurt',
      ' Ice Cream',
      'Dessert',
      'Fresh Fruit',
      'Agave Nectar',
      'Guilt-Free Treat',
    ],
  },
  {
    id: 15,
    name: 'SOFT SERVE SOCIETY',
    image: 'Soft-Serttve-Society-03.jpg',
    description:
      'DESSERT BAR SPECIALISING IN UNIQUE PREMIUM SOFT SERVE ICE CREAM AND MILKSHAKES',
    tags: [
      'ice cream',
      'milkshakes',
      'freak shakes',
      'coffee',
      'sundaes',
      'deserts',
    ],
  },
  {
    id: 16,
    name: 'VOODOO RAYS',
    image: 'Voodoo-Rays-Holder.jpg',
    description:
      'NYC STYLE PIZZA BY THE SLICE, CRAFT BEERS FROZEN COCKTAILS AND MARGARITAS',
    tags: [
      'pizza',
      'slices',
      ' pizza pies',
      'salads',
      'frozen margaritas',
      'craft beer',
    ],
  },
  {
    id: 17,
    name: 'WHAT THE PITTA!',
    image: 'WTP-Holder.jpg',
    description:
      'HEALTHY VEGAN DONER KEBABS AND PIZZA WITH A HEALTHY AND ETHICAL TWIST!',
    tags: ['vegan', 'kebab', 'turkish', 'pizza', 'healthy', 'vegetarian'],
  },
];
