import React from 'react';
import styles from './order-accpeted.module.css'

const OrderAccpeted = ({isPopupOpen, isClosePopup, clickPopupEsp, closePopupEsp}) => {

  React.useEffect(() => {
    closePopupEsp(isPopupOpen);
    return (
      document.removeEventListener('keydown', (e) => clickPopupEsp(e))
    )
  }, [isPopupOpen]);

  return (
    <div className={`${styles.popup} ${isPopupOpen ? styles.opened : ''}`}>
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
        <button type="button" className={styles.close} onClick={isClosePopup} />
      </ul>
    </div>
  );
};

export default OrderAccpeted;
