import React from 'react'
import Ingredients from "../ingredients/ingredients";
import styles from './ingredients-list.module.css'
import {useLocation, Link} from "react-router-dom";
import {TIngredientData} from "../../utils/types";

type TIngredientsList = {
  data: Array<TIngredientData>,
  title: string,
}

const IngredientsList = React.forwardRef<HTMLDivElement, TIngredientsList>(({data, title}, ref) => {
  let location = useLocation();
  return (
    <>
      <h2  className={styles.title}>{title}</h2>
      <div ref={ref} className={`${styles.container} pb-10`}>
          {data
          .map((i: any) => (
            <Link className={styles.link}
              key={i._id}
            to={{
              pathname: `/ingredients/${i._id}`,
              state: { background: location }
            }}
            >
              <Ingredients item={i}/>
            </Link>
            ))}
        </div>
    </>
  );
});

export default IngredientsList;
