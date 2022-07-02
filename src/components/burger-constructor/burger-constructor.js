import React,{useEffect,useState} from 'react';
import styles from './burger-constructor.module.css'
import image from '../../images/Subtract.svg'
import ConstructorList from "../burger-constructor-list/constructor-list";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-accpeted-popup/order-details";
import PropTypes from "prop-types";
import {useDispatch,useSelector} from "react-redux";
import {loadOrder} from "../../redux/order/actions";
import {ingredientDetails} from "../../redux/ingredient-details/selectors";
import {resetIngredients} from "../../redux/ingredient-details/actions";
import {main} from "../../redux/main/selectors";
import {useHistory} from "react-router-dom";

const BurgerConstructor = ({openPopupOrder, setOpenPopupOrder}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const {ingredient, bun} = useSelector(ingredientDetails);

  const { authorizationSuccess } = useSelector(main);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const priceDataBurger = ingredient.map(i => i.price).reduce((sum, current) => sum + current, 0);

    if(bun) {
      const priceBun = bun.price * 2;
      setTotalPrice(priceDataBurger + priceBun);
    } else if(ingredient) {
      setTotalPrice(priceDataBurger)
    }
  },[ingredient, bun])

  const ingredientId = ingredient.map(i => i._id);
  const receiveId = () => {
    if(bun) {
      return [bun._id]
    }
  }
  const bunId = receiveId(bun)
  const dataIngredientId = ingredientId.concat(bunId);
  const dataOrderId ={
    "ingredients": dataIngredientId
  }

  const clickButtonPlaceOrder = () => {
    if(authorizationSuccess === false) {
      return history.push('/login')
    }
    dispatch(loadOrder(dataOrderId));
    setOpenPopupOrder(true);
    dispatch(resetIngredients())
  }

  const closePopup = () => {
    setOpenPopupOrder(false)
  }

  return (
    <section className={`${styles.constructor} pt-25`}>
      <ConstructorList bun={bun} ingredient={ingredient}/>
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
      <OrderDetails closePopup={closePopup} openPopupOrder={openPopupOrder}/>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openPopupOrder:PropTypes.bool.isRequired,
  popupClose:PropTypes.func.isRequired,
  setOpenPopupOrder: PropTypes.func.isRequired
};

export default BurgerConstructor;
