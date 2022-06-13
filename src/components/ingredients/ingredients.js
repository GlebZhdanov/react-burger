import React,{useContext,useMemo} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients.module.css'
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import {useDispatch,useSelector} from "react-redux";
import {addBun,addIngredient,addIngredientInfo} from "../../redux/ingredient-details/actions";
import {ingredientDetails} from "../../redux/ingredient-details/selectors";
// import {useDrag} from "react-dnd";

const Ingredients = ({item, setOpenPopupIngredient}) => {

    // const {id, content} = item;
    // const [] = useDrag({});


  const {ingredient, bun} = useSelector(ingredientDetails);

  const ingredientCounter = useMemo(() => {
    let counter = 0;
    ingredient.forEach((ingredient) => {
      if (ingredient._id === item._id) counter++;
    });
    return counter;
  }, [ingredient]);

  const dispatch = useDispatch()

  function clickIngredients() {
    if(item.type === 'bun') {
      dispatch(addBun(item))
    }
    dispatch(addIngredientInfo(item))
    dispatch(addIngredient(item))
    setOpenPopupIngredient()
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
          {item.type === 'bun'
            ?
            ''
            :
            <Counter count={ingredientCounter} size="default" />
          }
        </li>
      </ul>
  );
};

Ingredients.propTypes = {
  item: ingredientPropType.isRequired,
  popupOpenIngredient: PropTypes.func.isRequired
};

export default Ingredients;
