import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from'./page-not-found.module.css'

function PageNotFound () {
  return (
    <div className={styles.not_found}>
      <h2 className={styles.not_found__title}>404</h2>
      <p className={styles.not_found__subtitle}>Страница не найдена</p>
      <NavLink className={styles.not_found__link} to='/'>Назад</NavLink>
    </div>
  )
}

export default PageNotFound;
