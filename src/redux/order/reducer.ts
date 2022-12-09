import { TOrderAction } from "./actions";
import {
  ORDER_DATA_REQUEST,
  ORDER_DATA_SUCCESS,
  ORDER_DATA_ERROR,
  ORDER_DATA_DELETE,
} from "../types/action";
import {TOrderState} from "../types/data";

export const initialState: TOrderState = {
  orderNumber: null,
  orderLoading: false,
  orderError: false,
};

export const reducer = (state = initialState, action: TOrderAction): TOrderState => {
  switch (action.type) {
    case ORDER_DATA_REQUEST:
      return {
        ...state,
        orderLoading: true,
      }
    case ORDER_DATA_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        orderError: false,
      }
    case ORDER_DATA_ERROR:
      return {
        ...state,
        orderError: true,
        orderLoading: false,
      }
    case ORDER_DATA_DELETE:
      return initialState
    default:
      return state
  }
}
