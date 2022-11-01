import React,{useEffect} from 'react';
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css'
import {Link, useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {registrationUser} from "../../redux/main/actions";
import {main} from "../../redux/main/selectors";

const Register = () => {
  const history = useHistory()

  const dispatch = useDispatch();

  const {registrationSuccess, registrationRequest} = useSelector(main);

  const initialValues = {
    name: '',
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

  useEffect(() => {
    if(registrationSuccess) {
        history.push('/login')
    }
  },[registrationSuccess])

  const handleSubmit = (e) => {
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
            <Button htmlType='button' type="primary" size="medium">
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
