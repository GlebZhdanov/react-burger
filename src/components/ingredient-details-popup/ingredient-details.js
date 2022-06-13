import React from 'react';
import styles from './ingredient-details.module.css'
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {ingredientDetails} from "../../redux/ingredient-details/selectors";

const IngredientDetails = ({popupClose}) => {

  const {ingredientInfo} = useSelector(ingredientDetails);

  return (
    <ul className={styles.form}>
    {ingredientInfo ?
      <>
        <li className={`${styles.title} ml-10 mt-10`}>
          Детали ингредиента
        </li>
        <img className={styles.image} src={ingredientInfo.image}/>
        <li className={`${styles.text} pt-5`}>
          {ingredientInfo.name}
        </li>
        <ul className={`${styles.content} mt-9`}>
          <ul className={styles.container}>
            <li className={styles.text_container}>Калории,ккал</li>
            <li className={styles.count_container}>
              {ingredientInfo.calories}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Белки, г</li>
            <li className={styles.count_container}>
              {ingredientInfo.proteins}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Жиры, г</li>
            <li className={styles.count_container}>
              {ingredientInfo.fat}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Углеводы, г</li>
            <li className={styles.count_container}>
              {ingredientInfo.carbohydrates}
            </li>
          </ul>
        </ul>
        <button type="button" className={styles.close} onClick={popupClose}/>
      </>
      :
      <></>
    }
    </ul>
  );
};

IngredientDetails.propTypes = {
  isPopupData: PropTypes.object.isRequired,
  popupClose: PropTypes.func.isRequired
};

export default IngredientDetails;
