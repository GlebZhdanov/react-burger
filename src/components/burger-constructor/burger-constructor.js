import React from 'react';
import styles from './burger-constructor.module.css'
import image from '../../images/Subtract.svg'
import ConstructorList from "../burger-constructor-list/constructor-list";
import {data} from "../../utils/constain";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = () => {
  let dataBurger = data;
  let priceDataBurger = data.map(i => i.price).reduce((sum, current) => sum + current, 0);
  return (
    <section className={`${styles.constructor} pt-25`}>
      <ConstructorList data={dataBurger}/>
      <div className={`${styles.container} pt-10`}>
        <div className={`${styles.content} pr-10`}>
          <p className={styles.count}>{priceDataBurger}</p>
          <img className={styles.image} src={image}/>
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
