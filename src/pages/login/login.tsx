import React, {FC, useEffect} from 'react';
import {EmailInput, PasswordInput,Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import {Link,useHistory,useLocation} from "react-router-dom";
import {authorizationUser} from "../../redux/main/actions";
import {useDispatch, useSelector} from "../../redux/hooks";

const Login: FC = () => {

  const {authorizationSuccess} = useSelector(state => state.main);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  }

  const [values, setValues] = React.useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent)  => {
    e.preventDefault();
    dispatch(authorizationUser(values));
  }

  useEffect(() => {
    // @ts-ignore
    const { from } = location.state || {from: {pathname: '/login'}};
    history.push(from);
  },[authorizationSuccess])

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={styles.ul}>
          <li id='login-text' className={`${styles.title} pb-6`}>
            Вход
          </li>
          <li className={'pb-6'}>
            <EmailInput id='email-input' onChange={handleInputChange} value={values.email} name={'email'}/>
          </li>
          <li className={'pb-6'}>
            <PasswordInput id='password-input' onChange={handleInputChange} value={values.password} name={'password'}/>
          </li>
          <li className={'pb-20'}>
            <Button htmlType='submit' type="primary" size="medium">
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
