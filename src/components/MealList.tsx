import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import MealItem from './MealItem';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
}
const MealList = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    setMeals(mealList);
  }, []);

  return (
    <MealListWrapper>
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </MealListWrapper>
  );
};

export default MealList;

/* Styled Components
============================================================================= */
const MealListWrapper = styled.div`
  padding: 0 3px;
`;

export const mealList: Meal[] = [
  {
    id: 0,
    name: 'Farfalle alla Boscaiola',
    description: `Pasta alla Boscaiola, "Woodman’s Pasta", is a classic Italian
      dish that combines mushrooms, pancetta, parmesan and cream to create an
      earthy, creamy sauce.`,
    price: 9.0,
  },
  {
    id: 10,
    name: 'Farfalle alla Boscaiola',
    description: `Pasta alla Boscaiola, "Woodman’s Pasta", is a classic Italian
      dish that combines mushrooms, pancetta, parmesan and cream to create an
      earthy, creamy sauce.`,
    price: 9.0,
  },
  {
    id: 1,
    name: 'Bucatini all’Amatriciana',
    description: `Traditional Italian pasta with bacon,
      pecorino cheese and tomato sauce. Originating from the town of
      Amatrice, the Amatriciana is one of the best known pasta sauces in Roman
      and Italian cuisine.`,
    price: 9.0,
  },
  {
    id: 2,
    name: 'Spaghetti alla Puttanesca',
    description: `Italian pasta with tomatoes, olive oil, anchovies, olives,
      capers and garlic. Spaghetti alla puttanesca was invented in Naples in the
      mid-20th century.`,
    price: 9.0,
  },
  {
    id: 3,
    name: 'Zucchine e tonno pasta',
    description: `Italian pasta with zucchini and tuna. This is a family
      favourite italian dish that is simple yet absolutely delicious.`,
    price: 8.0,
  },
  {
    id: 4,
    name: 'Farfalle al salmone',
    description: `Farfalle pasta with chunks of tender Salmon with a creamy
      sauce that tastes as good as it looks.`,
    price: 10.0,
  },
];
