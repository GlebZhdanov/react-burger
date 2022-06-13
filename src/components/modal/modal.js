import React,{useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {KEYCODE_ESC} from "../../utils/constain";
import PropTypes from "prop-types";

const Modal = ({isPopupOpen,popupClose, children }) => {

  const reactModal = document.getElementById('react-modals');

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === KEYCODE_ESC) {
        popupClose();
      }
    }
    if(isPopupOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isPopupOpen])

  return ReactDOM.createPortal (
    <div onClick={popupClose} className={`${styles.popup} ${isPopupOpen ? styles.opened : ''}`}>
      <ModalOverlay/>
      <div onClick={(e) => e.stopPropagation()}>
       {children}
      </div>
    </div>,
    reactModal
  );
};

Modal.propTypes = {
  isPopupOpen: PropTypes.bool.isRequired,
  popupClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
