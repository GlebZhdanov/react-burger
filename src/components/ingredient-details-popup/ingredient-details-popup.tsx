import React, {FC} from 'react';
import {useSelector} from "../../redux/hooks";
import Modal from "../modal/modal";
import {useHistory, useParams} from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientDetailsPopup: FC = () => {
  const history = useHistory()

  const popupClose = () => {
    history.goBack();
  }

  const {data} = useSelector(state => state.burger);

  let {id} = useParams<{id: string}>();

  let ingredients = data.filter((i) => i._id === id)[0];

  return (
    <Modal popupClose={popupClose}>
      <IngredientDetails dataIngredients={ingredients}/>
    </Modal>
  );
};

export default IngredientDetailsPopup;
