import React, {FC} from 'react';
import styles from './order-accpeted.module.css'
import {useSelector} from "../../redux/hooks";

const OrderDetails: FC = () => {

  const {orderNumber,orderError} = useSelector(state => state.order);

  return (
    <>
      {orderError ?
        <ul className={styles.form_error}>
          <li className={styles.title_error}>
            Произошла ошибка оформления заказа
          </li>
        </ul>
        :
        <ul className={styles.form}>
          <li id='order-number' className={`${styles.text} pt-30`}>
            {orderNumber}
          </li>
          <li className={`${styles.title} pt-8`}>
            идентификатор заказа
          </li>
          <li className={`${styles.image} mt-15`}/>
          <li className={`${styles.status} pt-15`}>
            Ваш заказ начали готовить
          </li>
          <li className={`${styles.info} pt-2`}>
            Дождитесь готовности на орбитальной станции
          </li>
        </ul>
      }
    </>
  );
};

export default OrderDetails;
