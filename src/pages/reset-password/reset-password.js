import React,{useEffect} from 'react';
import styles from "./reset-password.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {password} from "../../redux/password/selectors";
import {recordPassword,resetPassword} from "../../redux/password/actions";

const ResetPassword = () => {
  const [value, setValue] = React.useState('')

  const history = useHistory();

  const dispatch = useDispatch();

  const { resetSuccess } = useSelector(password);

  useEffect(() => {
    if(resetSuccess) {
      history.push('/forgot-password')
    }
  },[resetSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(value));
    dispatch(recordPassword(value));
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
                type={"email"}
                placeholder={"Укажите e-mail"}
                value={value}
                name={"email"}
                errorText={"Ошибка"}
                error={false}
                onChange={(e) => setValue(e.target.value)}
              />
            </li>
            <li className={'pb-20'}>
              <Button disabled={!value} type="primary" size="medium">
                Восстановить
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

export default ResetPassword;
