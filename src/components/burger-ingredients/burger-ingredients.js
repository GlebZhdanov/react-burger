import React,{useMemo,useEffect} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from "../burger-ingredients-list/ingredients-list";
import {useInView} from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {useSelector} from "react-redux";
import {burger} from "../../redux/ingredients/selectors";

const BurgerIngredients = () => {

  const {data} = useSelector(burger)

  const [ refBun, inViewBun ] = useInView( {
    "threshold": 0
    }) ;
  const [ refSauce, inViewSauce ] = useInView( {
    "threshold": 0
  });
  const [ refMain, inViewMain ] = useInView( {
    "threshold": 0
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
    return data.data.filter(item => item.type == 'main');
  },[data])

  const filterDataBun = useMemo(() => {
    return data.data.filter(item => item.type == 'bun');
  },[data])

  const filterDataSauce = useMemo(() => {
    return data.data.filter(item => item.type == 'sauce');
  },[data])

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
          <Tab value="three" active={current === 'three'} >
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <IngredientsList ref={refBun} data={filterDataBun} title={'Булки'}/>
          <IngredientsList ref={refSauce} data={filterDataSauce} title={'Соусы'}/>
          <IngredientsList ref={refMain} data={filterDataMain} title={'Начинки'}/>
        </div>
      </section>
  );
};

export default BurgerIngredients;
