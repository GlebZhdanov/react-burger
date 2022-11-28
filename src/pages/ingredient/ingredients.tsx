import React, {FC} from 'react';
import styles from './ingredients.module.css'
import {useParams} from "react-router-dom";
import {useSelector} from "../../redux/hooks";

const IngredientsPage: FC = () => {
  const {data} = useSelector(state => state.burger);

  let {id} = useParams<{id?: string}>();

  let ingredients = data.filter(i => i._id === id)[0];

  if(!ingredients) {
    return (
      <>
        <h1 className={styles.text_error}>Ингредиента не найдено</h1>
      </>
    )
  }

  return (
    <main className={styles.section}>
      <ul className={styles.form}>
        <li className={`${styles.title} ml-10 mt-10`}>
          Детали ингредиента
        </li>
        <img className={styles.image} src={ingredients.image}/>
        <li className={`${styles.text} pt-5`}>
          {ingredients.name}
        </li>
        <ul className={`${styles.content} mt-9`}>
          <ul className={styles.container}>
            <li className={styles.text_container}>Калории,ккал</li>
            <li className={styles.count_container}>
              {ingredients.calories}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Белки, г</li>
            <li className={styles.count_container}>
              {ingredients.proteins}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Жиры, г</li>
            <li className={styles.count_container}>
              {ingredients.fat}
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.text_container}>Углеводы, г</li>
            <li className={styles.count_container}>
              {ingredients.carbohydrates}
            </li>
          </ul>
        </ul>
      </ul>
    </main>
  );
};

export default IngredientsPage;
