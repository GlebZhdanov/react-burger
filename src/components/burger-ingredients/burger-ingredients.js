import React from 'react';
import styles from './burger-ingredients.module.css'
import {data} from '../../utils/constain'
import IngredientsList from "../burger-ingredients-list/ingredients-list";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredients = ({popupOpenIngredient}) => {
  const [current, setCurrent] = React.useState('one')

  const filterDataMain = data.filter(item => item.type == 'main');
  const filterDataBun = data.filter(item => item.type == 'bun');
  const filterDataSauce = data.filter(item => item.type == 'sauce')

  return (
      <section className={styles.ingredients}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={`pt-5 pb-10`} style={{ display: 'flex' }}>
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
          <IngredientsList popupOpenIngredient={popupOpenIngredient} data={filterDataMain} title={'Булки'}/>
          <IngredientsList popupOpenIngredient={popupOpenIngredient} data={filterDataBun} title={'Начинки'}/>
          <IngredientsList popupOpenIngredient={popupOpenIngredient} data={filterDataSauce} title={'Соусы'}/>
        </div>
      </section>
  );
};

export default BurgerIngredients;
