import React from 'react';
import styles from './burger-constructor.module.css'
import image from '../../images/Subtract.svg'
import ConstructorList from "../burger-constructor-list/constructor-list";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderAccpeted from "../order-accpeted-popup/order-details";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerConstructor = ({setIsPopupOpen, dataBurger, isPopupOpen, isClosePopup}) => {

  const priceDataBurger = dataBurger.map(i => i.price).reduce((sum, current) => sum + current, 0);

  return (
    <section className={`${styles.constructor} pt-25`}>
      <ConstructorList data={dataBurger}/>
      <div className={`${styles.container} pt-10`}>
        <div className={`${styles.content} pr-10`}>
          <p className={styles.count}>{priceDataBurger}</p>
          <img className={styles.image} src={image}/>
        </div>
        <Button type="primary" size="large"
        onClick={setIsPopupOpen}>
          Оформить заказ
        </Button>
      </div>
      <Modal isPopupOpen={isPopupOpen} isClosePopup={isClosePopup}>
        <OrderAccpeted isClosePopup={isClosePopup}/>
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  setIsPopupOpen:PropTypes.func.isRequired,
  dataBurger: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  isPopupOpen:PropTypes.bool.isRequired,
  isClosePopup:PropTypes.func.isRequired,
};

export default BurgerConstructor;
