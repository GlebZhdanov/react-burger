import React, {FC, useEffect} from 'react';
import styles from './forgot-password.module.css'
import {Button,Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link,useHistory} from "react-router-dom";
import {recoveryPassword} from "../../redux/password/actions";
import {useDispatch, useSelector} from "../../redux/hooks";

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();

  const {resetPassword} = useSelector(state => state.password)

  const initialValues = {
    password: '',
    code: ''
  }

  const [values, setValues] = React.useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const history = useHistory();

  useEffect(() => {
    if(resetPassword.length === 0) {
      history.push('/reset-password')
    }
  },[resetPassword])


  const handleSubmit = (e: React.FormEvent) => {
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
              <Button type="primary" size="medium" htmlType='submit'>
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
