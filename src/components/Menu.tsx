import React, {Fragment} from 'react';
import styled from 'styled-components/macro';
import MenuItem from './MenuItem';
import {items} from '../common/items';

const Menu = () => {
  return (
    <MenuWrapper>
      {menu.map(section => {
        return (
          <Fragment key={section.name}>
            <CategoryName>{section.name}</CategoryName>

            {section.items.map(item => (
              <MenuItem key={item.id} item={item} />
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
`;

const menu = [
  {
    name: 'SPECIALS',
    items: [items[0], items[1]],
  },
  {
    name: 'SOUVLAKI',
    items: [items[2], items[3], items[4], items[5], items[6], items[7]],
  },
  {
    name: 'GYROS',
    items: [items[8], items[9], items[10]],
  },
  {
    name: 'SALADS',
    items: [items[11], items[12]],
  },
];
