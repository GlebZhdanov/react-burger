import React, {FC, useEffect, useState} from 'react';
import styles from './burger-constructor.module.css'
import image from '../../images/Subtract.svg'
import ConstructorList from "../burger-constructor-list/constructor-list";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-accpeted-popup/order-details";
import {useDispatch, useSelector} from "../../redux/hooks";
import {loadOrder} from "../../redux/order/actions";
import {resetIngredients} from "../../redux/ingredient-details/actions";
import {useHistory} from "react-router-dom";
import Modal from "../modal/modal";
import {TDataOrderId, TIngredientData} from '../../utils/types';

const BurgerConstructor: FC = () => {
  const [openPopupOrder, setOpenPopupOrder] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {ingredient, bun} = useSelector((store) => store.ingredients);

  const {authorizationSuccess} = useSelector(state => state.main);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const priceDataBurger = ingredient.map((i) => i.price).reduce((sum, current) => sum + current, 0);
    if (bun) {
      const priceBun = bun.price * 2;
      setTotalPrice(priceDataBurger + priceBun);
    } else if (ingredient) {
      setTotalPrice(priceDataBurger)
    }
  }, [ingredient, bun])

  const ingredientId = ingredient.map((i) => i._id);

  const receiveId = (bun: TIngredientData | null) => {
    if(bun) {
      return [bun._id]
    }
  }

  const bunId = receiveId(bun);

  // @ts-ignore
  const dataIngredientId = ingredientId.concat(bunId);
  const dataOrderId: TDataOrderId ={
    "ingredients": dataIngredientId
  }

  const clickButtonPlaceOrder = () => {
    if(!authorizationSuccess) {
      return history.push('/login')
    }
    dispatch(loadOrder(dataOrderId));
    setOpenPopupOrder(true);
    dispatch(resetIngredients())
  }

  const closePopup = () => {
    setOpenPopupOrder(false);
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
      {openPopupOrder &&
        <Modal popupClose={closePopup}>
          <OrderDetails/>
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;
