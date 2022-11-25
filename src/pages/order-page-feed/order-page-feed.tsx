import React, {FC, useEffect} from 'react';
import styles from './order-page-feed.module.css'
import OrderInfo from "../../components/order-info/order-info";
import {useDispatch,useSelector} from "../../redux/hooks";
import {useParams} from "react-router-dom";
import {FEED_CONNECT,FEED_DISCONNECT} from "../../redux/types/action";
import {SERVER_BASE_URL} from "../../utils/constain";
import Preloader from "../../components/preloader/preloader";

const OrderPageFeed: FC = () => {

  const dispatch = useDispatch()

  const { feedOrders } = useSelector(state => state.ws);

  useEffect(() => {
    dispatch({
      type: FEED_CONNECT,
      payload: SERVER_BASE_URL
    });

    return () => {
      dispatch({
        type: FEED_DISCONNECT
      })
    }
  },[dispatch])


  let {id} = useParams<{id?: string}>();

  let order = feedOrders.filter((i: any) => i._id === id)[0];

  return (
    <>
      {feedOrders.length === 0
        ?
        <Preloader/>
        :
        <OrderInfo order={order}/>
      }
    </>
  );
};

export default OrderPageFeed;
