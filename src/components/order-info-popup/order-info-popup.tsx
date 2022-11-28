import React, {FC} from 'react';
import {useHistory,useParams} from "react-router-dom";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";
import {useSelector} from "../../redux/hooks";
import Preloader from "../preloader/preloader";
import {TOrder} from "../../redux/types/data";

const OrderInfoPopup:FC = () => {

  const { feedOrders, userOrders } = useSelector(state => state.ws);

  const history = useHistory()

  let {id} = useParams<{id?: string}>();

  const popupClose = () => {
    history.goBack();
  }

  function orderHandler(feedOrders: Array<TOrder>, userOrders: Array<TOrder>){
    if(feedOrders.length !== 0) {
      return feedOrders.filter((i) => i._id === id)[0]
    } if (userOrders.length !== 0) {
      return userOrders.filter((i) => i._id === id)[0]
    }
    return {}
  }

  let order = orderHandler(feedOrders, userOrders);

  return (
    <Modal popupClose={popupClose}>
      {feedOrders.length === 0 && userOrders.length === 0
        ?
        <Preloader/>
        :
        // @ts-ignore
        <OrderInfo order={order}/>
      }
    </Modal>
  );
};

export default OrderInfoPopup;
