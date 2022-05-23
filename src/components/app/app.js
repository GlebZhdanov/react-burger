import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {API} from "../../utils/constain";
import Preloader from "../preloader/preloader";

const App = () => {
  const [isPopupOpenOrderAccpeted, setIsPopupOpenOrderAccpeted] = useState(false);
  const [isPopupOpenIngredientInfo, setIsPopupOpenIngredientInfo] = useState({open: false, dataIngredient: {}});
  const [dataBurger, setDataBurger] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API);
        const dataBurger = await res.json();
        let {data} = dataBurger;
        setDataBurger(data);
        setIsLoading(false)
      } catch (err) {
        console.log(`Ошибка получения данных: ${err.message}`)
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
              isClosePopup={popupClose}
              setIsPopupOpen={setIsPopupOpenIngredientInfo}
            />
            <BurgerConstructor
              setIsPopupOpen={popupOpenOrder}
              dataBurger={dataBurger}
              isPopupOpen={isPopupOpenOrderAccpeted}
              isClosePopup={popupClose}
            />
          </main>
        }
      </div>
  );
}

export default App;
