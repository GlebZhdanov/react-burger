import React, {FC, useEffect} from 'react';
import styles from './profile-order.module.css'
import {useDispatch, useSelector} from "../../redux/hooks";
import {ORDERS_CONNECT, ORDERS_DISCONNECT} from "../../redux/types/action";
import {SERVER_BASE_URL_USER_ORDER} from "../../utils/constain";
import {getCookie} from "../../utils/cookies";
import Order from "../../components/order/order";
import {Link, useLocation} from "react-router-dom";

const ProfileOrder = () => {

  let location = useLocation();

  const dispatch = useDispatch()

  const token = getCookie('accessToken') || '';

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
  },[dispatch])

  return (
      <div className={styles.scroll}>
        {userOrders.map((data: any, index: number) => (
          <Link
            className={styles.link}
            key={data._id}
            to={{
              pathname: `/profile/order/${data._id}`,
              state: { background: location }
            }}>
            <Order key={index} order={data}/>
          </Link>
        ))}
      </div>
  )
}

export default ProfileOrder;
