import React, { useMemo, useEffect} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from "../burger-ingredients-list/ingredients-list";
import {useInView} from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details-popup/ingredient-details";
import {ingredientPropType} from "../../utils/prop-types";

const BurgerIngredients = ({isPopupData, dataBurger, popupOpenIngredient, popupClose}) => {

  let {open} = isPopupData

  const  { ref: refBun, inView: inViewBun}  =  useInView( {
      threshold: 0,
    }) ;
  const  { ref: refSauce, inView: inViewSauce }  =  useInView( {
    threshold: 1,
  }) ;
  const  { ref: refMain, inView: inViewMain }  =  useInView( {
    threshold: 1,
  }) ;

  useEffect(() => {
    if(inViewBun === true) {
      setCurrent('one')
    } else if(inViewSauce === true) {
      setCurrent('two')
    } else if(inViewMain === true) {
      setCurrent('three')
    }
  },[inViewBun, inViewMain, inViewSauce])

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

  return (
      <section className={styles.ingredients}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={`${styles.tab} pt-5 pb-10`}>
          <Tab value="one" active={current === 'one'}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <IngredientsList ref={refBun} popupOpenIngredient={popupOpenIngredient} data={filterDataBun} title={'Булки'}/>
          <IngredientsList ref={refSauce} popupOpenIngredient={popupOpenIngredient} data={filterDataSauce} title={'Соусы'}/>
          <IngredientsList ref={refMain} popupOpenIngredient={popupOpenIngredient} data={filterDataMain} title={'Начинки'}/>
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
