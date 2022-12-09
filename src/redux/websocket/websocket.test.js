import {initialState,reducer} from "./reducer";
import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,ORDERS_WS_ERROR,ORDERS_WS_MESSAGE
} from "../types/action";
import {dataWs} from "../../utils/constain";

describe('check websocket reducer', () => {

  it('should return initial state websocket', () => {
    expect(reducer(undefined,{})).toEqual(initialState)
  })

  it('should has changed on action FEED_CONNECT', () => {
    expect(reducer(initialState, {
      type: FEED_CONNECT,
    })).toEqual({
      ...initialState,
      wsConnected: true,
    })
  })

  it('should has changed on action FEED_DISCONNECT', () => {
    expect(reducer(initialState, {
      type: FEED_DISCONNECT,
    })).toEqual({
      ...initialState,
      wsConnected: false,
      feedOrders: []
    })
  })

  it('should has changed on action FEED_WS_ERROR', () => {
    expect(reducer(initialState, {
      type: FEED_WS_ERROR,
    })).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should has changed on action FEED_WS_MESSAGE', () => {
    expect(reducer(initialState, {
      type: FEED_WS_MESSAGE,
      payload: dataWs
    })).toEqual({
      ...initialState,
      feedOrders: dataWs.orders,
      total: dataWs.total,
      totalToday: dataWs.totalToday,
    })
  })

  it('should has changed on action ORDERS_CONNECT', () => {
    expect(reducer(initialState, {
      type: ORDERS_CONNECT,
    })).toEqual({
      ...initialState,
      wsConnected: true,
    })
  })

  it('should has changed on action ORDERS_DISCONNECT', () => {
    expect(reducer(initialState, {
      type: ORDERS_DISCONNECT,
    })).toEqual({
      ...initialState,
      wsConnected: false,
      userOrders: [],
    })
  })

  it('should has changed on action ORDERS_WS_ERROR', () => {
    expect(reducer(initialState, {
      type: ORDERS_WS_ERROR,
    })).toEqual({
      ...initialState,
      wsConnected: false,
    })
  })

  it('should has changed on action ORDERS_WS_MESSAGE', () => {
    expect(reducer(initialState, {
      type: ORDERS_WS_MESSAGE,
      payload: dataWs,
    })).toEqual({
      ...initialState,
      userOrders: dataWs.orders,
    })
  })

})
