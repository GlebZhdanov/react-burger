import React,{useEffect,useState, Fragment} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import {Link,Route,Switch, useLocation, useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {getUser,loginOut,patchUser} from "../../redux/main/actions";
import {main} from "../../redux/main/selectors";

const Profile = () => {

  const history = useLocation();

  const dispatch = useDispatch();

  const historyReset = useHistory()

  const { logOutUserSuccess } = useSelector(main)

  const { name, email } = useSelector(main);

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    setDataUser({
        name: name,
        email: email,
    })
  }, [name, email])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser(dataUser))
  }

  const resetForm = (e) => {
    e.preventDefault();
    setDataUser({
      name: name,
      email: email,
    })
  }

  useEffect(() => {
    if(logOutUserSuccess === true) {
      historyReset.push('/login')
    }
  },[logOutUserSuccess])

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
                  <Link className={history.pathname === '/profile' ? styles.active_link : styles.link}  to='/profile'>
                    Профиль
                  </Link>
                </li>
                <li className={`${styles.title} pb-3 pt-3`}>
                  <Link className={history.pathname === '/profile/order' ? styles.active_link : styles.link} to='/profile/order'>
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
                      <Button type="secondary" size="medium" onClick={resetForm}>
                        Отмена
                      </Button>
                    </li>
                    <li>
                      <Button type="primary" size="medium" onClick={handleSubmit}>
                        Сохранить
                      </Button>
                    </li>
                  </ul>
                }
              </form>
            </Route>
            <Route path='/profile/order'>
                <h1 className={styles.title}>
                  История заказов
                </h1>
            </Route>
          </div>
        </Fragment>
      </Switch>
    </>
  );
};

export default Profile;
