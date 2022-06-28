import {
  ORDER_DATA_DELETE,
  ORDER_DATA_ERROR,
  ORDER_DATA_REQUEST,
  ORDER_DATA_SUCCESS,
} from "./actions";

const initialState = {
  orderNumber: null,
  orderLoading: false,
  orderError: null,
};

export const reducer = (state = initialState, action) => {
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
