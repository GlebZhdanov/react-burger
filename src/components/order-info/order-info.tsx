import React, {FC} from 'react';
import styles from "./order-info.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {cleanTheDate} from "../../utils/constain";
import {useSelector} from "../../redux/hooks";
import OrderIngredient from "../order-ingredients/order-ingredients";
import {TIngredientData} from "../../utils/types";
import {TOrder} from "../../redux/types/data";

type TOrderInfo = {
  order: TOrder,
}

const OrderInfo: FC<TOrderInfo> = ({order}) => {

  const {data} = useSelector((state) => state.burger);

  const timeOrder = cleanTheDate(order.createdAt);

  const ingredientsInfo = order.ingredients.reduce((acc, item) => {
    const ingredient = data.find((i) => i._id === item);
    if(ingredient) {
      // @ts-ignore
      acc.push(ingredient);
    }
    return acc;
  },[]);



  const filterIngredientsInfo = ingredientsInfo.filter((elem, pos) => {
    return ingredientsInfo.indexOf(elem) === pos;
  });

  const priceDataOrder = ingredientsInfo.reduce((sum: number, i: TIngredientData) => i.type === "bun" ? sum + 2 * i.price : sum + i.price, 0);

  const counter = (ingredient: { type: string; }) => {
    let count = 1;
    return ingredient.type === "bun" ? count + 1 : count;
  };

  return (
    <div className={styles.main}>
      <p className={`text text_type_digits-default ${styles.number} mb-10`}>
        #{order.number}
      </p>
      <h3 className={`text text_type_main-medium ${styles.name} mb-3`}>
        {order.name}
      </h3>
      <p className={`text text_type_main-default ${styles.status}`}>
        Выполнен
      </p>
      <p className={`text text_type_main-medium ${styles.structure} mb-6`}>
        Состав:
      </p>
      <div className={`${styles.content} custom-scroll`}>
        {filterIngredientsInfo
          .map((elem, index) => (
          <OrderIngredient counter={counter} burger={elem} key={index}/>
        ))}
      </div>
      <div className={`${styles.info} pl-4`}>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.period}`}
        >
          {timeOrder}
        </p>
        <div className={styles.sale}>
          <p className="text text_type_digits-default ">
            {priceDataOrder}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
