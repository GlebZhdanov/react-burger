import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <BurgerIcon type="primary"/>
            <span className={styles.span}>Конструктор</span>
          </li>
          <li className={styles.li}>
            <ListIcon type="primary"/>
            <span className={styles.span}>Лента заказов</span>
          </li>
        </ul>
        <ul className={`${styles.ul} pr-10`}>
          <li>
            <Logo/>
          </li>
          <li className={styles.li}>
            <ProfileIcon type="primary"/>
            <span className={styles.span}>Личный кабинет</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
