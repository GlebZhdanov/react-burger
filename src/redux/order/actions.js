import {api} from "../../utils/api";

export const ORDER_DATA_SUCCESS = "ORDER_DATA_SUCCESS";
export const ORDER_DATA_REQUEST = "ORDER_DATA_REQUEST";
export const ORDER_DATA_ERROR = "ORDER_DATA_ERROR";

export const ORDER_DATA_DELETE = "ORDER_DATA_DELETE";

export const loadOrder = (id) => (dispatch) => {
  dispatch({
    type: ORDER_DATA_REQUEST,
  })
  api.postOrder(id)
  .then((res) => {
    dispatch({
      type: ORDER_DATA_SUCCESS,
      payload: res.order.number
    })
  })
  .catch((err) => {
    dispatch({
      type: ORDER_DATA_ERROR,
      payload: err
    })
  })
}

export const deleteOrder = () => (dispatch) => {
  dispatch({
    type: ORDER_DATA_DELETE
  })
}

