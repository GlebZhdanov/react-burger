import React,{useContext} from 'react';
import styles from './order-accpeted.module.css'
import PropTypes from "prop-types";
import {ContextApp} from "../../context/reducer";

const OrderDetails = ({popupClose, isLoadingFalseOrder}) => {

  const {orderNumber} = useContext(ContextApp)
  return (
    <>
      {isLoadingFalseOrder ?
        <ul className={styles.form_error}>
          <li className={styles.title_error}>
            Произошла ошибка оформления заказа
          </li>
          <button type="button" className={styles.close}
            onClick={popupClose}/>
        </ul>
        :
        <ul className={styles.form}>
          <li className={`${styles.text} pt-30`}>
            {orderNumber.number}
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
      }
    </>
  );
};

OrderDetails.propTypes = {
  popupClose: PropTypes.func.isRequired,
  isLoadingFalseOrder: PropTypes.bool.isRequired
};

export default OrderDetails;
