import React, {FC} from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Link, useHistory} from "react-router-dom";
import {useRouteMatch} from "react-router-dom";
import {getCookie} from "../../utils/cookies";
import {useSelector} from "../../redux/hooks";

const AppHeader: FC = () => {
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isConstructorFeed = !!useRouteMatch({ path: '/feed', exact: true});
  const isProfile = !!useRouteMatch('/profile');
  const accessToken = getCookie("accessToken");
  const {name} = useSelector(state => state.main);
  const history = useHistory();

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
            <Link to='/feed' className={isConstructorFeed ? styles.active_link : styles.span}>
              Лента заказов
            </Link>
          </li>
        </ul>
        <ul className={`${styles.ul} pr-10`}>
          <li className={styles.link} onClick={() => history.push('/')}>
            <Logo/>
          </li>
            <Link to='/profile' className={isProfile ? styles.active_link : styles.span}>
              <li>
                <ProfileIcon type="primary"/>
              </li>
              <li id='user' className={`ml-1 mb-1`}>
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
