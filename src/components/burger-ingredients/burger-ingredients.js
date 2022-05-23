import React from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from "../burger-ingredients-list/ingredients-list";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details-popup/ingredient-details";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerIngredients = ({isPopupData, dataBurger, popupOpenIngredient, isClosePopup,}) => {

  let {open} = isPopupData

  const [current, setCurrent] = React.useState('one')
  const filterDataMain = dataBurger.filter(item => item.type == 'main');
  const filterDataBun = dataBurger.filter(item => item.type == 'bun');
  const filterDataSauce = dataBurger.filter(item => item.type == 'sauce');

  return (
      <section className={styles.ingredients}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={`${styles.tab} pt-5 pb-10`}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <IngredientsList popupOpenIngredient={popupOpenIngredient} data={filterDataBun} title={'Булки'}/>
          <IngredientsList popupOpenIngredient={popupOpenIngredient} data={filterDataMain} title={'Начинки'}/>
          <IngredientsList popupOpenIngredient={popupOpenIngredient} data={filterDataSauce} title={'Соусы'}/>
        </div>
        <Modal isPopupOpen={open} isClosePopup={isClosePopup}>
          <IngredientDetails isClosePopup={isClosePopup} isPopupData={isPopupData}/>
        </Modal>
      </section>
  );
};

BurgerIngredients.propTypes = {
  isPopupData:PropTypes.object.isRequired,
  dataBurger: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  popupOpenIngredient:PropTypes.func.isRequired,
  isClosePopup:PropTypes.func.isRequired,
};

export default BurgerIngredients;
