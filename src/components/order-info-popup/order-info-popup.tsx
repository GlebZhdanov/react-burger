import React, {FC} from 'react';
import {useHistory,useParams} from "react-router-dom";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";
import {useSelector} from "../../redux/hooks";
import {TIngredientData} from "../../utils/types";

const OrderInfoPopup:FC = () => {

  const { feedOrders, userOrders } = useSelector(state => state.ws);

  const history = useHistory()

  let {id} = useParams<{id?: string}>();

  const popupClose = () => {
    history.goBack();
  }

  let orderHandler = (feedOrders: Array<TIngredientData> | any[], userOrders: Array<TIngredientData> | any[]) => {
    if(feedOrders.length !== 0) {
      return feedOrders.filter((i) => i._id === id)[0]
    } if (userOrders.length !== 0) {
      return userOrders.filter((i) => i._id === id)[0]
    }
  }

  let order = orderHandler(feedOrders, userOrders);

  return (
    <Modal popupClose={popupClose}>
      <OrderInfo order={order}/>
    </Modal>
  );
};

export default OrderInfoPopup;
