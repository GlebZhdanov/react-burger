import React from 'react';
import styles from './plug-bun.module.css'
import PropTypes from "prop-types";

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

PlugBuns.propTypes = {
  typeTop: PropTypes.bool.isRequired,
};

export default PlugBuns;
