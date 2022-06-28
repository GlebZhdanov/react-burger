import React from 'react'
import Ingredients from "../ingredients/ingredients";
import styles from './ingredients-list.module.css'
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import {useLocation, Link} from "react-router-dom";

const IngredientsList = React.forwardRef(({data, title}, ref) => {
  let location = useLocation();

  return (
    <>
      <h2  className={styles.title}>{title}</h2>
      <div ref={ref} className={`${styles.container} pb-10`}>
          {data
          .map((i) => (
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

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
};

export default IngredientsList;

