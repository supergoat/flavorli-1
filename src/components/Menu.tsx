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
  items: [ItemType];
}
interface Props {
  menu: Section[];
}
const Menu = ({menu}: Props) => {
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
      {menu.map((section: Section) => {
        return (
          <Fragment key={section.name}>
            <CategoryName>{section.name}</CategoryName>

            {section.items.map(item => (
              <>
                <MenuItem
                  key={item.id}
                  item={item}
                  onClick={() => setItemId(item.id)}
                />

                {item && itemId === item.id && (
                  <Item item={item} onCancel={() => setItemId(undefined)} />
                )}
              </>
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
