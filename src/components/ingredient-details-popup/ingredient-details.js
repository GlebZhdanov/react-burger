import React from 'react';
import styles from './ingredient-details.module.css'
import PropTypes from "prop-types";

const IngredientDetails = ({isPopupData, isClosePopup}) => {

  return (
      <ul className={styles.form}>
        <li className={`${styles.title} ml-10 mt-10`}>
          Детали ингредиента
        </li>
        <img className={styles.image} src={isPopupData.dataIngredient.image}/>
        <li className={`${styles.text} pt-5`}>
          {isPopupData.dataIngredient.name}
        </li>
        <ul className={`${styles.content} mt-9`}>
          <ul className={styles.container}>
            <li className={styles.text_container}>Калории,ккал</li>
            <li className={styles.count_container}>
              {isPopupData.dataIngredient.calories}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Белки, г</li>
            <li className={styles.count_container}>
              {isPopupData.dataIngredient.proteins}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Жиры, г</li>
            <li className={styles.count_container}>
              {isPopupData.dataIngredient.fat}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Углеводы, г</li>
            <li className={styles.count_container}>
              {isPopupData.dataIngredient.carbohydrates}
            </li>
          </ul>
        </ul>
        <button type="button" className={styles.close}
                onClick={isClosePopup}
        />
      </ul>
  );
};

IngredientDetails.propTypes = {
  isPopupData: PropTypes.object.isRequired,
  isClosePopup: PropTypes.func.isRequired
};

export default IngredientDetails;
