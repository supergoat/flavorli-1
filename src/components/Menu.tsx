import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import MenuItem from './MenuItem';
import Item from '../views/Item';

interface ItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  dietary?: string[];
  options: {
    name: string;
    min: string;
    max: string;
    items: {
      name: string;
      price: number;
    }[];
  }[];
}

interface Section {
  name: string;
  items: ItemType[];
}
interface Props {
  activeOrderRestaurant: {
    id: number;
    name: string;
  };
  restaurant: {
    id: number;
    name: string;
    address: {
      number: string;
      streetName: string;
      city: string;
      postalCode: string;
    };
    tel: string;
  };
  categories: Section[];
}
const Menu = ({categories, restaurant, activeOrderRestaurant}: Props) => {
  const [item, setItem] = useState<ItemType | undefined>(undefined);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [item]);

  return (
    <MenuWrapper>
      {categories.map((section: Section) => {
        return (
          <Fragment key={section.name}>
            <CategoryName>{section.name}</CategoryName>

            {section.items.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => setItem(item)}
              />
            ))}
          </Fragment>
        );
      })}

      {item && (
        <Item
          item={item}
          onCloseItem={() => setItem(undefined)}
          restaurant={restaurant}
          activeOrderRestaurant={activeOrderRestaurant}
        />
      )}
    </MenuWrapper>
  );
};

/* Export
============================================================================= */
export default Menu;

/* Styled Components
============================================================================= */
const MenuWrapper = styled.div`
  padding-bottom: 71px;
`;

const CategoryName = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  font-weight: 400;
  color: var(--osloGrey);
  text-transform: uppercase;
`;
