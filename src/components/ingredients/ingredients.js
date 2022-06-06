import React,{useContext} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients.module.css'
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import {ContextApp} from "../../context/ContextApp";

const Ingredients = ({item, popupOpenIngredient}) => {
  const {setReducer, setIsDataBun} = useContext(ContextApp);

  function clickIngredients() {
    if(item.type === 'bun') {
      setIsDataBun(item)
    }
    popupOpenIngredient(item)
    setReducer()
  }

  return (
      <ul className={`${styles.container} pl-4 pt-6 pb-6`}>
        <li>
          <img className={styles.image} src={item.image} onClick={clickIngredients}/>
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
          <Counter count={1} size="default" />
        </li>
      </ul>
  );
};

Ingredients.propTypes = {
  item: ingredientPropType.isRequired,
  popupOpenIngredient: PropTypes.func.isRequired
};

export default Ingredients;
