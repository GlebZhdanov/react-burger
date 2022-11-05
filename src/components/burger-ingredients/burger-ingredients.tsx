import React, {useMemo, useEffect, FC} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientsList from "../burger-ingredients-list/ingredients-list";
import {useInView} from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {useSelector} from "react-redux";
import {burger} from "../../redux/ingredients/selectors";

const BurgerIngredients: FC = () => {
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
    if(inViewBun) {
      setCurrent('one')
    } else if(inViewSauce) {
      setCurrent('two')
    } else if(inViewMain) {
      setCurrent('three')
    }
  },[inViewBun, inViewMain, inViewSauce])

  const [current, setCurrent] = React.useState<string>('one');

  const filterDataMain= useMemo(() => {
    // @ts-ignore
    return data.data.filter((item) => item.type == 'main');
  },[data])
  const filterDataBun = useMemo(() => {
    // @ts-ignore
    return data.data.filter((item) => item.type == 'bun');
  },[data])
  const filterDataSauce = useMemo(() => {
    // @ts-ignore
    return data.data.filter((item) => item.type == 'sauce');
  },[data])

  return (
      <section className={styles.ingredients}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={`${styles.tab} pt-5 pb-10`}>
          <Tab value="one" active={current === 'one'} onClick={() => setCurrent('one')}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={() => setCurrent('two')}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={() => setCurrent('three')}>
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <IngredientsList
            ref={refBun}
            // @ts-ignore
            data={filterDataBun}
            title={'Булки'}/>
          <IngredientsList
            ref={refSauce}
            // @ts-ignore
            data={filterDataSauce}
            title={'Соусы'}/>
          <IngredientsList
            ref={refMain}
            // @ts-ignore
            data={filterDataMain}
            title={'Начинки'}/>
        </div>
      </section>
  );
};

export default BurgerIngredients;
