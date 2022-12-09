import {initialState,reducer} from "./reducer";
import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_RECOVERY_REQUEST,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_ERROR,
  PASSWORD_RECORD,INGREDIENTS_DATA_REQUEST,INGREDIENTS_DATA_SUCCESS
} from "../types/action";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {recoveryPassword,resetPassword} from "./actions";

describe('check password reducer',() => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({result: "OK"}),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial state password', () => {
    expect(reducer(undefined,{})).toEqual(initialState)
  })

  it('should has changed on action PASSWORD_RESET_REQUEST', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RESET_REQUEST,
    })).toEqual({
      ...initialState,
      resetRequest: true,
    })
  })

  it('should has changed on action PASSWORD_RESET_SUCCESS', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RESET_SUCCESS,
    })).toEqual({
      ...initialState,
      resetSuccess: true,
    })
  })

  it('should has changed on action PASSWORD_RESET_ERROR', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RESET_ERROR,
    })).toEqual({
      ...initialState,
      resetError: true,
      resetSuccess: false,
    })
  })

  it('should has changed on action PASSWORD_RECOVERY_SUCCESS', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RECOVERY_SUCCESS,
    })).toEqual({
      ...initialState,
      recoveryRequest: true,
    })
  })

  it('should has changed on action PASSWORD_RECOVERY_REQUEST', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RECOVERY_REQUEST,
    })).toEqual({
      ...initialState,
      recoverySuccess: true,
    })
  })

  it('should has changed on action PASSWORD_RECOVERY_ERROR', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RECOVERY_ERROR,
    })).toEqual({
      ...initialState,
      recoveryError: true,
      recoverySuccess: false
    })
  })

  it('should has changed on action PASSWORD_RECORD', () => {
    expect(reducer(initialState, {
      type: PASSWORD_RECORD,
      payload: 123
    })).toEqual({
      ...initialState,
      resetPassword: 123,
    })
  })

  it('should action after dispatched resetPassword',  () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const expectedAction = [
      {type: PASSWORD_RESET_REQUEST},
      {type: PASSWORD_RESET_SUCCESS},
    ]

    const store = mockStore({});

    return store.dispatch(resetPassword())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should action after dispatched recoveryPassword',  () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const expectedAction = [
      {type: PASSWORD_RECOVERY_SUCCESS},
      {type: PASSWORD_RECOVERY_REQUEST},
    ]

    const store = mockStore({});

    return store.dispatch(recoveryPassword(124))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})
