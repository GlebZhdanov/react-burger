import React, {FC} from 'react';
import styles from "./error-message.module.css";
import {useSelector} from "../../redux/hooks";

const ErrorMessage: FC = () => {

  const {dataError} = useSelector(state => state.burger);

  return (
    <div className={`${styles.error} ${dataError ? styles.opened : ''}`}>
      <p className={styles.text}>Что-то пошло не так. Повторите попытку позднее. </p>
    </div>
  );
};

export default ErrorMessage;
