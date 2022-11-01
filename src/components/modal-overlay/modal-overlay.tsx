import React from 'react';
import styles from "./modal-overlay.module.css";

type Props = {
  children?: React.ReactNode
}

const ModalOverlay: React.FC<Props>= ({children}) => {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
