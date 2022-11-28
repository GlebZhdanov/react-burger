import React, {FC, useEffect} from 'react';
import {useDispatch,useSelector} from "../../redux/hooks";
import {ORDERS_CONNECT,ORDERS_DISCONNECT} from "../../redux/types/action";
import {SERVER_BASE_URL_USER_ORDER} from "../../utils/constain";
import {useParams} from "react-router-dom";
import Preloader from "../../components/preloader/preloader";
import OrderInfo from "../../components/order-info/order-info";
import {getCookie} from "../../utils/cookies";

const OrderPageProfile: FC = () => {

  const token = getCookie('accessToken') || '';

  const dispatch = useDispatch()

  const {userOrders} = useSelector(state => state.ws);

  useEffect(() => {
    dispatch({
      type: ORDERS_CONNECT,
      payload: SERVER_BASE_URL_USER_ORDER + `?token=${token.replace('Bearer ','')}`
    });

    return () => {
      dispatch({
        type: ORDERS_DISCONNECT
      })
    }
  },[dispatch]);

  let {id} = useParams<{id?: string}>();

  let order = userOrders.filter((i) => i._id === id)[0];

  return (
    <>
      {userOrders.length === 0
        ?
        <Preloader/>
        :
        <OrderInfo order={order}/>
      }
    </>
  );
};

export default OrderPageProfile;
