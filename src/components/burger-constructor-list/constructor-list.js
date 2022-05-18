import React from 'react';
import PropTypes from 'prop-types';
import {ConstructorElement , DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import image from '../../images/bun.svg'
import styles from "./constructor-list.module.css";
import {ingredientPropType} from "../../utils/prop-types";

const ConstructorList = ({ data }) => {
  return (
    <ul className={styles.container}>
      <li className='pl-6'>
        <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={image}
        />
      </li>
      <ul className={styles.scroll}>
        {data.map((i) => (
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
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={image}
        />
      </li>
    </ul>
  );
};



ConstructorList.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default ConstructorList;
