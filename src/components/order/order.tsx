import React, {FC} from 'react';
import styles from './order.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../redux/hooks";
import {Route} from "react-router-dom";
import {TOrdersFeed} from "../../redux/types/data";
import {TIngredientData} from "../../utils/types";
import {cleanTheDate} from "../../utils/constain";

export type TOrder = {
  order: TOrdersFeed;
};

const Order: FC<TOrder> = ({order}) => {

  const {data} = useSelector((state) => state.burger);

  const {number, name, createdAt} = order;

  const timeOrder = cleanTheDate(createdAt);

  const ingredientsInfo = order.ingredients.reduce((acc, item) => {
    // @ts-ignore
    const ingredient = data.find((ing) => ing._id === item);
    if(ingredient) {
      // @ts-ignore
      acc.push(ingredient);
    }
    return acc;
  },[]);

  const priceDataOrder = ingredientsInfo.reduce((sum: number, i: any) => i.type === "bun" ? sum + 2 * i.price : sum + i.price, 0);

  const orderArrayInfo: Array<TIngredientData> = ingredientsInfo.slice(0, 6);

  return (
    <div className={styles.order}>
      <ul className={`${styles.container} p-6`}>
        <ul className={styles.info}>
          <li className="text text_type_digits-default">#{number}</li>
          <li className="text text_type_main-default text_color_inactive">
            {timeOrder}
          </li>
        </ul>
        <li className="text text_type_main-medium">{name}</li>
        <Route path='/profile/order'>
          <li className={`text_type_main-default ${styles.status}`}>
          {
            order.status === 'done' ? "Выполнен" : 'Готовится'
          }
          </li>
        </Route>
        <ul className={styles.content}>
          <ul className={styles.images}>
            {orderArrayInfo.map((i, index) =>
              index >= 5 ? (
                <ul className={styles.content_image} key={index}>
                    <img
                      src={i.image}
                      className={`${styles.image}`}
                      alt={i.name}
                      key={index}
                      style={{ opacity: 0.6 }}
                    />
                    <li className={`text text_type_main-default ${styles.visible}`}>+{ingredientsInfo.length - 5}</li>
                  </ul>
              ) : (
                <img
                    src={i.image}
                    className={styles.image}
                    alt={i.name}
                    key={index}
                  />
              )
            )}
          </ul>
          <ul className={styles.sale}>
            <li className="text text_type_digits-default">{priceDataOrder}</li>
            <CurrencyIcon type="primary" />
          </ul>
        </ul>
      </ul>
    </div>
  );
};

export default Order;
