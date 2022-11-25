import React, {useEffect, useState, Fragment, FC} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import {Link, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {loginOut, patchUser} from "../../redux/main/actions";
import {getCookie} from "../../utils/cookies";
import {useDispatch, useSelector} from "../../redux/hooks";
import {TUserInfo} from "../../utils/types";
import ProfileOrder from "../profile-order/profile-order";

const Profile: FC = () => {

  const history = useHistory();

  const location = useLocation();

  const dispatch = useDispatch();

  const { name, email } = useSelector(state => state.main);

  const accessToken = getCookie("accessToken");

  const [dataUser, setDataUser] = useState<TUserInfo>({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if(!accessToken) {
      history.push("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    setDataUser({
        name: name,
        email: email,
    })
  }, [name, email])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(patchUser(dataUser))
  }

  const resetForm = (e: React.FormEvent) => {
    e.preventDefault();
    setDataUser({
      name: name,
      email: email,
    })
  }

  const logOut = () => {
    dispatch(loginOut());
  }

  return (
    <>
      <Switch>
        <Fragment>
          <div className={styles.content}>
            <nav className={`${styles.nav} mr-15`}>
              <ul className={styles.container}>
                <li className={`${styles.title} pb-3 pt-3`}>
                  <Link className={location.pathname === '/profile' ? styles.active_link : styles.link}  to='/profile'>
                    Профиль
                  </Link>
                </li>
                <li className={`${styles.title} pb-3 pt-3`}>
                  <Link className={location.pathname === '/profile/order-page-feed' ? styles.active_link : styles.link} to='/profile/order'>
                    История заказов
                  </Link>
                </li>
                <li onClick={logOut} className={`${styles.title} pb-3 pt-3`}>
                  Выход
                </li>
                <li className={`${styles.text} pt-20`}>
                  В этом разделе вы можете изменить свои персональные данные
                </li>
              </ul>
            </nav>
            <Route path='/profile' exact={true}>
              <form className={styles.form}>
                <ul className={styles.container}>
                  <li className={'pb-6'}>
                    <Input
                      type={'text'}
                      placeholder={"Имя"}
                      onChange={handleInputChange}
                      icon={"EditIcon"}
                      value={dataUser.name || ''}
                      name={"name"}
                      error={false}
                      errorText={"Ошибка"}
                    />
                  </li>
                  <li className={'pb-6'}>
                    <Input
                      type={'email'}
                      placeholder={"Логин"}
                      onChange={handleInputChange}
                      icon={"EditIcon"}
                      value={dataUser.email || ''}
                      name={"email"}
                      error={false}
                      errorText={"Ошибка"}
                    />
                  </li>
                  <li className={'pb-6'}>
                    <Input
                      type={'password'}
                      placeholder={"Пароль"}
                      onChange={handleInputChange}
                      icon={"EditIcon"}
                      value={dataUser.password || ''}
                      name={"password"}
                      error={false}
                      errorText={"Ошибка"}
                    />
                  </li>
                </ul>
                {name === dataUser.name && email === dataUser.email ?
                  ''
                  :
                  <ul className={styles.container_button}>
                    <li>
                      <Button htmlType='button' type="secondary" size="medium" onClick={resetForm}>
                        Отмена
                      </Button>
                    </li>
                    <li>
                      <Button htmlType='button' type="primary" size="medium" onClick={handleSubmit}>
                        Сохранить
                      </Button>
                    </li>
                  </ul>
                }
              </form>
            </Route>
            <Route path='/profile/order'>
                <ProfileOrder/>
            </Route>
          </div>
        </Fragment>
      </Switch>
    </>
  );
};

export default Profile;
