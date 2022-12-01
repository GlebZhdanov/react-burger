import {reducer} from "./reducer";
import {initialState} from "./reducer";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {
  ORDER_DATA_DELETE,
  ORDER_DATA_ERROR,
  ORDER_DATA_REQUEST,
  ORDER_DATA_SUCCESS,REGISTRATION_REQUEST,REGISTRATION_SUCCESS
} from "../types/action";
import {loadOrder} from "./actions";

describe('check order reducer', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({result: "OK"}),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial state order', () => {
    expect(reducer(undefined,{})).toEqual(initialState)
  })

  it('should action after dispatched loadOrder', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    const expectedAction = [
      {type: ORDER_DATA_REQUEST},
      {type: ORDER_DATA_ERROR},
    ]

    return store.dispatch(loadOrder())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should has changed on action ORDER_DATA_REQUEST', () => {
    expect(reducer(initialState, {
      type: ORDER_DATA_REQUEST,
    })).toEqual({
      ...initialState,
      orderLoading: true,
    })
  })

  it('should has changed on action ORDER_DATA_SUCCESS', () => {
    const number = 123;
    expect(reducer(initialState, {
      type: ORDER_DATA_SUCCESS,
      payload: number
    })).toEqual({
      ...initialState,
      orderNumber: number,
      orderError: false,
    })
  })

  it('should has changed on action ORDER_DATA_ERROR', () => {
    expect(reducer(initialState, {
      type: ORDER_DATA_ERROR,
    })).toEqual({
      ...initialState,
      orderError: true,
      orderLoading: false,
    })
  })

  it('should has changed on action ORDER_DATA_DELETE', () => {
    expect(reducer(initialState, {
      type: ORDER_DATA_DELETE,
    })).toEqual({
      ...initialState,
    })
  })
})
