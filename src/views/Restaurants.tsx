import React from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Page from '../templates/Page';

interface Props extends RouteComponentProps {}
const RestaurantsView = (_: Props) => {
  return (
    <Page heading="BoxPark" showNavbar>
      <NoOfRestaurants>{restaurants.length} Restaurants</NoOfRestaurants>
      {restaurants.map(restaurant => {
        return (
          <Restaurant>
            <Name>{restaurant.name}</Name>
            <Description>{restaurant.description}</Description>
            {restaurant.tags.length > 0 && (
              <Tags>
                <TagIcon
                  src={require('../assets/icons/tag.svg')}
                  alt="tag icon"
                />
                {restaurant.tags.map(tag => (
                  <li>{tag}</li>
                ))}
              </Tags>
            )}
            <Image
              src={require(`../assets/restaurants/${restaurant.image}`)}
              alt=""
            />
          </Restaurant>
        );
      })}
    </Page>
  );
};

/* Export
============================================================================= */
export default RestaurantsView;

/* Styled Compoents
============================================================================= */
const NoOfRestaurants = styled.p`
  margin-bottom: 10px;
`;

const Restaurant = styled.div`
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Name = styled.h4`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 12px;
  color: var(--osloGrey);
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  line-clamp: 1;

  li {
    font-size: 10px;
    text-transform: uppercase;
    margin-right: 5px;
  }

  li:after {
    content: ',';
  }

  li:last-of-type:after {
    content: '';
  }
`;

const TagIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 3px;
  object-fit: cover;
  background: blue;
`;

const restaurants = [
  {
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
    name: 'BLACK BEAR BURGER',
    image: 'Black-Bear-Burger-Holder.jpg',
    description: 'HIGH QUALITY BEEF BURGERS',
    tags: [],
  },
  {
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
    name: 'DUM DUMS DONUTTERIE',
    image: 'Dum-Dums-Holder2.jpg',
    description:
      'FRESHLY BAKED - NOT FRIED! - HANDMADE AND SIGNIFICANTLY LOWER FAT DOUGHNUTS',
    tags: ['doughnuts', 'coffee', 'cronuts'],
  },
  {
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
    name: 'FALAFELICIOUS',
    image: 'Falafelicious-Holder.jpg',
    description:
      'DELICIOUS MODERN FALAFEL, CHICKEN SCHNITZEL AND MIDDLE EASTERN SALADS',
    tags: ['falafel', 'salads', 'wraps', 'grilled chicken'],
  },
  {
    name: 'NOSTEAGIA',
    image: 'Nosteagia-E1-Holder-NEW.jpg',
    description:
      'BUBBLE WAFFLE INSPIRED BY HK EGG PUFF WAFFLES WITH ICE CREAM AND FRESH FRUIT',
    tags: ['bubble waffles'],
  },
  {
    name: 'OSTERIA DELLA PASTA',
    image: 'Osteria-Della-Holder.jpg',
    description:
      'AUTHENTIC HANDMADE FRESH PASTA FROM ITALY USING THE FINEST INGREDIENTS',
    tags: ['pasta', 'fish', 'seafood', 'ragu'],
  },
  {
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
    name: 'POPTATA',
    image: 'Poptata-E1-Holder-NEW.jpg',
    description: '',
    tags: [],
  },
  {
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
    name: 'WHAT THE PITTA!',
    image: 'WTP-Holder.jpg',
    description:
      'HEALTHY VEGAN DONER KEBABS AND PIZZA WITH A HEALTHY AND ETHICAL TWIST!',
    tags: ['vegan', 'kebab', 'turkish', 'pizza', 'healthy', 'vegetarian'],
  },
];
