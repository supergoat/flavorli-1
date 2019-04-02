import React, {Fragment} from 'react';
import styled from 'styled-components/macro';
import MenuItem from './MenuItem';

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
  items: [ItemType];
}
interface Props {
  menu: Section[];
}
const Menu = ({menu}: Props) => {
  return (
    <MenuWrapper>
      {menu.map((section: Section) => {
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
