import React, {useState, useReducer, createContext} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import SelectOptions from '../components/SelectOptions';
import SelectQuantity from '../components/SelectQuantity';
import AddToOrder from '../components/AddToOrder';
import Modal from '../templates/ModalPage';
import Dietary from '../components/Dietary';
import Button from '../ui/Button';

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

const ADD_TO_ORDER = gql`
  mutation addToOrder($restaurant: Restaurant, $orderItem: OrderItem!) {
    addToOrder(restaurant: $restaurant, orderItem: $orderItem) @client
  }
`;

interface Props extends RouteComponentProps {
  item: ItemType;
  onCloseItem: () => void;
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
  activeOrderRestaurant: {
    id: number;
    name: string;
  };
}
const Item = ({
  item,
  restaurant,
  activeOrderRestaurant,
  onCloseItem,
}: Props) => {
  const [state, dispatch] = useReducer(itemReducer, item, initReducer);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  let selections: string[] = [];

  Object.values(state.options).forEach((option: any) => {
    option.forEach((option: any) => {
      selections.push(option);
    });
  });

  return (
    <Mutation
      mutation={ADD_TO_ORDER}
      variables={{
        restaurant: {
          __typename: 'Restaurant',
          ...restaurant,
        },
        orderItem: {
          __typename: 'OrderItem',
          name: item.name,
          price: state.price,
          selections,
          quantity: qty,
        },
      }}
    >
      {(addToOrder, {loading, error}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>An error occurred</p>;

        return (
          <Modal>
            <ItemWrapper>
              {showConfirmation ? (
                <>
                  <h1>Start new order?</h1>

                  <ConfirmationMessage>
                    Are you sure you want to start a new order with
                    <span>{restaurant.name}</span>?
                    <br />
                    Your order with
                    <span>{activeOrderRestaurant.name}</span> will be lost
                  </ConfirmationMessage>

                  <ConfirmationButtons>
                    <Button
                      width={'25%'}
                      secondary
                      onClick={() => {
                        setShowConfirmation(false);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      width={'70%'}
                      onClick={() => {
                        setShowConfirmation(false);
                        addToOrder();
                        onCloseItem();
                      }}
                    >
                      Start new order
                    </Button>
                  </ConfirmationButtons>
                </>
              ) : (
                <OptionsContext.Provider
                  value={{selected: state.options, default: item.options}}
                >
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
                  <AddToOrder
                    price={state.price * qty}
                    onCancel={onCloseItem}
                    onClick={() => {
                      if (
                        activeOrderRestaurant.id !== -1 &&
                        activeOrderRestaurant.id !== restaurant.id
                      ) {
                        setShowConfirmation(true);
                        return;
                      }
                      addToOrder();
                      onCloseItem();
                    }}
                  />
                </OptionsContext.Provider>
              )}
            </ItemWrapper>
          </Modal>
        );
      }}
    </Mutation>
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

const ConfirmationMessage = styled.p`
  margin: 15px 0 20px;
  line-height: 1.5em;
  color: var(--osloGrey);

  span {
    margin: 0 5px;
    font-size: 16px;
    color: var(--oxfordBlue);
  }
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-between;
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
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 18px;
  color: var(--osloGrey);
  font-weight: 300;
`;
