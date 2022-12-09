import React, {FC} from 'react';
import styles from './order-feed.module.css'
import {useSelector} from "../../redux/hooks";
import {Link, useLocation} from "react-router-dom";
import Order from "../order/order";

const OrderFeed: FC = () => {
  const { feedOrders } = useSelector((state) => state.ws);
  let location = useLocation();

  return (
    <div className={styles.scroll}>
      {feedOrders.map((data, index) => (
        <Link
          className={styles.link}
          key={data._id}
          to={{
            pathname: `/feed/${data._id}`,
            state: { background: location }
          }}>
          <Order key={index} order={data}/>
        </Link>
      ))}
    </div>
  );
};

export default OrderFeed;
