import React,{useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {KEYCODE_ESC} from "../../utils/constain";
import PropTypes from "prop-types";

const Modal = ({children, popupClose}) => {
  const reactModal = document.getElementById('react-modals');

  useEffect(() => {
    function closeByEscape(evt) {
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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  popupClose: PropTypes.func.isRequired,
};

export default Modal;
