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
import { TWsOrders} from "../types/data";

export interface IFeedConnectAction {
  readonly type: typeof FEED_CONNECT;
}

export interface IFeedDisconnectAction {
  readonly type: typeof FEED_DISCONNECT;
}

export interface IFeedWsErrorAction {
  readonly type: typeof FEED_WS_ERROR;
}

export interface IFeedWsMessageAction {
  readonly type: typeof FEED_WS_MESSAGE;
  payload: TWsOrders,
}

export interface IOrderConnectAction {
  readonly type: typeof ORDERS_CONNECT;
}

export interface IOrderDisconnectAction {
  readonly type: typeof ORDERS_DISCONNECT;
}

export interface IOrderWsErrorAction {
  readonly type: typeof ORDERS_WS_ERROR;
}

export interface IOrderWsMessageAction {
  readonly type: typeof ORDERS_WS_MESSAGE;
  payload: TWsOrders,
}


export const feedConnectAction = (): IFeedConnectAction => ({
  type: FEED_CONNECT,
})

export const feedDisconnectAction = (): IFeedDisconnectAction => ({
  type: FEED_DISCONNECT,
})

export const feedWsErrorAction = (): IFeedWsErrorAction => ({
  type:FEED_WS_ERROR,
})

export const feedWsMessageAction = (data: TWsOrders): IFeedWsMessageAction => ({
  type:FEED_WS_MESSAGE,
  payload: data
})

export const orderConnectAction = (): IOrderConnectAction => ({
  type: ORDERS_CONNECT,
})

export const orderDisconnectAction = (): IOrderDisconnectAction => ({
  type: ORDERS_DISCONNECT,
})

export const orderWsErrorAction = (): IOrderWsErrorAction => ({
  type:ORDERS_WS_ERROR,
})

export const orderWsMessageAction = (data: TWsOrders): IOrderWsMessageAction => ({
  type:ORDERS_WS_MESSAGE,
  payload: data
})

export type TWsAction =
  | IOrderConnectAction
  | IOrderDisconnectAction
  | IOrderWsErrorAction
  | IOrderWsMessageAction
  | IFeedConnectAction
  | IFeedDisconnectAction
  | IFeedWsErrorAction
  | IFeedWsMessageAction
