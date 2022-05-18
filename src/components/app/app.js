import React, {useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderAccpeted from "../order-accpeted-popup/order-accpeted";
import IngredientInfo from "../ingredient-info-popup/ingredient-info";
import {KEYCODE_ESC} from "../../utils/constain";

const App = () => {
  const [isPopupOpenOrderAccpeted, setIsPopupOpenOrderAccpeted] = useState(false);
  const [isPopupOpenIngredientInfo, setIsPopupOpenIngredientInfo] = useState({open: false, dataIngredient: {}});

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

  function clickPopupEsp(e) {
    if(e.key === KEYCODE_ESC) {
      popupClose()
    }
  }

  function closePopupEsp(popup) {
    if(popup === true) {
      document.addEventListener('keydown', (e) => clickPopupEsp(e))
    }
  }

  return (
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients
            popupOpenIngredient={popupOpenIngredient}
          />
          <BurgerConstructor/>
        </main>
        <OrderAccpeted
          closePopupEsp={closePopupEsp}
          clickPopupEsp={clickPopupEsp}
          isPopupOpen={isPopupOpenOrderAccpeted}
          isClosePopup={popupClose}
          setIsPopupOpen={setIsPopupOpenOrderAccpeted}/>
        <IngredientInfo
          closePopupEsp={closePopupEsp}
          clickPopupEsp={clickPopupEsp}
          isPopupData={isPopupOpenIngredientInfo}
          isClosePopup={popupClose}
          setIsPopupOpen={setIsPopupOpenIngredientInfo}
        />
      </div>
  );
}

export default App;
