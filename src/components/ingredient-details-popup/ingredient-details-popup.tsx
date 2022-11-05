import React, {FC} from 'react';
import {useSelector} from "react-redux";
import Modal from "../modal/modal";
import {burger} from "../../redux/ingredients/selectors";
import {useHistory, useParams} from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientDetailsPopup: FC = () => {
  const history = useHistory()

  const popupClose = () => {
    history.goBack();
  }

  const {data} = useSelector(burger);

  let {id} = useParams<{id: string}>();

  // @ts-ignore
  let ingredients = data.data.filter((i) => i._id === id)[0];

  return (
      <Modal popupClose={popupClose}>
        <IngredientDetails dataIngredients={ingredients}/>
      </Modal>
  );
};

export default IngredientDetailsPopup;
