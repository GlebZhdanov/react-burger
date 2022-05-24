import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {KEYCODE_ESC} from "../../utils/constain";
import PropTypes from "prop-types";

const Modal = ({isPopupOpen,popupClose, children }) => {

  const reactModal = document.getElementById('react-modals');

  function clickPopupEsp(e) {
    if(e.key === KEYCODE_ESC) {
      popupClose()
    }
  }

  function closePopupEsp(popup) {
    if(popup === true) {
      document.addEventListener('keydown', (e) => clickPopupEsp(e))
    }
  }

  React.useEffect(() => {
    closePopupEsp(isPopupOpen);
    return (
      document.removeEventListener('keydown', (e) => clickPopupEsp(e))
    )
  }, [isPopupOpen]);

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
