import React from 'react';
import Ingredients from "../ingredients/ingredients";
import styles from './ingredients-list.module.css'
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

const IngredientsList = ({ data, title, popupOpenIngredient }) => {
  return (
    <>
    <h2 className={styles.title}>{title}</h2>
    <div className={`${styles.container} pb-10`}>
        {data
        .map((i) => (
            <Ingredients item={i} key={i._id}
            popupOpenIngredient={popupOpenIngredient}
            />
          ))}
      </div>
    </>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  title: PropTypes.string.isRequired
};

export default IngredientsList;
