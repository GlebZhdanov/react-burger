import React, {FC, useEffect} from 'react';
import styles from './order-accpeted.module.css'
import {useSelector} from "react-redux";
import {order} from "../../redux/order/selectors";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {KEYCODE_ESC} from "../../utils/constain";

type TOrderDetails = {
  openPopupOrder: boolean,
  closePopup: () => void,
}

const OrderDetails: FC<TOrderDetails> = ({openPopupOrder,closePopup}) => {

  const {orderNumber,orderError} = useSelector(order);
  function closeByEscape(evt: { key: string; }) {
    if(evt.key === KEYCODE_ESC) {
      closePopup();
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, []);

  return (
    <div className={`${styles.popup} ${openPopupOrder ? styles.opened : ''}`}>
      <ModalOverlay>
        {orderError ?
          <ul className={styles.form_error}>
            <li className={styles.title_error}>
              Произошла ошибка оформления заказа
            </li>
            <button type="button" className={styles.close} onClick={closePopup}/>
          </ul>
          :
          <ul className={styles.form}>
            <li className={`${styles.text} pt-30`}>
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
            <button type="button" className={styles.close} onClick={closePopup}/>
          </ul>
        }
      </ModalOverlay>
    </div>
  );
};

export default OrderDetails;
