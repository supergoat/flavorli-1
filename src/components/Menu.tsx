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
    freeSelections: number;
    description?: string;
    selections: {
      name: string;
      price: number;
      selected?: boolean;
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
  sections: Section[];
}
const Menu = ({sections, restaurant, activeOrderRestaurant}: Props) => {
  const [itemId, setItemId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (itemId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [itemId]);

  return (
    <MenuWrapper>
      {sections.map((section: Section) => {
        return (
          <Fragment key={section.name}>
            <CategoryName>{section.name}</CategoryName>

            {section.items.map(item => (
              <Fragment key={item.id}>
                <MenuItem item={item} onClick={() => setItemId(item.id)} />

                {item && itemId === item.id && (
                  <Item
                    item={item}
                    onCloseItem={() => setItemId(undefined)}
                    restaurant={restaurant}
                    activeOrderRestaurant={activeOrderRestaurant}
                  />
                )}
              </Fragment>
            ))}
          </Fragment>
        );
      })}
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
