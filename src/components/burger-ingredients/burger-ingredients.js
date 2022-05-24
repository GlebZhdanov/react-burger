import React, {createRef, useRef, useMemo} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from "../burger-ingredients-list/ingredients-list";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details-popup/ingredient-details";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerIngredients = ({isPopupData, dataBurger, popupOpenIngredient, popupClose}) => {

  let {open} = isPopupData
  const [current, setCurrent] = React.useState('one');

  const filterDataMain = useMemo(() => {
    return dataBurger.filter(item => item.type == 'main');
  },[dataBurger])

  const filterDataBun = useMemo(() => {
    return dataBurger.filter(item => item.type == 'bun');
  },[dataBurger])

  const filterDataSauce = useMemo(() => {
    return dataBurger.filter(item => item.type == 'sauce');
  },[dataBurger])

  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  function mouseClickBun (value) {
    setCurrent(value);
    bunRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  function mouseClickSauce (value) {
    setCurrent(value);
    sauceRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  function mouseClickMain (value) {
    setCurrent(value);
    mainRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
      <section className={styles.ingredients}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={`${styles.tab} pt-5 pb-10`}>
          <Tab value="one" active={current === 'one'} onClick={mouseClickBun}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={mouseClickSauce}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={mouseClickMain}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <IngredientsList ref={bunRef} popupOpenIngredient={popupOpenIngredient} data={filterDataBun} title={'Булки'}/>
          <IngredientsList ref={mainRef} popupOpenIngredient={popupOpenIngredient} data={filterDataMain} title={'Начинки'}/>
          <IngredientsList ref={sauceRef} popupOpenIngredient={popupOpenIngredient} data={filterDataSauce} title={'Соусы'}/>
        </div>
        <Modal isPopupOpen={open} popupClose={popupClose}>
          <IngredientDetails popupClose={popupClose} isPopupData={isPopupData}/>
        </Modal>
      </section>
  );
};

BurgerIngredients.propTypes = {
  isPopupData:PropTypes.object.isRequired,
  dataBurger: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  popupOpenIngredient:PropTypes.func.isRequired,
  popupClose:PropTypes.func.isRequired,
};

export default BurgerIngredients;
