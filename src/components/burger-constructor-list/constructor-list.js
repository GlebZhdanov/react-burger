import React from 'react';
import {ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-list.module.css";
import { v4 as uuid } from "uuid";
import {useDrop} from "react-dnd";
import {addBun,addIngredient} from "../../redux/ingredient-details/actions";
import {useDispatch} from "react-redux";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import PlugBun from "../plug-bun/plug-bun";
import PlugIngredients from "../plug-ingredients/plug-Ingredients";

const ConstructorList = ({bun, ingredient}) => {
  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if(item.type === 'bun') {
        dispatch(addBun(item))
      }
      dispatch(addIngredient({...item, key: uuid()}))
    }
  })

  return (
    <ul ref={dropRef} className={styles.container}>
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
          <PlugBun typeTop={true}/>}
      </li>
      <ul className={styles.scroll}>
        {ingredient.length !== 0
        ?
          ingredient.map((i, index) => (
          <BurgerConstructorItem
            key={i.key}
            data={i}
            index={index}
            id={i.key}
          />
        ))
        :
          <PlugIngredients/>
        }
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
          <PlugBun typeTop={false}/>}
      </li>
    </ul>
  );
};


export default ConstructorList;
