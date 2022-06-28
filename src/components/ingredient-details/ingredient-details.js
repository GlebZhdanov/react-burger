import React from 'react';
import styles from './ingredient-details.module.css'
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {ingredientDetails} from "../../redux/ingredient-details/selectors";
import {ingredientPropType} from "../../utils/prop-types";

const IngredientDetails = ({dataIngredients}) => {

  return (
      <>
        <li className={`${styles.title} ml-10 mt-10`}>
          Детали ингредиента
        </li>
        <img className={styles.image} src={dataIngredients.image}/>
        <li className={`${styles.text} pt-5`}>
          {dataIngredients.name}
        </li>
        <ul className={`${styles.content} mt-9`}>
          <ul className={styles.container}>
            <li className={styles.text_container}>Калории,ккал</li>
            <li className={styles.count_container}>
              {dataIngredients.calories}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Белки, г</li>
            <li className={styles.count_container}>
              {dataIngredients.proteins}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Жиры, г</li>
            <li className={styles.count_container}>
              {dataIngredients.fat}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Углеводы, г</li>
            <li className={styles.count_container}>
              {dataIngredients.carbohydrates}
            </li>
          </ul>
        </ul>
      </>
  );
};

IngredientDetails.propTypes = {
  dataIngredients: ingredientPropType.isRequired,
};

export default IngredientDetails;
