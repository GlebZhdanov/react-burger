import React, {useEffect, useReducer, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Preloader from "../preloader/preloader";
import {api} from "../../utils/api";
import ErrorMessage from "../error-message/error-message";
import {ContextApp} from "../../context/reducer";
import PlugIngredients from "../plug-ingredients/plug-ingridients";

const App = () => {
  const [isPopupOpenOrderAccpeted, setIsPopupOpenOrderAccpeted] = useState(false);
  const [isPopupOpenIngredientInfo, setIsPopupOpenIngredientInfo] = useState({open: false, dataIngredient: {}});
  const [isDataBun, setIsDataBun] = useState({});
  const [dataBurger, setDataBurger] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFalse, setIsLoadingFalse] = useState(false);
  const [isLoadingFalseOrder, setIsLoadingFalseOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState({});

  //Временное решение на добавление заказа при клике на ингредиент
  const initialState = {
    ingredient: [],
    bun: null
  };

  const reducer = (state, action) => {
    switch(action.type) {
      case 'add_ingredient':
        return {
          ingredient: [ ...state.ingredient, isPopupOpenIngredientInfo.dataIngredient].filter(item => item.type !== 'bun'),
          bun: isDataBun
        };
      case 'reset_ingredient':
        return {
          ingredient: [],
          bun: null
        };
      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function setReducer() {
    dispatch({
      type: 'add_ingredient',
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const dataBurger = await api.getIngredients();
          let {data} = dataBurger;
          setDataBurger(data);
          setIsLoading(false);
      } catch (err) {
        setIsLoadingFalse(true);
      }
    }
    getData();
  },[])

  const postOrder = async () => {
    const dataOrderId ={
      "ingredients": dataBurger.map(i => i._id)
    }
    try {
      const dataOrder = await api.postOrder(dataOrderId);
      let {success, order} = dataOrder;
      if(success === true) {
        setOrderNumber(order);
        dispatch({
          type: 'reset_ingredient',
        })
      }
    } catch (err) {
      setIsLoadingFalseOrder(true)
    }
  }

  const popupOpenOrder = () => {
    setIsPopupOpenOrderAccpeted(true);
  }

  const popupOpenIngredient = (data) => {
    setIsPopupOpenIngredientInfo({open: true, dataIngredient: data});
  }


  const popupClose = () => {
    setIsPopupOpenOrderAccpeted(false);
    setIsPopupOpenIngredientInfo({open: false, dataIngredient: {}});
    setOrderNumber({})
  }

  return (
      <div className={styles.app}>
        <ContextApp.Provider value={{state, setReducer, setIsDataBun, postOrder,                 orderNumber}}>
          <ErrorMessage isLoadingFalse={isLoadingFalse}/>
          <AppHeader/>
          {isLoading ?
            <>
              <Preloader/>
            </>
            :
            <main className={styles.main}>
              <BurgerIngredients
                isPopupData={isPopupOpenIngredientInfo}
                dataBurger={dataBurger}
                popupOpenIngredient={popupOpenIngredient}
                popupClose={popupClose}
                setIsPopupOpen={setIsPopupOpenIngredientInfo}
              />
              <BurgerConstructor
                postOrder={postOrder}
                setIsPopupOpen={popupOpenOrder}
                dataBurger={dataBurger}
                isPopupOpen={isPopupOpenOrderAccpeted}
                popupClose={popupClose}
                isLoadingFalseOrder={isLoadingFalseOrder}
              />
            </main>
          }
        </ContextApp.Provider>
      </div>
  );
}

export default App;
