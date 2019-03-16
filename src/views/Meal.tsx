import React, {useState, useEffect, useReducer} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import SelectOptions from '../components/SelectOptions';
import SelectQuantity from '../components/SelectQuantity';
import AddToOrder from '../components/AddToOrder';

const optionsReducer = (state: {[category: string]: string[]}, action: any) => {
  const categoryOptions = state[action.categoryName] || [];
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        ...state,
        [action.categoryName]:
          action.price > 0 ? [...categoryOptions, action.name] : [action.name],
      };
    case 'REMOVE_OPTION':
      if (action.price === 0) return state;
      return {
        ...state,
        [action.categoryName]: categoryOptions.filter(c => c !== action.name),
      };
    default:
      return state;
  }
};

const mealReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        options: optionsReducer(state.options, action),
        price: state.price + action.price,
      };
    case 'REMOVE_OPTION':
      return {
        options: optionsReducer(state.options, action),
        price: state.price - action.price,
      };
    default:
      return state;
  }
};
interface MealType {
  id: number;
  name: string;
  description: string;
  price: number;
  options: {
    [category: string]: {
      name: string;
      price: number;
    }[];
  };
}
interface Props extends RouteComponentProps {
  mealId?: number;
}
const MealView = ({mealId}: Props) => {
  const [state, dispatch] = useReducer(mealReducer, {options: {}, price: 0});
  const [meal, setMeal] = useState<MealType | undefined>(undefined);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchMeal = (_: number) => {
      setMeal(myMeal);
    };

    if (!mealId) return;
    fetchMeal(mealId);
  }, [mealId]);

  const onSelectOption = (option: {
    categoryName: string;
    name: string;
    price: number;
  }) => {
    const isSelected =
      state.options[option.categoryName] &&
      state.options[option.categoryName].includes(option.name);

    const type = !isSelected ? 'ADD_OPTION' : 'REMOVE_OPTION';

    dispatch({
      type,
      ...option,
    });
  };

  return (
    <MealWrapper>
      {meal && (
        <Meal>
          <Name>{meal.name}</Name>
          <Description>{meal.description}</Description>
          <SelectOptions
            selectedOptions={state.options}
            options={meal.options}
            onSelectOption={onSelectOption}
          />
          <SelectQuantity qty={qty} setQty={setQty} />
          <AddToOrder price={(meal.price + state.price) * qty} />
        </Meal>
      )}
    </MealWrapper>
  );
};

export default MealView;

/* Styled Components
============================================================================= */
const MealWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  padding: 5% 0;
  z-index: 1;
`;

const Meal = styled.div`
  background: var(--white);
  height: auto;
  padding: 15px;
  width: 95%;
  max-width: 450px;
  border-radius: 3px;
  margin: 0 auto;
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

const myMeal = {
  id: 4,
  name: 'Chicken Butterfly',
  description: `Two succulent chicken breasts joined by crispy skin.`,
  price: 8.25,
  options: {
    'Choose Spice': [
      {
        name: 'Extra Hot',
        price: 0,
      },
      {
        name: 'Hot',
        price: 0,
      },
      {
        name: 'Lemon & Herb',
        price: 0,
      },
    ],
    'Add a sauce': [
      {
        name: 'Hot PERi-PERi Sauce 125ml',
        price: 1.9,
      },
      {
        name: 'Extra Extra Hot PERi-PERi Sauce 125ml',
        price: 2.2,
      },
      {
        name: 'Garlic PERi-PERi Sauce 125ml',
        price: 1.9,
      },
    ],
  },
};
