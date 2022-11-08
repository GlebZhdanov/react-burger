import React,{useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {KEYCODE_ESC} from "../../utils/constain";

type TModal = {
  children: React.ReactNode,
  popupClose: () => void,
}

const Modal: React.FC<TModal> = ({children, popupClose}) => {
  const reactModal = document.getElementById('react-modals') as HTMLElement;

  useEffect(() => {
    function closeByEscape(event: KeyboardEvent) {
      if(event.key === KEYCODE_ESC) {
        popupClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, []);

  const handleClosePopup = (event: React.SyntheticEvent) => {
    if (event.currentTarget === event.target) {
        popupClose();
    }
  };

  return ReactDOM.createPortal (
    <>
      <ModalOverlay>
        <div onClick={handleClosePopup} className={styles.popup}>
          <ul className={styles.form}>
            <button type="button" className={styles.close} onClick={popupClose}/>
            {children}
          </ul>
        </div>
      </ModalOverlay>
    </>,reactModal
  );
};

export default Modal;
