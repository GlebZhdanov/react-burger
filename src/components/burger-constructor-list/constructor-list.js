import React,{useContext} from 'react';
import {ConstructorElement , DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-list.module.css";
import {ContextApp} from "../../context/ContextApp";
import PlugIngredients from "../plug-ingredients/plug-ingridients";

const ConstructorList = ({bun, ingredient}) => {

  return (
    <ul className={styles.container}>
      <li className='pl-6'>
        {bun
          ?
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
          :
          <PlugIngredients typeTop={true}/>}
      </li>
      <ul className={styles.scroll}>
        {ingredient
        .filter(i => i.type !== 'bun')
        .map((i, index) => (
          <ul className={styles.content} key={index}>
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
        {bun
          ?
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
          :
          <PlugIngredients typeTop={false}/>}
      </li>
    </ul>
  );
};


export default ConstructorList;
