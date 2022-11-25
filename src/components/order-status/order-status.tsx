import React from 'react';
import styles from './order-status.module.css'
import {useSelector} from "../../redux/hooks";

const OrderStatus = () => {
  const { feedOrders, total, totalToday } = useSelector(state => state.ws);

  let readyOrder: number[] = [];
  let preparingOrder: number[] = [];

  feedOrders.forEach((order: any) => (order.status === 'done') ? readyOrder.push(order.number) : preparingOrder.push(order.number))

  return (
    <div className={styles.main}>
      <ul className={styles.content_number}>
        <ul className={styles.container}>
          <li className="text text_type_main-medium">Готовы:</li>
          <ul className={styles.container_number}>
            {readyOrder.slice(0, 10).map((elem: number, index: number) => (
              <li className={`text text_type_digits-default order_active ${styles.order_active}`} key={index}>{elem}</li>
            ))}
          </ul>
        </ul>
        <ul className={styles.container}>
          <li className="text text_type_main-medium">В работе:</li>
          <ul className={styles.container_number}>
            {preparingOrder.slice(0, 10).map((elem: number, index: number) => (
              <li className="text text_type_digits-default" key={index}>{elem}</li>
            ))}
          </ul>
        </ul>
      </ul>
      <ul className={styles.content_order}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.shadow}`}>{total}</p>
      </ul>
      <ul className={styles.content_order}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.shadow}`}>{totalToday}</p>
      </ul>
    </div>
  );
};

export default OrderStatus;
