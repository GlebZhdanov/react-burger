import React, {FC, useMemo} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients.module.css'
import {useSelector} from "../../redux/hooks";
import {useDrag} from "react-dnd";
import {TIngredientData} from "../../utils/types";

type TIngredients ={
  item: TIngredientData
}

const Ingredients: FC<TIngredients> = ({item}) => {

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: item
  });
  const {ingredient, bun} = useSelector(state => state.ingredients);

  const ingredientCounter = useMemo(() => {
    let counter = 0;
    ingredient.forEach((ingredient: TIngredientData) => {
      if (ingredient._id === item._id) counter++;
    });
    return counter;
  }, [ingredient]);

  let bunCounter = useMemo(() => {
    if(bun) {
      let counter = 0;
      [bun].forEach((bun) => {
        if (bun._id === item._id) counter++;
      });
      return counter;
    }
  }, [bun]);


  return (
    <ul ref={dragRef} className={`${styles.container} pl-4 pt-6 pb-6`}>
      <li>
        <img className={styles.image} src={item.image}/>
      </li>
      <ul className={`${styles.content} p-1`}>
        <li className={styles.subtitle}>
          {item.price}
        </li>
        <li>
          <CurrencyIcon type={"primary"}/>
        </li>
      </ul>
      <li className={styles.name}>{item.name}</li>
      <li className={styles.count}>
        {item.type === 'bun'
          ?
          <Counter count={bunCounter!} size="default" />
          :
          <Counter count={ingredientCounter} size="default" />
        }
      </li>
    </ul>
  );
};

export default Ingredients;
