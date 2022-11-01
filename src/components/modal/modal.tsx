import React,{useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {KEYCODE_ESC} from "../../utils/constain";

type TModal = {
  children: any,
  popupClose: () => void,
}

const Modal: React.FC<TModal> = ({children, popupClose}) => {
  const reactModal = document.getElementById('react-modals') as HTMLElement;

  useEffect(() => {
    function closeByEscape(evt: any) {
      if(evt.key === KEYCODE_ESC) {
        popupClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, []);

  return ReactDOM.createPortal (
    <>
      <ModalOverlay/>
      <div className={styles.popup}>
        <ul className={styles.form}>
          <button type="button" className={styles.close} onClick={popupClose}/>
          {children}
        </ul>
      </div>
    </>,reactModal
  );
};

export default Modal;
