import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link} from "react-router-dom";
import {useRouteMatch} from "react-router-dom";

const AppHeader = () => {

  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isProfile = !!useRouteMatch('/profile');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <BurgerIcon type="primary"/>
            <Link to='/' className={isConstructor ? styles.active_link : styles.span}>
              Конструктор
            </Link>
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
            <Link to='/profile' className={isProfile ? styles.active_link : styles.span}>
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
