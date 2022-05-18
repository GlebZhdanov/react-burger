import React from 'react';
import styles from './ingredient-info.module.css'

const IngredientInfo = ({isPopupData, isClosePopup, clickPopupEsp, closePopupEsp}) => {
  React.useEffect(() => {
    closePopupEsp(isPopupData.open);
    return (
      document.removeEventListener('keydown', (e) => clickPopupEsp(e))
    )
  }, [isPopupData.open]);

  return (
    <div className={`${styles.popup} ${isPopupData.open ? styles.opened : ''}`}>
      <ul className={styles.form}>
        <li className={`${styles.title} ml-10 mt-10`}>
          Детали ингредиента
        </li>
        <li/>
        <img className={styles.image} src={isPopupData.dataIngredient.image}/>
        <li className={`${styles.text} pt-5`}>
          {isPopupData.dataIngredient.name}
        </li>
        <button type="button" className={styles.close} onClick={isClosePopup} />
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
      </ul>
    </div>
  );
};

export default IngredientInfo;
