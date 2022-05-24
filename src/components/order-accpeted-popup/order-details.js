import React from 'react';
import styles from './order-accpeted.module.css'
import PropTypes from "prop-types";

const OrderDetails = ({popupClose}) => {
  return (
      <ul className={styles.form}>
        <li className={`${styles.text} pt-30`}>
          123456
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
        <button type="button" className={styles.close}
                onClick={popupClose}/>
      </ul>
  );
};

OrderDetails.propTypes = {
  popupClose: PropTypes.func.isRequired,
};

export default OrderDetails;
