import React, {FC, useEffect} from 'react';
import styles from './feed.module.css'
import {useDispatch, useSelector} from "../../redux/hooks";
import {FEED_CONNECT, FEED_DISCONNECT} from "../../redux/types/action";
import {SERVER_BASE_URL} from "../../utils/constain";
import OrderStatus from "../../components/order-status/order-status";
import OrderFeed from "../../components/order-feed/order-feed";

const Feed: FC = () => {
  const dispatch = useDispatch()

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

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Лента заказов</h2>
      <div className={styles.content}>
        <OrderFeed/>
        <OrderStatus/>
      </div>
    </section>
  )
}

export default Feed;
