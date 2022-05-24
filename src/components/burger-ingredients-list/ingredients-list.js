import React, { forwardRef, useRef } from 'react'
import Ingredients from "../ingredients/ingredients";
import styles from './ingredients-list.module.css'
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

const IngredientsList = React.forwardRef(({data, title, popupOpenIngredient}, ref) => {

  return (
    <>
    <h2 ref={ref} className={styles.title}>{title}</h2>
    <div className={`${styles.container} pb-10`}>
        {data
        .map((i, index) => (
            <Ingredients item={i} key={index}
            popupOpenIngredient={popupOpenIngredient}
            />
          ))}
      </div>
    </>
  );
});

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  popupOpenIngredient: PropTypes.func.isRequired
};

export default IngredientsList;
