import React from 'react';
import styles from "./error-message.module.css";

const ErrorMessage = ({isLoadingFalse}) => {
  return (
    <div className={`${styles.error} ${isLoadingFalse ? styles.opened : ''}`}>
      <p className={styles.text}>Что-то пошло не так. Повторите попытку позднее. </p>
    </div>
  );
};

export default ErrorMessage;
