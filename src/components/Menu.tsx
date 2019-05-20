import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import MenuItem from './MenuItem';
import Item from '../views/Item';

interface Section {
  name: string;
  items: any[];
}
interface Props {
  categories: Section[];
  restaurantId: string;
}
const Menu = ({categories, restaurantId}: Props) => {
  const [item, setItem] = useState<any>(null);

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
          onCloseItem={() => setItem(null)}
          restaurantId={restaurantId}
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
