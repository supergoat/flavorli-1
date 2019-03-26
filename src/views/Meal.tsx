import React, {useState, useReducer, createContext} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import SelectOptions from '../components/SelectOptions';
import SelectQuantity from '../components/SelectQuantity';
import AddToOrder from '../components/AddToOrder';
import Modal from '../templates/ModalPage';

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

interface MealType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
  mealId?: number;
}
const MealView = ({mealId}: Props) => {
  const meal = mealList[mealId || 0];
  const [state, dispatch] = useReducer(mealReducer, meal, initReducer);
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
        value={{selected: state.options, default: meal.options}}
      >
        <MealWrapper>
          <Image
            src={require(`../assets/meals/${meal.image}`)}
            alt={meal.name}
          />
          <Name>{meal.name}</Name>
          <Description>{meal.description}</Description>
          <SelectOptions onSelection={onSelection} />
          <SelectQuantity qty={qty} setQty={setQty} />
          <AddToOrder price={state.price * qty} />
        </MealWrapper>
      </OptionsContext.Provider>
    </Modal>
  );
};

/*  Export
============================================================================= */
export default MealView;

/*  Reducers
============================================================================= */
const initReducer = (meal: MealType) => {
  let options: {[name: string]: string[]} = {};

  meal.options.forEach(option => {
    options[option.name] = [];

    option.selections.forEach(
      selection =>
        selection.selected && options[option.name].push(selection.name),
    );

    return options[option.name];
  });

  return {
    options,
    price: meal.price,
  };
};

const mealReducer = (state: any, action: any) => {
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
const MealWrapper = styled.div`
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

export const mealList: MealType[] = [
  {
    id: 0,
    name: 'Farfalle alla Boscaiola',
    description: `Pasta alla Boscaiola, "Woodman’s Pasta", is a classic Italian
      dish that combines mushrooms, pancetta, parmesan and cream to create an
      earthy, creamy sauce.`,
    price: 9.0,
    image: 'farfalle_alla_boscaiola.jpg',
    options: [
      {
        name: 'Ingredients',
        freeSelections: 3,
        selections: [
          {name: 'Mushrooms', price: 0.5, selected: true},
          {name: 'Pancetta', price: 0.5, selected: true},
          {name: 'Parmesan Cheese', price: 0.5, selected: true},
        ],
      },
    ],
  },
  {
    id: 1,
    name: 'Bucatini all’Amatriciana',
    description: `Traditional Italian pasta with bacon,
      pecorino cheese and tomato sauce. Originating from the town of
      Amatrice, the Amatriciana is one of the best known pasta sauces in Roman
      and Italian cuisine.`,
    price: 9.0,
    image: 'bucatini_all_amatriciana.jpg',
    options: [
      {
        name: 'Ingredients',
        freeSelections: 2,
        selections: [
          {name: 'Bacon', price: 0.5, selected: true},
          {name: 'Pecorino Cheese', price: 0.5, selected: true},
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Spaghetti alla Puttanesca',
    description: `Italian pasta with tomatoes, olive oil, anchovies, olives,
      capers and garlic. Spaghetti alla puttanesca was invented in Naples in the
      mid-20th century.`,
    price: 9.0,
    image: 'spaghetti_alla_puttanesca.jpg',
    options: [
      {
        name: 'Ingredients',
        freeSelections: 4,
        selections: [
          {name: 'Olives', price: 0.5, selected: true},
          {name: 'Anchovies', price: 0.5, selected: true},
          {name: 'Cappers', price: 0.5, selected: true},
          {name: 'Parmesan', price: 0.5, selected: true},
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Zucchine e tonno pasta',
    description: `Italian pasta with zucchini and tuna. This is a family
      favourite italian dish that is simple yet absolutely delicious.`,
    price: 8.0,
    image: 'zucchine_e_tonno.jpg',
    options: [
      {
        name: 'Ingredients',
        freeSelections: 1,
        selections: [{name: 'Parmesan', price: 0.5, selected: false}],
      },
    ],
  },
  {
    id: 4,
    name: 'Farfalle al salmone',
    description: `Farfalle pasta with chunks of tender Salmon with a creamy
      sauce that tastes as good as it looks.`,
    price: 10.0,
    image: 'farfalle_al_salmone.jpg',
    options: [
      {
        name: 'Ingredients',
        freeSelections: 1,
        selections: [{name: 'Parmesan', price: 0.5, selected: false}],
      },
    ],
  },
];
