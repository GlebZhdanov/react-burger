import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Preloader from "../preloader/preloader";
import {api} from "../../utils/api";
import ErrorMessage from "../error-message/error-message";

const App = () => {
  const [isPopupOpenOrderAccpeted, setIsPopupOpenOrderAccpeted] = useState(false);
  const [isPopupOpenIngredientInfo, setIsPopupOpenIngredientInfo] = useState({open: false, dataIngredient: {}});
  const [dataBurger, setDataBurger] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFalse, setIsLoadingFalse] = useState(false);

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

  const popupOpenOrder = () => {
    setIsPopupOpenOrderAccpeted(true);
  }

  const popupOpenIngredient = (data) => {
    setIsPopupOpenIngredientInfo({open: true, dataIngredient: data});
  }

  const popupClose = () => {
    setIsPopupOpenOrderAccpeted(false);
    setIsPopupOpenIngredientInfo({open: false, dataIngredient: {}})
  }

  return (
      <div className={styles.app}>
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
              setIsPopupOpen={popupOpenOrder}
              dataBurger={dataBurger}
              isPopupOpen={isPopupOpenOrderAccpeted}
              popupClose={popupClose}
            />
          </main>
        }
      </div>
  );
}

export default App;
