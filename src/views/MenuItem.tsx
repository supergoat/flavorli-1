import React, {useState, useReducer, createContext} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import SelectOptions from '../components/SelectOptions';
import SelectQuantity from '../components/SelectQuantity';
import AddToOrder from '../components/AddToOrder';
import Modal from '../templates/ModalPage';
import {items} from '../common/items';

export const OptionsContext = createContext<{
  selected: {[name: string]: string[]};
  default: {
    name: string;
    freeSelections: number;
    selections: {
      name: string;
      price: number;
      selected?: boolean;
    }[];
  }[];
}>({
  selected: {},
  default: [],
});

interface MenuItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  options: {
    name: string;
    freeSelections: number;
    selections: {
      name: string;
      price: number;
      selected?: boolean;
    }[];
  }[];
}
interface Props extends RouteComponentProps {
  itemId?: number;
}
const MenuItem = ({itemId}: Props) => {
  const menuItem = items[itemId || 0];
  const [state, dispatch] = useReducer(menuItemReducer, menuItem, initReducer);
  const [qty, setQty] = useState(1);

  const onSelection = (
    freeSelections: number,
    optionName: string,
    selection: {
      name: string;
      price: number;
    },
  ) => {
    const optionSelections = state.options[optionName];
    const isSelected = optionSelections.includes(selection.name);
    const type = !isSelected ? 'ADD_SELECTION' : 'REMOVE_SELECTION';

    dispatch({type, freeSelections, optionName, ...selection});
  };

  return (
    <Modal>
      <OptionsContext.Provider
        value={{selected: state.options, default: menuItem.options}}
      >
        <MenuItemWrapper>
          {menuItem.image && (
            <Image
              src={require(`../assets/items/${menuItem.image}`)}
              alt={menuItem.name}
            />
          )}
          <Name>{menuItem.name}</Name>
          <Description>{menuItem.description}</Description>
          <SelectOptions onSelection={onSelection} />
          <SelectQuantity qty={qty} setQty={setQty} />
          <AddToOrder price={state.price * qty} />
        </MenuItemWrapper>
      </OptionsContext.Provider>
    </Modal>
  );
};

/*  Export
============================================================================= */
export default MenuItem;

/*  Reducers
============================================================================= */
const initReducer = (menuItem: MenuItemType) => {
  let options: {[name: string]: string[]} = {};

  menuItem.options.forEach(option => {
    options[option.name] = [];

    option.selections.forEach(
      selection =>
        selection.selected && options[option.name].push(selection.name),
    );

    return options[option.name];
  });

  return {
    options,
    price: menuItem.price,
  };
};

const menuItemReducer = (state: any, action: any) => {
  const options = optionsReducer(state.options, action);
  switch (action.type) {
    case 'ADD_SELECTION': {
      const isFreeSelection =
        action.freeSelections >= options[action.optionName].length;
      return {
        options,
        price: isFreeSelection ? state.price : state.price + action.price,
      };
    }
    case 'REMOVE_SELECTION': {
      const isFreeSelection =
        action.freeSelections > options[action.optionName].length;
      return {
        options,
        price: isFreeSelection ? state.price : state.price - action.price,
      };
    }
    default:
      return state;
  }
};

const optionsReducer = (state: {[name: string]: string[]}, action: any) => {
  const optionSelections = state[action.optionName];
  switch (action.type) {
    case 'ADD_SELECTION':
      return {
        ...state,
        [action.optionName]:
          action.price > 0 ? [...optionSelections, action.name] : [action.name],
      };
    case 'REMOVE_SELECTION':
      if (action.price === 0) return state;
      return {
        ...state,
        [action.optionName]: optionSelections.filter(c => c !== action.name),
      };
    default:
      return state;
  }
};

/* Styled Components
============================================================================= */
const MenuItemWrapper = styled.div`
  background: var(--white);
  height: auto;
  padding: 15px;
  width: 95%;
  max-width: 450px;
  border-radius: 3px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Name = styled.h1`
  font-size: 25px;
  color: var(--oxfordBlue);
  padding: 10px 0;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 10px 0;
  font-size: 18px;
  color: var(--osloGrey);
`;
