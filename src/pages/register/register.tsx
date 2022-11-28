import React, {FC, useEffect} from 'react';
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css'
import {Link, useHistory} from "react-router-dom";
import {registrationUser} from "../../redux/main/actions";
import {useDispatch, useSelector} from "../../redux/hooks";
import { TUserRegistration} from "../../utils/types";

const Register: FC = () => {
  const history = useHistory()

  const dispatch = useDispatch();

  const {registrationSuccess} = useSelector(state => state.main);

  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const [values, setValues] = React.useState<TUserRegistration>(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if(registrationSuccess) {
        history.push('/login')
    }
  },[registrationSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registrationUser(values));
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <ul className={styles.ul}>
          <li className={`${styles.title} pb-6`}>
            Регистрация
          </li>
          <li className={'pb-6'}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              value={values.name}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              onChange={handleInputChange}
            />
          </li>
          <li className={'pb-6'}>
            <EmailInput
              onChange={handleInputChange}
              value={values.email}
              name={'email'}/>
          </li>
          <li className={'pb-6'}>
            <PasswordInput
              onChange={handleInputChange}
              value={values.password}
              name={'password'}/>
          </li>
          <li className={'pb-20'}>
            <Button htmlType='submit' type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </li>
          <li className={`${styles.text} pb-4`}>
            Уже зарегистрированы?
            <Link className={styles.link} to='/login'>
              Войти
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
