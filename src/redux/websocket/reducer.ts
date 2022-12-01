import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
} from '../types/action'
import {TWsAction} from "./actions";
import {TWsState} from "../types/data";

export const initialState: TWsState = {
  wsConnected: false,
  feedOrders: [],
  total: 0,
  totalToday: 0,
  userOrders: [],
}

export const reducer = (state = initialState, action: TWsAction) => {
  switch (action.type) {
    case FEED_CONNECT:
      return {
        ...state,
        wsConnected: true,
      }
    case FEED_DISCONNECT:
      return {
        ...state,
        wsConnected: false,
        feedOrders: []
      }
    case FEED_WS_ERROR:
      return {
        ...state,
        wsConnected: false,
      }
    case FEED_WS_MESSAGE:
      return {
        ...state,
        feedOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    case ORDERS_CONNECT:
      return {
        ...state,
        wsConnected: true,
      }
    case ORDERS_DISCONNECT:
      return {
        ...state,
        wsConnected: false,
        userOrders: [],
      }
    case ORDERS_WS_ERROR:
      return {
        ...state,
        wsConnected: false,
      }
    case ORDERS_WS_MESSAGE:
      return {
        ...state,
        userOrders: action.payload.orders,
      }
    default:
      return state
  }
}
