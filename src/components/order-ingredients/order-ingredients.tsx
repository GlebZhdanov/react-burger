import React, {FC} from 'react';
import styles from './order-ingredients.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredientData} from "../../utils/types";

type TOrderIngredient = {
  burger: TIngredientData,
  counter: any
}

const OrderIngredient: FC<TOrderIngredient> = ({burger, counter}) => {
  return (
    <div className={`${styles.content} custom-scroll p-4`}>
      <div className={styles.container}>
        <img src={burger.image} alt={burger.name} className={styles.image}/>
        <p className={`text text_type_main-default ${styles.name}`}>{burger.name}</p>
      </div>
      <div className={styles.sale}>
        <p className="text text_type_digits-default">
          {counter(burger)} x {burger.price}
        </p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

export default OrderIngredient;
