import React from 'react';
import styles from './plug-bun.module.css'

const PlugBuns = ({typeTop}) => {

  return (
    <div className={`${styles.constructor_element} ${typeTop ? styles.constructor_element_pos_top : styles.constructor_element_pos_bottom}`}>
      <span className={styles.constructor_element__row}>
        <span className={styles.constructor_element__text}>
          Добавьте булку
        </span>
      </span>
    </div>
  );
};

export default PlugBuns;
