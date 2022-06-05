import React,{useContext} from 'react';
import {ConstructorElement , DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-list.module.css";
import {ContextApp} from "../../context/reducer";
import PlugIngredients from "../plug-ingredients/plug-ingridients";

const ConstructorList = () => {

  const {state} = useContext(ContextApp);

  return (
    <ul className={styles.container}>
      <li className='pl-6'>
        {state.bun
          ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${state.bun.name} (верх)`}
            price={state.bun.price}
            thumbnail={state.bun.image}
          />
          :
          <PlugIngredients typeTop={true}/>}
      </li>
      <ul className={styles.scroll}>
        {state.ingredient
        .filter(i => i.type !== 'bun')
        .map((i) => (
          <ul className={styles.content} key={i._id}>
            <li>
              <DragIcon type='primary'/>
            </li>
            <ConstructorElement
              text={i.name}
              thumbnail={i.image}
              price={i.price}
            />
          </ul>
        ))}
      </ul>
      <li className='pl-6'>
        {state.bun
          ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${state.bun.name} (низ)`}
            price={state.bun.price}
            thumbnail={state.bun.image}
          />
          :
          <PlugIngredients typeTop={false}/>}
      </li>
    </ul>
  );
};


export default ConstructorList;
