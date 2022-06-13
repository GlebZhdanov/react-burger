import React, {useEffect, useReducer, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import {loadIngredients} from "../../redux/ingredients/actions";
import {useDispatch,useSelector} from "react-redux";
import {burger} from "../../redux/ingredients/selectors";
import {deleteOrder} from "../../redux/order/actions";

const App = () => {
  const [openPopupOrder, setOpenPopupOrder] = useState(false);
  const [openPopupIngredient, setOpenPopupIngredient] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients())
  },[])

  const {dataLoading} = useSelector(burger);

  const popupOpenIngredient = (data) => {
    setOpenPopupIngredient(true);
  }

  const popupClose = () => {
    setOpenPopupIngredient(false)
    setOpenPopupOrder(false)
    dispatch(deleteOrder())
  }
  return (
      <div className={styles.app}>
        <ErrorMessage/>
        <AppHeader/>
          {dataLoading ?
            <main className={styles.main}>
              <BurgerIngredients
                openPopupIngredient={openPopupIngredient}
                setOpenPopupIngredient={popupOpenIngredient}
                popupClose={popupClose}/>
              <BurgerConstructor
                openPopupOrder={openPopupOrder}
                setOpenPopupOrder={setOpenPopupOrder}
                popupClose={popupClose}/>
            </main>
            :
            <>
             <Preloader/>
            </>
          }
      </div>
  );
}

export default App;
