import React, {FC} from 'react';
import styles from "./error-message.module.css";
import {useSelector} from "react-redux";
import {burger} from "../../redux/ingredients/selectors";

const ErrorMessage: FC = () => {
  const {dataError} = useSelector(burger);

  return (
    <div className={`${styles.error} ${dataError ? styles.opened : ''}`}>
      <p className={styles.text}>Что-то пошло не так. Повторите попытку позднее. </p>
    </div>
  );
};

export default ErrorMessage;
