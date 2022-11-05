import React, {FC} from 'react';
import styles from './preloader.module.css'

const Preloader: FC = () => {
  return (
    <div className={`${styles.loading} ${styles.bar}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
