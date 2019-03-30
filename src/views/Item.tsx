import React, {useState, useReducer, createContext, Fragment} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import SelectOptions from '../components/SelectOptions';
import SelectQuantity from '../components/SelectQuantity';
import AddToOrder from '../components/AddToOrder';
import Modal from '../templates/ModalPage';
import {items} from '../common/items';
import Dietary from '../components/Dietary';

export const OptionsContext = createContext<{
  selected: {[name: string]: string[]};
  default: {
    name: string;
    freeSelections: number;
    description?: string;
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
interface Props extends RouteComponentProps {
  itemId?: number;
}
const Item = ({itemId}: Props) => {
  const item = items[itemId || 0];
  const [state, dispatch] = useReducer(itemReducer, item, initReducer);
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
        value={{selected: state.options, default: item.options}}
      >
        <ItemWrapper>
          {item.image && (
            <Image
              src={require(`../assets/items/${item.image}`)}
              alt={item.name}
            />
          )}
          <Name>{item.name}</Name>
          <Dietary dietary={item.dietary} />
          <Description>{item.description}</Description>
          <SelectOptions onSelection={onSelection} />
          <SelectQuantity qty={qty} setQty={setQty} />
          <AddToOrder price={state.price * qty} />
        </ItemWrapper>
      </OptionsContext.Provider>
    </Modal>
  );
};

/*  Export
============================================================================= */
export default Item;

/*  Reducers
============================================================================= */
const initReducer = (item: ItemType) => {
  let options: {[name: string]: string[]} = {};

  item.options.forEach(option => {
    options[option.name] = [];

    option.selections.forEach(
      selection =>
        selection.selected && options[option.name].push(selection.name),
    );

    return options[option.name];
  });

  return {
    options,
    price: item.price,
  };
};

const itemReducer = (state: any, action: any) => {
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
const ItemWrapper = styled.div`
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
  margin-bottom: 10px;
`;

const Name = styled.h1`
  font-size: 25px;
  color: var(--oxfordBlue);
  font-weight: 300;
`;

const Description = styled.p`
  font-size: 18px;
  color: var(--osloGrey);
  font-weight: 300;
`;
