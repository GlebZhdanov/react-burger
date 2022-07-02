import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link} from "react-router-dom";
import {useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {main} from "../../redux/main/selectors";
import {getCookie} from "../../utils/cookies";

const AppHeader = () => {
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isProfile = !!useRouteMatch('/profile');
  const accessToken = getCookie("accessToken");
  const {name} = useSelector(main);

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
            <Link to='/profile' className={isProfile ? styles.active_link : styles.span}>
              <li>
                <ProfileIcon type="primary"/>
              </li>
              <li className={`ml-1 mb-1`}>
                {accessToken
                  ?
                  name
                  :
                  'Личный кабинет'
                }
              </li>
            </Link>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
