import React,{useContext,useEffect,useState} from 'react';
import styles from './burger-constructor.module.css'
import image from '../../images/Subtract.svg'
import ConstructorList from "../burger-constructor-list/constructor-list";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-accpeted-popup/order-details";
import PropTypes from "prop-types";
import {ContextApp} from "../../context/ContextApp";

const BurgerConstructor = ({setIsPopupOpen, isPopupOpen, popupClose, isLoadingFalseOrder}) => {

  const [totalPrice, setTotalPrice] = useState(0);
  const {state, postOrder} = useContext(ContextApp)

  useEffect(() => {
    const priceDataBurger = state.ingredient.map(i => i.price).reduce((sum, current) => sum + current, 0);

    if(state.bun) {
      const priceBun = state.bun.price * 2;
      setTotalPrice(priceDataBurger + priceBun);
    } else if(state.ingredient) {
      setTotalPrice(priceDataBurger)
    }
  },[state])

  const clickButtonPlaceOrder = () => {
    setIsPopupOpen();
    postOrder();
  }

  return (
    <section className={`${styles.constructor} pt-25`}>
      <ConstructorList />
      <div className={`${styles.container} pt-10`}>
        <div className={`${styles.content} pr-10`}>
          <p className={styles.count}>{totalPrice}</p>
          <img className={styles.image} src={image}/>
        </div>
        <Button type="primary" size="large"
        onClick={clickButtonPlaceOrder}>
          Оформить заказ
        </Button>
      </div>
      <Modal isPopupOpen={isPopupOpen} popupClose={popupClose}>
        <OrderDetails isLoadingFalseOrder={isLoadingFalseOrder} popupClose={popupClose}/>
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  setIsPopupOpen:PropTypes.func.isRequired,
  isPopupOpen:PropTypes.bool.isRequired,
  popupClose:PropTypes.func.isRequired,
  isLoadingFalseOrder: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
