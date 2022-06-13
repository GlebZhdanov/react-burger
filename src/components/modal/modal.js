import React,{useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css'
import {KEYCODE_ESC} from "../../utils/constain";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {order} from "../../redux/order/selectors";

const Modal = ({isOpenPopup, popupClose, children }) => {
  const reactModal = document.getElementById('react-modals');

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === KEYCODE_ESC) {
        popupClose();
      }
    }
    if(isOpenPopup) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpenPopup])

  return ReactDOM.createPortal (
    <div onClick={popupClose} className={`${styles.popup} ${isOpenPopup ? styles.opened : ''}`}>
      <ModalOverlay/>
      <div onClick={(e) => e.stopPropagation()}>
       {children}
      </div>
    </div>,
    reactModal
  );
};

Modal.propTypes = {
  // isOpenPopup: PropTypes.bool.isRequired,
  popupClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
