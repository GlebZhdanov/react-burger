import React from 'react';
import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import Modal from "../modal/modal";
import {burger} from "../../redux/ingredients/selectors";
import {useHistory, useParams} from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientDetailsPopup = () => {

  const history = useHistory()

  const popupClose = () => {
    history.goBack();
  }

  const {data} = useSelector(burger);

  let {id} = useParams();

  let ingredients = data.data.filter(i => i._id === id)[0];

  return (
    <>
      <Modal popupClose={popupClose}>
        <ul className={styles.form}>
        <IngredientDetails dataIngredients={ingredients}/>

        </ul>
      </Modal>
    </>
  );
};

export default IngredientDetailsPopup;
