import React, {FC} from 'react';
import styles from './ingredient-details.module.css'
import {TIngredientData} from "../../utils/types";

type TIngredientDetails = {
  dataIngredients: TIngredientData
}

const IngredientDetails: FC<TIngredientDetails> = ({dataIngredients}) => {

  return (
      <>
        <li id='title-ingredient-modal' className={`${styles.title} ml-10 mt-10`}>
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

export default IngredientDetails;
