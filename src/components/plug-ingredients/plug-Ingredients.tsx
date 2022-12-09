import React, {FC} from 'react';
import styles from './plug-Ingredients.module.css'

const PlugIngredients: FC = () => {

  return (
    <ul id='container' className={styles.constructor_element}>
      <li className={styles.constructor_element__text}>
        Добавьте ингредиенты
      </li>
    </ul>
  );
};

export default PlugIngredients;
