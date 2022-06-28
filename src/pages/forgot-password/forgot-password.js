import React,{useEffect} from 'react';
import styles from './forgot-password.module.css'
import {Button,Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link,useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {recoveryPassword} from "../../redux/password/actions";
import {password} from "../../redux/password/selectors";

const ForgotPassword = () => {

  const dispatch = useDispatch();

  const {resetPassword} = useSelector(password)

  const initialValues = {
    password: '',
    code: ''
  }

  const [values, setValues] = React.useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const history = useHistory();

  console.log(resetPassword)

  useEffect(() => {
    if(resetPassword.length === 0) {
      history.push('/reset-password')
    }
  },[resetPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(recoveryPassword(values))
  }

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <ul className={styles.ul}>
            <li className={`${styles.title} pb-6`}>
              Восстановление пароля
            </li>
            <li className={'pb-6'}>
              <Input
                type={"password"}
                placeholder={"Введите новый пароль"}
                value={values.password}
                name={"password"}
                errorText={"Ошибка"}
                error={false}
                onChange={handleInputChange}
              />
            </li>
            <li className={'pb-6'}>
              <Input
                type={"text"}
                placeholder={"Введи код из письма"}
                value={values.code}
                name={"code"}
                errorText={"Ошибка"}
                error={false}
                onChange={handleInputChange}
              />
            </li>
            <li className={'pb-20'}>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </li>
            <li className={`${styles.text} pb-4`}>
              Вспомнили пароль?
              <Link className={styles.link} to='/login'>
                Войти
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
