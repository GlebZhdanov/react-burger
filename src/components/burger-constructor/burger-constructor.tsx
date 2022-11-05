import React, {FC, useEffect, useState} from 'react';
import styles from './burger-constructor.module.css'
import image from '../../images/Subtract.svg'
import ConstructorList from "../burger-constructor-list/constructor-list";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-accpeted-popup/order-details";
import {useDispatch,useSelector} from "react-redux";
import {loadOrder} from "../../redux/order/actions";
import {ingredientDetails} from "../../redux/ingredient-details/selectors";
import {resetIngredients} from "../../redux/ingredient-details/actions";
import {main} from "../../redux/main/selectors";
import {useHistory} from "react-router-dom";

const BurgerConstructor: FC = () => {
  const [openPopupOrder, setOpenPopupOrder] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const {ingredient, bun} = useSelector(ingredientDetails);

  const { authorizationSuccess } = useSelector(main);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    // @ts-ignore
    const priceDataBurger: number = ingredient.map(i => i.price).reduce((sum: number, current: number) => sum + current, 0);

    if(bun) {
      const priceBun = bun.price * 2;
      setTotalPrice(priceDataBurger + priceBun);
    } else if(ingredient) {
      setTotalPrice(priceDataBurger)
    }
  },[ingredient, bun])
// @ts-ignore
  const ingredientId = ingredient.map(i => i._id);
  const receiveId = (bun: any) => {
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
    // @ts-ignore
    dispatch(loadOrder(dataOrderId));
    // @ts-ignore
    setOpenPopupOrder(true);
    // @ts-ignore
    dispatch(resetIngredients())
  }

  const closePopup = () => {
    setOpenPopupOrder(false)
  }

  return (
    <section className={`${styles.section} pt-25`}>
      <ConstructorList bun={bun} ingredient={ingredient}/>
      <div className={`${styles.container} pt-10`}>
        <div className={`${styles.content} pr-10`}>
          <p className={styles.count}>{totalPrice}</p>
          <img className={styles.image} src={image} />
        </div>
        <Button htmlType='button' type="primary" size="large"
        onClick={clickButtonPlaceOrder}>
          Оформить заказ
        </Button>
      </div>
      <OrderDetails closePopup={closePopup} openPopupOrder={openPopupOrder}/>
    </section>
  );
};

export default BurgerConstructor;
