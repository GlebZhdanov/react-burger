import React, {FC} from 'react';
import styles from "./modal-overlay.module.css";

type Props = {
  children?: React.ReactNode
}

const ModalOverlay: FC<Props>= ({children}) => {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
