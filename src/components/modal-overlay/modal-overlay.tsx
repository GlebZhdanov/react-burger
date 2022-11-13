import React, {FC} from 'react';
import styles from "./modal-overlay.module.css";

type TModalOverlay = {
  children: React.ReactNode,
  popupClose?: () => void,
}

const ModalOverlay: FC<TModalOverlay>= ({children, popupClose}) => {

  const handleClosePopup = () => {
    if (popupClose) {
      popupClose();
    }
  };

  return (
    <div onClick={handleClosePopup} className={styles.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
