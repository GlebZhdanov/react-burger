import React from 'react';
import {EmailInput, PasswordInput,Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import {Link,useHistory,useLocation} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {authorizationUser} from "../../redux/main/actions";

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  }

  const [values, setValues] = React.useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authorizationUser(values));
    const { from } = location.state || {from: {pathname: '/'}};
    history.push(from);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={styles.ul}>
          <li className={`${styles.title} pb-6`}>
            Вход
          </li>
          <li className={'pb-6'}>
            <EmailInput onChange={handleInputChange} value={values.email} name={'email'}/>
          </li>
          <li className={'pb-6'}>
            <PasswordInput onChange={handleInputChange} value={values.password} name={'password'}/>
          </li>
          <li className={'pb-20'}>
            <Button type="primary" size="medium">
              Войти
            </Button>
          </li>
          <li className={`${styles.text} pb-4`}>
            Вы - новый пользователь?
            <Link className={styles.link} to='/register'>
              Зарегистрироваться
            </Link>
          </li>
          <li className={styles.text}>
            Забыли пароль?
            <Link className={styles.link} to='/reset-password'>
              Восстановить пароль
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
