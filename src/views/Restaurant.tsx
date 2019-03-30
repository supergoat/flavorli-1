import React from 'react';
import styled from 'styled-components/macro';
import {Router, RouteComponentProps} from '@reach/router';
import Menu from '../components/Menu';
import MenuItemView from './MenuItem';
import CheckOutFooter from '../components/CheckOutFooter';

interface Props extends RouteComponentProps {
  restaurantId?: number;
}
const RestaurantView = ({restaurantId}: Props) => {
  const restaurant = restaurants[restaurantId || 0];

  return (
    <>
      <Image
        src={require(`../assets/restaurants/${restaurant.image}`)}
        alt={restaurant.name}
      />
      <Info>
        <Name>{restaurant.name}</Name>
        <Description>{restaurant.description}</Description>

        {restaurant.tags.length > 0 && (
          <InfoItem>
            <Icon src={require('../assets/icons/tag.svg')} alt="tag icon" />

            {restaurant.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </InfoItem>
        )}

        <InfoItem>
          <Icon src={require('../assets/icons/time.svg')} alt="time icon" />
          <p>11:30 - 22:30</p>
        </InfoItem>
        <InfoItem>
          <Icon src={require('../assets/icons/tel.svg')} alt="telephone icon" />
          <p> 07960778401</p>
        </InfoItem>
        <InfoItem>
          <Icon
            src={require('../assets/icons/location.svg')}
            alt="location icon"
          />
          <p> 7 Fermain Court North, De Beauvoir Road, London, N15SX</p>
        </InfoItem>
      </Info>

      <Menu />
      <Router>
        <MenuItemView path="/menu/item/:itemId" />
      </Router>
      <CheckOutFooter />
    </>
  );
};

/* Export
============================================================================= */
export default RestaurantView;

/* Styled Compoents
============================================================================= */
const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.5em;
`;

const Info = styled.div`
  padding: 30px 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--gallery);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 0;

  p {
    font-size: 11px;
    text-transform: uppercase;
  }
`;

const Tag = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  margin-right: 5px;

  :after {
    content: ',';
  }

  :last-of-type:after {
    content: '';
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
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
